import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { google } from 'googleapis'

import { useShopList } from '../../hooks/ShopList'
import { api } from '../../services/api'
import { FaArrowLeft, FaCheckCircle, FaTag } from 'react-icons/fa'
import { useQuery } from 'react-query'


type DescriptionType = {
  link: string
  text: string
}

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

type ProductProps = {
  productId: number
}

export default function Product ({ productId }: ProductProps) {
  const { data, isLoading, error, isFetching } = useQuery<Product>(['product', productId], async () => {
    const response = await api.get(`/products/${productId}`)
    return response.data
  }, {
    staleTime: 1000 * 60 * 10
  })
  const { productsDataSetter, productsList } = useShopList()

  const isAlreadyAddInShopList = productsList.includes(data?.name)

  return (
      <section className='px-40 py-8 flex gap-4 justify-evenly'>
        {isLoading ? (
          <span className='m-auto w-8 h-8 block rounded-full border-4 border-t-green-600 border-green-600/10 animate-spin'></span>
        ): (
          <>
            <div className='w-64 h-64 relative flex overflow-hidden'>
              <Image className='flex-shrink-0 block rounded-lg' loading='eager' layout='fill' src={data.imageUrl} alt={data.name} />
            </div>
            <div className='flex flex-col max-w-lg'>
              <h1 className='text-2xl mb-4'>{data.name}</h1>
              <span className={`flex gap-2 items-center text-sm ${data.available ? 'text-green-600' : 'text-zinc-600'}`}><FaTag /> {data.available ? 'Disponível' : 'Indisponível'}</span>
              <p className='text-sm mt-4'>
                Você pode adicionar este produto ao carrinho e assim solicitar um orçamento do mesmo
              </p>
              {isAlreadyAddInShopList ? (
                <span className='flex items-center justify-center gap-2 text-green-600 h-10 leading-10 mt-8 px-4'>
                  <FaCheckCircle />
                  Adicionado ao carrinho
                </span>
              ): (
                <button
                  onClick={() => productsDataSetter(data.name)}
                  disabled={!data.available}
                  className='text-zinc-100 h-10 leading-10 rounded-md mt-8 px-4 bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600'>
                    Adicionar no carrinho
                </button>
              )}
            </div>
          </>
        )}
      </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  return {
    props: { productId: params.id }
  }
}
