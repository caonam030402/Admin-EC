import classNames from 'classnames'
import { RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IoImageOutline } from 'react-icons/io5'
import { config } from 'src/constants/config'
import { toast } from 'react-toastify'
import { useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from 'src/Contexts/Contexts'
import { ProductSchema } from 'src/utils/rules'

interface Props {
  onChange?: (file: File) => void
  height?: string
  hideText?: boolean
  classNameError?: string
  messageError?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  name: string
  id: string
  setValue: UseFormSetValue<ProductSchema>
}

export default function UploadImage({
  onChange,
  height,
  hideText,
  messageError,
  name,
  id,
  register,
  setValue,
  rules,
  ...rest
}: Props) {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal)
    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeUploadImages) || !fileFromLocal?.type.includes('image')) {
      toast.error('Ảnh phải bé hơn 5MB')
    } else {
      setValue(`images.${Number(id)}`, fileFromLocal)
      onChange && onChange(fileFromLocal)
      setFile(fileFromLocal)
    }
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <label
        htmlFor={id}
        className={`${height} ${
          messageError && 'border-primaryColorx bg-primaryColor/20'
        } flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100`}
      >
        {previewImage ? (
          <img className='h-full w-full rounded-md object-cover' src={previewImage} alt='' />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <IoImageOutline className={`${!hideText && 'mb-3'} text-3xl text-gray-400`} />
            {!hideText && (
              <div>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Nhấn vào đây</span> để thêm ảnh
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG (MAX. 800x400px)</p>
              </div>
            )}
          </div>
        )}
        <input
          {...rest}
          {...register(`images[${name}]`, rules)}
          onChange={onFileChange}
          id={id}
          type='file'
          className='hidden'
          accept='.jpg,.jpeg,.png'
        />
      </label>
    </div>
  )
}
