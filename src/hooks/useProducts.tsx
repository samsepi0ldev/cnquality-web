import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../services/api"

type Product = {
  id: number
  name: string
  imageUrl: string
  categoryId: number
  available: boolean
  category: {
    name: string
  }
}

type GetProductsProps = {
  count: number
  products: Product[]
}

function toHex (value: string) {
  var result = ''
  for (var i = 0; i < value.length; i++) {
    result += value.charCodeAt(i).toString(16)
  }
  return result
}


export async function getProducts (page: number, url: string): Promise<GetProductsProps> {
  const response = await api.get(url ?? '/products', {
    params: {
      skip: page,
      take: 6
    }
  })
  return {
    count: response.data.count,
    products: response.data.data
  }
}

export function useProducts (page: number, url?: string) {
  const key = url ? toHex(url + page) : page
  return useQuery(['products', key], () => getProducts(page, url), {
    staleTime: 1000 * 60 * 10
  })
}

