import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiAddFill } from 'react-icons/ri'
import { TbDots } from 'react-icons/tb'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { categoryApi } from 'src/apis/category.api'
import { productApi } from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import Popover from 'src/components/Popover'
import ProductRating from 'src/components/ProductRating/ProductRating'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import { sortBy } from 'src/constants/product'
import { Category } from 'src/types/categogy.type'
import Skeleton from 'src/components/SkeletonPost/Skeleton'
import { toast } from 'react-toastify'
import Modal from 'src/components/Modal/Modal'
import { useState } from 'react'

type SortByType = 'price' | 'createdAt' | 'view' | 'sold'
type OrderType = 'asc' | 'desc'

interface SortByObjectType {
  sortBy: SortByType
  order: OrderType
}

interface sortByDataType {
  name: string
  queryName: SortByType | SortByObjectType
}

const keyData = ['tên sản phẩm', 'Giá', 'Đã bán', 'Số lượng', 'Loại', 'Đánh giá', 'Tùy chỉnh']
const sortByData: sortByDataType[] = [
  { name: 'Bán chạy', queryName: 'sold' },
  { name: 'Mới nhất', queryName: 'createdAt' },
  { name: 'Giá thấp đến cao', queryName: { sortBy: 'price', order: 'asc' } },
  { name: 'Gía cao đến thấp', queryName: { sortBy: 'price', order: 'desc' } }
]

