import { useQuery } from '@tanstack/react-query'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiAddFill } from 'react-icons/ri'
import { TbDots } from 'react-icons/tb'
import { productApi } from 'src/apis/product.api'
import Popover from 'src/components/Popover'
import ProductRating from 'src/components/ProductRating/ProductRating'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

const keyData = ['tên sản phẩm', 'Giá', 'Đã bán', 'Số lượng', 'Loại', 'Đánh giá', 'Tùy chỉnh']

export default function Products() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  return (
    <div className='relative overflow-x-auto p-8'>
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
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Điện Thoại</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Đồng Hồ</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Áo thun</div>
                    <MdKeyboardArrowDown />
                  </button>
                </ul>
              </div>
            }
          >
            <button className='flex w-[200px] items-center justify-between rounded-md border bg-white px-3 py-2 hover:rounded-bl-none hover:rounded-br-none'>
              <div>Tất cả danh mục</div>
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
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Điện Thoại</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Đồng Hồ</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Áo thun</div>
                    <MdKeyboardArrowDown />
                  </button>
                </ul>
              </div>
            }
          >
            <button className='flex w-[200px] items-center justify-between rounded-md border bg-white px-3 py-2 hover:rounded-bl-none hover:rounded-br-none'>
              <div>Giá</div>
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
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Điện Thoại</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Đồng Hồ</div>
                    <MdKeyboardArrowDown />
                  </button>
                  <button className='flex w-full items-center justify-between bg-white px-3 py-2'>
                    <div>Áo thun</div>
                    <MdKeyboardArrowDown />
                  </button>
                </ul>
              </div>
            }
          >
            <button className='flex w-[200px] items-center justify-between rounded-md border bg-white px-3 py-2 hover:rounded-bl-none hover:rounded-br-none'>
              <div>Bộ Lọc</div>
              <MdKeyboardArrowDown />
            </button>
          </Popover>
        </div>
        <button className='flex items-center rounded-md border bg-primaryColor px-3 py-2 text-white hover:rounded-bl-none hover:rounded-br-none'>
          <RiAddFill className='mr-2 text-lg' />
          <div>Thêm sản phẩm</div>
        </button>
      </div>
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
          {productsData?.data.data.products.map((item, index) => (
            <tr key={index} className=' rounded-md border-b bg-white'>
              <th className=' flex items-center px-6 py-4 text-gray-900'>
                <img className='mr-3 h-12 w-12 flex-shrink-0 rounded-md border object-cover' src={item.image} alt='' />
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
    </div>
  )
}
