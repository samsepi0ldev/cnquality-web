import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'

import productImg from '../../assets/product.png'
import emptyImg from '../../assets/inbox.png'
import { CustomLink } from '../../components/CustomLink'
import { Pagination } from '../../components/Pagination'
import { api } from '../../services/api'
import { useQuery } from 'react-query'
import { getProducts, useProducts } from '../../hooks/useProducts'
import { queryClient } from '../../services/query-client'
import { ProductBox } from '../../components/ProductBox'

type CategoryProps = {
  id: number
  name: string
  imageUrl: string
}

type Product = {
  id: number
  name: string
  imageUrl: string
  categoryId: number
}

interface ProductProps {
  categories: CategoryProps[]
}

function GraphCMSImageLoader ({ src, width }) {
  const relativeSrc = src => src.split('/').pop()

  return `https://media.graphcms.com/resize=width:${width}/${relativeSrc(src)}`
}

export default function Products ({ categories }: ProductProps) {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState(undefined)
  const { data, isLoading, error, isFetching } = useProducts(page, url)

  let time = null

  async function handlePrefetchProduct (productId: number) {
    await queryClient.prefetchQuery(
      ['product', productId.toString()],
      async () => {
        const response = await api.get(`/products/${productId}`)
        return response.data
      },
      {
        staleTime: 1000 * 60 * 10
      }
    )
  }
  const handleProductsFromCategory = useCallback((id: number) => {
    setUrl(`/products/${id}/results`)
    setPage(1)
  }, [])

  const debounceEvent = (fn: any, wait = 1000, time = undefined) => (...args) => {
    clearTimeout(time)
    time = setTimeout(() => fn(...args), wait)
  }
  

  function handleProductsByName (e: any) {
    setUrl(`/products/results/show?name=${e.target.value}`)
    setPage(1)
  }
  return (
    <main>
      <Image
        loading='eager'
        width='100%'
        height='25px'
        layout='responsive'
        src={productImg}
        alt='Imagem sobre'
      />
      <div className='px-32 py-8 flex gap-4'>
        <aside className='bg-green-600 w-fit p-8 rounded-xl'>
          <header className='border-b-[1px] border-zinc-50/30 pb-5'>
            <h4 className='text-white font-medium'>Pesquisa: {isFetching ? 'carregando' : null}</h4>
            <div className='flex items-center bg-white px-2 rounded-md mt-8'>
              <input
                type='text'
                className='border-0 ring-0 focus:ring-0 bg-transparent'
                placeholder='Digite sua pesquisa...'
                onKeyUp={debounceEvent(handleProductsByName, 200)}
              />
              <FaSearch className='text-zinc-500' />
            </div>
          </header>
          <div className='mt-5'>
            <span className='font-medium text-white'>Categorias</span>
            <ul className='mt-4'>
              {categories.map(category => (
                <li key={category.id} className='text-zinc-100'>
                  <button
                    onClick={() => handleProductsFromCategory(category.id)}
                    className='font-normal text-sm hover:bg-black/10 w-full text-left py-2 px-4 rounded-lg'
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section className='w-full flex flex-wrap gap-4'>
          <>
            {isLoading ? (
              <span className='m-auto w-8 h-8 block rounded-full border-4 border-t-green-600 border-green-600/10 animate-spin'></span>
            ) : error ? (
              <div className='p-4 bg-red-500 h-fit rounded text-zinc-100 self-center mx-auto shadow-md'>
                Oops!!! Algo de errado não esta certo.
              </div>
            ) : (
              data.products && data.products.map(product => (
                <Link
                  key={product.name.toString()}
                  href={`products/${product.id}`}
                >
                  <a onMouseEnter={() => handlePrefetchProduct(product.id)} className='flex'>
                    <ProductBox data={product} />
                  </a>
                </Link>
              ))
            )}

            {!isLoading && (
              <Pagination
                totalCountOfRegisters={data.count}
                registerPerPage={6}
                currentPage={page}
                onPageChange={setPage}
              />
            )}
          </>
        </section>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/categories')
  return {
    props: {
      categories: response.data
    }
  }
}
