import * as yup from 'yup'

// function checkPrice(this: yup.TestContext<yup.AnyObject>) {
//   const { price, price_before_discount } = this.parent as { price: string; price_before_discount: string }
//   if(price )
// }

export const productSchema = yup.object({
  name: yup
    .string()
    .required('Nhập tên sản phẩm là bắc buộc')
    .max(50, 'Độ dài sản phẩm không được quá 50 kí tự')
    .min(10, 'Độ dài tên sản phẩm phải lớn hơn 10 kí tự'),
  quantity: yup
    .string()
    .required('Nhập số lượng là bắc buộc')
    .test({
      name: 'is-valid-quantity',
      message: 'Vui lòng điền số lượng phù hợp',
      test: (value) => Number(value) >= 0
    }),
  description: yup
    .string()
    .required('Nhập mô tả là bắc buộc')
    .min(20, 'Độ dài tên mô tả phải lớn hơn 50 kí tự')
    .max(300, 'Độ dài sản phẩm không được quá 300 kí tự'),
  price: yup
    .string()
    .required('Nhập giá tiền là bắc buộc')
    .test({
      name: 'is-valid-price',
      message: 'Vui lòng giá tiền phù hợp',
      test: (value) => Number(value) >= 0
    }),
  price_before_discount: yup
    .string()
    .required('Nhập giá tiền là bắc buộc')
    .test({
      name: 'is-valid-price',
      message: 'Vui lòng giá tiền phù hợp',
      test: (value) => Number(value) >= 0
    }),
  images: yup.array().min(5, 'Please select at least 6 images.'),
  category: yup.string().required('chọn category là bắc buộc').notOneOf(['Chọn danh mục'], 'Vui lòng chọn danh mục')
})

export type ProductSchema = yup.InferType<typeof productSchema>
