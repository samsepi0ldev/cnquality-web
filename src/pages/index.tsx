import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import productImg from '../assets/product.png'
import { ProductBox } from '../components/ProductBox'
import { api } from '../services/api'
import { queryClient } from '../services/query-client'

import errorImage from '../assets/error.jpg'

type Category = {
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

interface HomeProps {
  categories: Category[]
  products: Product[]
}

export default function Home({ categories, products }: HomeProps) {
  const [error, setError] = useState<any>(null)
  async function handlePrefetchProduct(productId: number) {
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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
      <div className='py-8 px-40 flex flex-col items-center justify-center'>
        <section className='w-full'>
          <h1 className='text-2xl text-green-600 font-semibold my-10 text-center'>
            Conheça nossas linhas de produtos
          </h1>
          <Carousel responsive={responsive}>
            {products.map(product => (
              <Link
                key={product.name.toString()}
                href={`/products/${product.id}`}
              >
                <a onMouseEnter={() => handlePrefetchProduct(product.id)} className='flex'>
                  <ProductBox data={product} />
                </a>
              </Link>
            ))}
          </Carousel>
        </section>
        <section className='w-full'>
          <h1 className='text-2xl text-green-600 font-semibold my-10 text-center'>
            Conheça nossas categorias
          </h1>
          {categories && (
            <Carousel responsive={responsive}>
            {categories.map(({ id, name, imageUrl }) => (
              <div key={id} className='bg-blue-700 rounded overflow-hidden w-fit shrink-0'>
                <span className='text-white whitespace-nowrap text-xl text-center w-full block py-3'>{name}</span>
                <div className='relative w-60 h-60'>
                  <Image
                    src={error ?? imageUrl}
                    alt={name}
                    layout='fill'
                    placeholder='blur'
                    onError={() => setError(errorImage)}
                    blurDataURL='/assets/placeholder.png'
                  />
                </div>
              </div>
            ))}
          </Carousel>
          )}
        </section>
        <div className='mb-20'>
          <h1 className='text-2xl text-zinc-900 my-10'>
            Siga-nos em nossas redes sociais
          </h1>
          <div className='flex items-center justify-center gap-8'>
            <a
              className='text-4xl w-16 h-16 rounded-full bg-gradient-instagram text-white flex items-center justify-center hover:saturate-150 transition-all'
              href='https://www.instagram.com/cn_quality/'
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram />
            </a>
            <a
              className='text-4xl w-16 h-16 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:saturate-150 transition-all'
              href='https://api.whatsapp.com/send?phone=5575999648966&text=Ol%C3%A1%2C%20CN%20Quality'
              target='_blank'
              rel='noreferrer'
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const promises = [api.get('/categories'), api.get('/products', { params: { take: 5 } })]
  const [c, p] = await Promise.all(promises)
  return {
    props: {
      categories: c.data,
      products: p.data.data ?? []
    }
  }
}
