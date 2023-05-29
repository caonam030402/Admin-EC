import { Controller, useForm } from 'react-hook-form'
import Input from 'src/components/Input/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import UploadImage from 'src/components/UploadImage/UploadImage'
import { ProductSchema, productSchema } from 'src/utils/rules'
import { useMutation, useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import { InputNumber } from 'src/components/InputNumber/InputNumber'
import { categoryApi } from 'src/apis/category.api'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/Contexts/Contexts'

export default function CreateProduct() {
  const {
    handleSubmit,
    control,
    register,
    setValue,

    formState: { errors }
  } = useForm<ProductSchema>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      // Add this line if "images" field is not set initially
    }
  })

  const { images, setImages } = useContext(AppContext)
  const [errorMessageImage, setErrorMessageImage] = useState<string | undefined>()
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    if (isClick) {
      if (images.length < 5) {
        setErrorMessageImage('Vui lòng nhập đủ 6 ảnh')
        return
      }
      if (images.length === 6) {
        setErrorMessageImage(undefined)
      }
    }
  }, [images, isClick])

  const addProductMutation = useMutation({ mutationFn: (body: ProductSchema) => productApi.addProduct(body) })
  // const uploadImageMutation = useMutation({ mutationFn: (body: File) => productApi.upLoadImageProducts(body) })

  const onSubmit = handleSubmit((data) => {
    if (typeof errorMessageImage === 'string') {
      return undefined
    }

    // uploadImageMutation.mutate(images[1])

    addProductMutation.mutate(data, {
      onSuccess: () => {
        console.log(data)
      }
    })
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categoryOption'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  const handleCheckValidationUploadImage = () => {
    setIsClick(true)
  }

  const handleOnchange = (file: File) => {
    setImages((prev) => [...prev, file])
  }

  return (
    <form onSubmit={onSubmit} className='grid h-[590px] grid-cols-12 gap-10 px-8'>
      <div className='col-span-7'>
        <div>
          <Input errorMessage={errors.name?.message} register={register} name='name' placeholder='Áo thun chính hãng'>
            Tên sản phẩm
          </Input>
        </div>
        <div className='mt-2 grid grid-cols-12 gap-4'>
          <div className='col-span-8'>
            <h1 className='mb-2 text-[15px] font-bold'>Chọn danh mục</h1>
            <select
              {...register('category')}
              className='focus:primaryColor h-[40px] w-full rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-500 outline-none '
            >
              <option defaultValue='Chọn danh mục' className=''>
                Chọn danh mục
              </option>
              {categoryData?.data.data.map((category, index) => (
                <option key={index} className='' value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className='mt-1 min-h-[1rem] text-xs text-red-600'>{errors.category?.message}</p>
          </div>
          <div className='col-span-4'>
            <Controller
              control={control}
              name='quantity'
              render={({ field }) => (
                <InputNumber errorMessage={errors.quantity?.message} placeholder='Số lượng' onChange={field.onChange}>
                  Số lượng sảng phẩm
                </InputNumber>
              )}
            />
          </div>
        </div>
        <div className='mt-2'>
          <h1 className='mb-2 text-[15px] font-bold'>Mô tả</h1>
          <textarea
            placeholder={errors.description?.message}
            {...register('description')}
            className='h-[363px] w-full rounded-md border border-gray-300 p-3 text-sm outline-none'
          ></textarea>
          <p className='mt-1 min-h-[1rem] text-xs text-red-600'>{errors.description?.message}</p>
        </div>
      </div>
      <div className='col-span-5'>
        <div className='mb-2 grid grid-cols-12 gap-3'>
          <div className='col-span-6'>
            <Controller
              control={control}
              name='price'
              render={({ field }) => (
                <InputNumber errorMessage={errors.price?.message} placeholder='0đ' onChange={field.onChange}>
                  Giá
                </InputNumber>
              )}
            />
          </div>
          <div className='col-span-6'>
            <Controller
              control={control}
              name='price_before_discount'
              render={({ field }) => (
                <InputNumber
                  errorMessage={errors.price_before_discount?.message}
                  placeholder='0đ'
                  onChange={field.onChange}
                >
                  Giá trước khuyến mãi
                </InputNumber>
              )}
            />
          </div>
        </div>
        <div>
          <h1 className='mb-2 text-[15px] font-bold'>
            Thêm ảnh <span className='text-xs font-normal text-primaryColor'>{errorMessageImage}</span>
          </h1>
          <div className='grid gap-4'>
            <div>
              <UploadImage
                messageError={errorMessageImage}
                setValue={setValue}
                onChange={handleOnchange}
                id={String(5)}
                name={String(5)}
                register={register}
                hideText={false}
                height='h-[300px]'
              />
            </div>
            <div className='grid grid-cols-5 gap-4'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <UploadImage
                    onChange={handleOnchange}
                    messageError={errorMessageImage}
                    setValue={setValue}
                    name={String(index)}
                    register={register}
                    key={index}
                    id={index.toString()}
                    hideText={true}
                    height='h-[80px]'
                  />
                ))}
            </div>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-12 gap-3 '>
          <button
            onClick={handleCheckValidationUploadImage}
            type='submit'
            className='col-span-6 rounded-sm bg-primaryColor px-3 py-2 text-white'
          >
            Thêm sản phẩm
          </button>
          <button className='col-span-6 rounded-sm border border-primaryColor px-3 py-2 text-primaryColor'>
            Nhập lại thông tin
          </button>
        </div>
      </div>
    </form>
  )
}
