import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiAddFill } from 'react-icons/ri'
import { TbDots } from 'react-icons/tb'
import { createSearchParams, useNavigate } from 'react-router-dom'
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
  const queryConfig = useQueryConfig()
  const { sort_by = sortBy.view, order, category } = queryConfig
  const navigate = useNavigate()
  const { data: productsData, isLoading } = useQuery({
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

  const handleSortCategory = (category: Category) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({ ...queryConfig, category: category._id }).toString()
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
      result = 'Tất cả danh mục'
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

  const product = productsData?.data.data
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
        <button className='flex items-center rounded-md border bg-primaryColor px-3 py-2 text-white hover:rounded-bl-none hover:rounded-br-none'>
          <RiAddFill className='mr-2 text-lg' />
          <div>Thêm sản phẩm</div>
        </button>
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
                          <button className='px-4 py-2 hover:text-primaryColor'>Xóa Sản Phẩm</button>
                        </ul>
                      </div>
                    }
                  >
                    <TbDots className='text-xl' />
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div role='status' className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'>
          <div className='flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96'>
            <svg
              className='h-12 w-12 text-gray-200'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'
            >
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
          </div>
          <div className='w-full'>
            <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700' />
            <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700' />
          </div>
          <span className='sr-only'>Loading...</span>
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
