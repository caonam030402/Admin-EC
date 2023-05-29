import { Product, ProductList, ProductListConfig } from './../types/product.type'
import { http } from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { ProductSchema } from 'src/utils/rules'

const URL = 'products'

export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  addProduct(body: ProductSchema) {
    return http.post<SuccessResponse<Product>>(`${URL}/add-product`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  upLoadImageProducts(body: FormData) {
    return http.post<SuccessResponse<string>>('product/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
