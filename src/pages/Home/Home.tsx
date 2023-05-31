import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoBagRemoveOutline } from 'react-icons/io5'
import { CgMenuRight } from 'react-icons/cg'
import { FiUser } from 'react-icons/fi'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from 'src/apis/dashboard.api'
import CountUp from 'react-countup'

export default function Home() {
  const { data: dataQuanlityOverview } = useQuery({
    queryKey: ['quanlity_overview'],
    queryFn: () => {
      return dashboardApi.getquanlityOverview()
    }
  })
  const total = dataQuanlityOverview?.data.data

  const quanlityOverview = [
    {
      name: 'Tổng tiền đã bán',
      value: Number(total?.totalAmoutSold.total),
      icon: <FaRegMoneyBillAlt />,
      percent: '8%'
    },
    {
      name: 'Sản phẩm bán',
      value: Number(total?.totalProductSold.total),
      icon: <AiOutlineShoppingCart />,
      percent: '8%'
    },
    {
      name: 'Tổng sản phẩm',
      value: Number(total?.totalProduct.total),
      icon: <IoBagRemoveOutline />,
      percent: '8%'
    },
    {
      name: 'Tổng người dùng',
      value: Number(total?.totalUser.total),
      icon: <FiUser />,
      percent: '8%'
    }
  ]

  return (
    <div className='px-10'>
      <div className='grid grid-cols-12 gap-4'>
        {quanlityOverview.map((item, index) => (
          <div key={index} className='col-span-3 rounded-md bg-white p-4 shadow-sm'>
            <div className='mb-3 flex items-center justify-between'>
              <div className='text-sm'>{item.name}</div>
              <div className='flex items-center text-green-400'>
                <MdOutlineKeyboardArrowUp className='text-xl' />
                <div className=''>{item.percent}</div>
              </div>
            </div>
            <CountUp
              className='text-2xl font-semibold'
              start={0}
              separator=','
              end={item.value}
              duration={2.75}
              suffix={item.name === 'Tổng tiền đã bán' ? '₫' : ''}
            />
            <div className='flex items-end justify-between'>
              <div className='text-xs'>See all...</div>
              <div
                className={classNames('flex h-7 w-7 items-center justify-center rounded-md text-base', {
                  'bg-primaryColor/30 text-primaryColor': index === 0,
                  'bg-green-600/30 text-green-600': index === 1,
                  'bg-blue-600/30 text-blue-600': index === 2,
                  'bg-red-600/30 text-red-600': index === 3
                })}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-10 grid grid-cols-12'>
        <div className='col-span-4 bg-white p-5'>
          <div className='flex items-center justify-between'>
            <div>Tổng doanh thu hôm nay</div>
            <div>
              <CgMenuRight />
            </div>
          </div>
          <div>{/* <CircularProgressbar value={66} text={`${66}%`} />; */}</div>
        </div>
        <div className='col-span-8'></div>
      </div>
    </div>
  )
}
