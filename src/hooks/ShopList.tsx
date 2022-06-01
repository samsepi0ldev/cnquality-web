import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

interface ShopListProviderProps {
  children: ReactNode
}

interface ShopListContextProps {
  productsDataSetter: (value: string | Function) => void
  productsList: string[]
}

const ShopListContext = createContext<ShopListContextProps>({} as ShopListContextProps)

export function ShopListProvider ({ children }: ShopListProviderProps) {
  const [productsList, setProductsList] = useState([])
  const [isLoadingShopListCache, setIsLoadingShopListCache] = useState(true)

  const productsDataSetter = useCallback(product => {
    if (typeof product === 'function') {
      setProductsList(product)
      return
    }
    if (!productsList.includes(product)) {
      setProductsList(products => [...products, product])
    }
  }, [productsList])

  useEffect(() => {
    setProductsList(JSON.parse(localStorage.getItem('shop-list')))
    setIsLoadingShopListCache(false)
  }, [])

  useEffect(() => {
    if (isLoadingShopListCache) return 
    localStorage.setItem('shop-list', JSON.stringify(productsList))
    console.log('Updating: CASH SHOP LIST')
  }, [isLoadingShopListCache, productsList])
   
  return (
    <ShopListContext.Provider value={{ productsDataSetter, productsList }}>
      {children}
    </ShopListContext.Provider>
  )
}

export function useShopList () {
  const context = useContext(ShopListContext)
  return context
}