export default function Products() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const queryConfig = useQueryConfig()
  const { sort_by = sortBy.view, order, category } = queryConfig
  const navigate = useNavigate()
  const {
    data: productsData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoryData } = useQuery({
    queryKey: ['category', queryConfig],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  const handleSort = (sortByValue: SortByType | SortByObjectType) => {
    if (typeof sortByValue === 'string') {
      const modifiedQueryConfig = { ...queryConfig }
      delete modifiedQueryConfig.order

      navigate({
        pathname: path.products,
        search: createSearchParams({ ...modifiedQueryConfig, sort_by: sortByValue }).toString()
      })
    } else {
      const { sortBy, order } = sortByValue
      navigate({
        pathname: path.products,
        search: createSearchParams({ ...queryConfig, sort_by: sortBy, order: order }).toString()
      })
    }
  }

  const deleteProductMutation = useMutation({ mutationFn: (id: string) => productApi.deleteProduct(id) })

  const handleSortCategory = (category: Category) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({ ...queryConfig, category: category._id }).toString()
    })
  }

  const handleDeleteProduct = (id: string) => {
    setIsOpenModal(false)
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        refetch()
        toast.success('Xóa thành công')
      }
    })
  }

  const isActiveSort = (sortByValue: SortByType | OrderType) => {
    if (order) {
      return sortByValue === order
    }
    return sort_by === sortByValue
  }

  const renderNameSort = () => {
    let result
    const matchingSort = sortByData.find((item) => {
      if (sort_by === item.queryName) {
        return true
      } else if (
        typeof item.queryName === 'object' &&
        item.queryName.order === order &&
        item.queryName.sortBy === sort_by
      ) {
        return true
      } else {
        return false
      }
    })

    if (typeof matchingSort === 'object') {
      result = matchingSort.name
    } else {
      result = 'Bộ lọc'
    }

    return <div>{result}</div>
  }

  const renderCategorySortName = () => {
    let result = ''
    const matchingSort = categoryData?.data.data.find((item) => {
      if (category === item._id) {
        return true
      } else {
        return false
      }
    })

    if (typeof matchingSort === 'object') {
      result = matchingSort.name
    } else {
      result = 'Tất cả danh mục'
    }
    return <div>{result}</div>
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const product = productsData?.data.data
  console.log(product)
  return (
    <div className='relative mt-3 overflow-x-auto px-8'>
      <div className='mb-4 flex justify-between'>
        <div className='flex items-center gap-3'>
          <Popover
            classNameArrow=''
            duration={0}
            offsetTop={0}
            className='flex items-center'
            renderPopover={
              <div>
                <ul className='z-30 w-[200px] border shadow-sm'>
                  {categoryData?.data.data.map((item, index) => {
                    const isActive = queryConfig.category === item._id
                    return (
                      <button
                        onClick={() => handleSortCategory(item)}
                        key={index}
                        className={classNames('flex w-full items-center justify-between bg-white px-3 py-2', {
                          'text-primaryColor': isActive
                        })}
                      >
                        <div>{item.name}</div>
                      </button>
                    )
                  })}
                </ul>
              </div>
            }
          >
            <button className='flex w-[200px] items-center justify-between rounded-md border bg-white px-3 py-2 hover:rounded-bl-none hover:rounded-br-none'>
              <div>{categoryData ? renderCategorySortName() : '...'}</div>
              <MdKeyboardArrowDown />
            </button>
          </Popover>
          <Popover
            classNameArrow=''
            duration={0}
            offsetTop={0}
            className='flex items-center'
            renderPopover={
              <div>
                <ul className='z-30 w-[200px] border shadow-sm'>
                  {sortByData.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          typeof item.queryName === 'string' ? { sortBy: item.queryName, order: '' } : item.queryName
                          if (typeof item.queryName === 'string') {
                            handleSort(item.queryName)
                          } else {
                            const { sortBy, order } = item.queryName
                            handleSort({ sortBy, order })
                          }
                        }}
                        className={classNames('flex w-full items-center justify-between bg-white px-3 py-2', {
                          'text-primaryColor':
                            typeof item.queryName === 'string'
                              ? isActiveSort(item.queryName)
                              : isActiveSort(item.queryName.order)
                        })}
                      >
                        <div>{item.name}</div>
                        <MdKeyboardArrowDown />
                      </button>
                    )
                  })}
                </ul>
              </div>
            }
          >
            <button className='flex w-[200px] items-center justify-between rounded-md border bg-white px-3 py-2 hover:rounded-bl-none hover:rounded-br-none'>
              <div>{renderNameSort()}</div>
              <MdKeyboardArrowDown />
            </button>
          </Popover>
        </div>
        <Link
          to={path.productManager}
          className='flex items-center rounded-md border bg-primaryColor px-3 py-2 text-white'
        >
          <RiAddFill className='mr-2 text-lg' />
          <div>Thêm sản phẩm</div>
        </Link>
      </div>
      {!isLoading ? (
        <table className='text-sx w-full rounded-md bg-white text-left shadow-sm'>
          <thead className='border-b text-sm uppercase text-gray-700'>
            <tr>
              {keyData.map((item, index) => (
                <th scope='col' key={index} className='px-6 py-5'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=''>
            {product?.products.map((item, index) => (
              <tr key={index} className=' rounded-md border-b bg-white'>
                <th className=' flex items-center px-6 py-4 text-gray-900'>
                  <img
                    className='mr-3 h-10 w-10 flex-shrink-0 rounded-md border object-cover'
                    src={item.image}
                    alt=''
                  />
                  <div className=' w-[200px] flex-1 truncate'>{item.name}</div>
                </th>
                <td className='px-6 py-4'>₫{formatCurrency(item.price)}</td>
                <td className='px-6 py-4'>{formatNumberToSocialStyle(item.sold)}</td>
                <td className='px-6 py-4'>{formatNumberToSocialStyle(item.quantity)}</td>
                <td className='px-6 py-4'>{item.category.name}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    <ProductRating rating={item.rating} />
                  </div>
                </td>
                <td className='cursor-pointer px-6 py-4 text-primaryColor hover:underline'>
                  <Popover
                    className=''
                    renderPopover={
                      <div>
                        <ul className='flex flex-col rounded-md border bg-white shadow-md'>
                          <button className='px-4 py-2 hover:text-primaryColor'>Sửa Sản Phẩm</button>
                          <button onClick={handleOpenModal} className='px-4 py-2 hover:text-primaryColor'>
                            Xóa Sản Phẩm
                          </button>
                        </ul>
                      </div>
                    }
                  >
                    <TbDots className='text-xl' />
                  </Popover>
                  <Modal
                    setIsOpenModal={setIsOpenModal}
                    isOpenModal={isOpenModal}
                    message='Bạn có muốn xóa sản phẩm không ?'
                    handleClick={() => handleDeleteProduct(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='h-full'>
          <Skeleton />
        </div>
      )}
      <div>
        {product && (
          <div className='flex items-center justify-between bg-white px-6 py-5'>
            <div className='uppercase'>
              hiển thị <span>{product.pagination.limit}</span>/{product.pagination.page_size * product.pagination.limit}
            </div>
            <Pagination pageSize={product.pagination.page_size} queryConfig={queryConfig} />
          </div>
        )}
      </div>
    </div>
  )
}
