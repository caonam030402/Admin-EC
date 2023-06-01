import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoBagRemoveOutline } from 'react-icons/io5'
import { CgMenuRight } from 'react-icons/cg'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FiUser } from 'react-icons/fi'
import { Controller, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from 'src/apis/dashboard.api'
import CountUp from 'react-countup'
import { useState } from 'react'
import Modal from 'src/components/Modal/Modal'
import { InputNumber } from 'src/components/InputNumber/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import { TargetSchema, targetSchema } from 'src/utils/rules'

export default function Home() {
  const [isTargetSelling, setIsTagetSelling] = useState<number>(100)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: dataQuanlityOverview } = useQuery({
    queryKey: ['quanlity_overview'],
    queryFn: () => {
      return dashboardApi.getquanlityOverview()
    }
  })

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors }
  } = useForm<TargetSchema>({
    resolver: yupResolver(targetSchema)
  })

  console.log(errors.sellingTarget?.message)

  const total = dataQuanlityOverview?.data.data

  const { data: dataQuanlitySoldOverTime } = useQuery({
    queryKey: ['quanlity_sold_overtime'],
    queryFn: () => {
      return dashboardApi.getquanlitySoldOverTime()
    }
  })
  const quanlitySoldOverTime = dataQuanlitySoldOverTime?.data.data

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const percentTargetSelling = quanlitySoldOverTime && (quanlitySoldOverTime?.total / isTargetSelling) * 100

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

  const onSubmit = handleSubmit((data) => {
    setIsTagetSelling(Number(data.sellingTarget))
    setIsOpenModal(false)
    reset()
  })

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
            <div className='mt-4 text-sm '>
              Số Lượng Đơn Bán Ra:
              <p className='text-2xl font-bold text-primaryColor'>
                {quanlitySoldOverTime ? ` ${quanlitySoldOverTime?.total}/${isTargetSelling}` : ` 0/${isTargetSelling}`}
              </p>
            </div>
            <Modal
              onSubmit={onSubmit}
              title='Mục tiêu'
              isOpenModal={isOpenModal}
              handleClick={handleOpenModal}
              setIsOpenModal={setIsOpenModal}
              renderModal={
                <form onSubmit={onSubmit} className='mb-4'>
                  <Controller
                    control={control}
                    name='sellingTarget'
                    render={({ field }) => (
                      <InputNumber
                        classNameError='my-2 text-xs text-primaryColor'
                        value={field.value}
                        ref={field.ref}
                        errorMessage={errors.sellingTarget?.message}
                        placeholder='Số lượng'
                        onChange={field.onChange}
                      />
                    )}
                  />
                </form>
              }
            >
              <button onClick={handleOpenModal} className='mt-3 w-1/2 rounded-md bg-primaryColor py-2 text-white'>
                Đặt lại mục tiêu
              </button>
            </Modal>
          </div>
        </div>
        <div className='col-span-8'></div>
      </div>
    </div>
  )
}
