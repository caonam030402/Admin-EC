import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  errorMessage?: string
  classNameError?: string
  classNameInput?: string
  classNameTitle?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  name: string
}

export default function Input({
  children,
  register,
  name,
  errorMessage,
  classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600',
  classNameInput = 'h-[40px] w-full rounded-md border border-gray-300 px-3 text-sm outline-none',
  classNameTitle = 'mb-2 text-[15px] font-bold',
  rules,
  ...rest
}: Props) {
  return (
    <div>
      {children && <h1 className={classNameTitle}>{children}</h1>}
      <input {...rest} {...register(name, rules)} className={classNameInput} type='text' />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
}
