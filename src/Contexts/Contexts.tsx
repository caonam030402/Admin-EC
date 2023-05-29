import React, { createContext, useState } from 'react'

interface AppContextInterface {
  images: File[]
  setImages: React.Dispatch<React.SetStateAction<File[]>>
}

const initialAppContext: AppContextInterface = {
  images: [],
  setImages: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export default function Context({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<File[]>(initialAppContext.images)

  return (
    <div>
      <AppContext.Provider
        value={{
          images,
          setImages
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  )
}
