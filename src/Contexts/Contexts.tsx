import React, { createContext, useState } from 'react'
import { Product } from 'src/types/product.type'

interface AppContextInterface {
  images: File[] | null
  setImages: React.Dispatch<React.SetStateAction<File[] | null>>
  product: Product | undefined
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}

const initialAppContext: AppContextInterface = {
  images: [],
  setImages: () => null,
  product: undefined,
  setProduct: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export default function Context({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<File[] | null>(initialAppContext.images)
  const [product, setProduct] = useState<Product>()
  return (
    <div>
      <AppContext.Provider
        value={{
          images,
          setImages,
          product,
          setProduct
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  )
}
