import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoBagRemoveOutline } from 'react-icons/io5'
import { CgMenuRight } from 'react-icons/cg'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FiUser } from 'react-icons/fi'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from 'src/apis/dashboard.api'
import CountUp from 'react-countup'
import { useState } from 'react'

export default function Home() {
  const [targetSelling, setTagetSelling] = useState<number>(100)
  const { data: dataQuanlityOverview } = useQuery({
    queryKey: ['quanlity_overview'],
    queryFn: () => {
      return dashboardApi.getquanlityOverview()
    }
  })
  const total = dataQuanlityOverview?.data.data

  const { data: dataQuanlitySoldOverTime } = useQuery({
    queryKey: ['quanlity_sold_overtime'],
    queryFn: () => {
      return dashboardApi.getquanlitySoldOverTime()
    }
  })
  const quanlitySoldOverTime = dataQuanlitySoldOverTime?.data.data

  const percentTargetSelling = quanlitySoldOverTime && (quanlitySoldOverTime?.total / targetSelling) * 100

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
      <div className='mt-10 grid grid-cols-12 gap-4'>
        <div className='col-span-3 rounded-md bg-white p-6'>
          <div className='flex items-center justify-between'>
            <div className='text-lg font-bold'>Mục Tiêu Hôm Nay</div>
            <div>
              <CgMenuRight />
            </div>
          </div>
          <div>
            <div className='relative'>
              <CircularProgressbar
                className='mx-auto mt-11 w-48'
                styles={buildStyles({
                  pathTransitionDuration: 2,
                  trailColor: '#e8f7f8',
                  pathColor: '#ee4d2d',
                  textColor: '#333'
                })}
                value={quanlitySoldOverTime ? Number(percentTargetSelling) : 0}
              ></CircularProgressbar>
              <CountUp
                className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-4xl font-semibold'
                start={0}
                separator=','
                suffix='%'
                end={Number(percentTargetSelling)}
                duration={2.75}
              />
            </div>
          </div>
          <div className='text-center '>
            <p className='mt-4 text-sm '>
              Số Lượng Đơn Bán Ra:
              <p className='text-2xl font-bold text-primaryColor'>
                {quanlitySoldOverTime ? ` ${quanlitySoldOverTime?.total}/${targetSelling}` : ''}
              </p>
            </p>
            <button className='mt-3 w-1/2 rounded-md bg-primaryColor py-2 text-white'>Đặt lại mục tiêu</button>
          </div>
        </div>
        <div className='col-span-8'></div>
      </div>
    </div>
  )
}
