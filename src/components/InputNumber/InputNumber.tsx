import React, { InputHTMLAttributes, forwardRef, useState } from 'react'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  errorMessage?: string
  classNameError?: string
  classNameInput?: string
  classNameTitle?: string
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    children,
    onChange,
    errorMessage,
    classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600',
    classNameInput = 'h-[40px] w-full rounded-md border border-gray-300 px-3 text-sm outline-none',
    classNameTitle = 'mb-2 text-[15px] font-bold',
    value = '',
    ...rest
  },
  ref
) {
  // const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const regaxNumber = /^[0-9]+$/
    if (regaxNumber.test(value) || value === '') {
      onChange && onChange(event)
    }
  }

  return (
    <div>
      {children && <h1 className={classNameTitle}>{children}</h1>}
      <input
        {...rest}
        value={value === undefined ? '' : value}
        onChange={handleChange}
        ref={ref}
        className={`${classNameInput} ${
          errorMessage && 'border border-red-500 bg-red-50 text-red-900 placeholder-red-700'
        }`}
        type='text'
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
})
