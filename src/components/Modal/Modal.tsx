import { motion, AnimatePresence } from 'framer-motion'
import React, { useId, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderModal: React.ReactNode
  className?: string
  handleClick: () => void
  duration?: number
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenModal: boolean
  title: string
  onSubmit?: () => void
}

export default function Modal({
  children,
  onSubmit,
  title,
  className,
  renderModal,
  duration = 0.3,
  handleClick,
  setIsOpenModal,
  isOpenModal
}: Props) {
  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <div className='h-full w-full'>
      {children}
      {isOpenModal && (
        <div>
          <AnimatePresence>
            <motion.div
              className='fixed bottom-0 left-0 right-0 top-0'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: duration }}
            >
              <button onClick={handleCloseModal} className='fixed bottom-0 left-0 right-0 top-0 bg-black/30'></button>
              <div className='absolute right-[50%] top-[50%] w-[300px] translate-x-[50%] translate-y-[-50%] rounded-lg bg-white p-4'>
                <div className='mb-3 flex items-center justify-between'>
                  <h1 className='text-base font-bold'>{title}</h1>
                  <button
                    onClick={handleCloseModal}
                    type='button'
                    className='inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                    data-modal-hide='popup-modal'
                  >
                    <svg
                      aria-hidden='true'
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                <div className=''>{renderModal}</div>
                <div className=' text-center'>
                  <button
                    onClick={onSubmit}
                    data-modal-hide='popup-modal'
                    className='mr-2 inline-flex items-center rounded-lg bg-primaryColor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={handleCloseModal}
                    data-modal-hide='popup-modal'
                    className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200'
                  >
                    Hủy bỏ
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
