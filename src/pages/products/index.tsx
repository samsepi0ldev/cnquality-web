import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import productImg from '../../assets/product.png'
import emptyImg from '../../assets/inbox.png'
import { CustomLink } from '../../components/CustomLink'
import { Pagination } from '../../components/Pagination'

const cat = [
  'Limpeza Geral',
  'Linha Automotiva',
  'Institucional',
  'Domestica',
  'Tratamento de Piso',
  'Linha Pet',
  'Álcool',
  'Produtos Químicos'
]

const products = [
  // {
  //   name: 'Limpa Alumínio',
  //   image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
  //   available: true,
  //   category: 'Limpeza Geral'
  // },
  // {
  //   name: 'Shampoo automotivo',
  //   image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
  //   available: true,
  //   category: 'Linha Automotiva'
  // },
  // {
  //   name: 'Hipoclorito de sódio a 12%',
  //   image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
  //   available: true,
  //   category: 'Institucional'
  // },
  // {
  //   name: 'Sabão líquido perolizado',
  //   image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
  //   available: false,
  //   category: 'Doméstica'
  // }
]

function GraphCMSImageLoader({ src, width }) {
  const relativeSrc = (src) => src.split("/").pop();

  return `https://media.graphcms.com/resize=width:${width}/${relativeSrc(src)}`;
}

export default function Products () {
  const [page, setPage] = useState(1)
  return (
    <main>
      <Image loading='eager' width="100%" height="25px" layout="responsive" src={productImg} alt='Imagem sobre' />
      <div className='px-32 py-8 flex gap-4'>
        <aside className='bg-green-600 w-fit p-8 rounded-xl'>
          <header className='border-b-[1px] border-zinc-50/30 pb-5'>
            <h4 className='text-white font-medium'>Pesquisa:</h4>
            <div className='flex items-center bg-white px-2 rounded-md mt-8'>
              <input type='text' className='border-0 ring-0 focus:ring-0 bg-transparent' placeholder='Digite sua pesquisa...' />
              <FaSearch className='text-zinc-500' />
            </div>
          </header>
          <div className='mt-5'>
            <span className='font-medium text-white'>Categorias</span>
            <ul className='mt-4'>
              {cat.map((value, i) => (
                <li key={i} className='text-zinc-100'>
                  <button className='font-normal text-sm hover:bg-black/10 w-full text-left py-2 px-4 rounded-lg'>{value}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section className='w-full flex flex-wrap gap-4'>
          <>
            {products.length ? products.map((product, i) => (
              <CustomLink key={product.name.toString()} href={`products/${i}`}>
                <a className='flex flex-col items-center w-60 bg-white rounded-md p-6 border-[1px] border-zinc-200 hover:shadow-xl transition-shadow'>
                  <div className='relative w-60 h-60'>
                    <Image src={product.image} alt='Image do google' layout='fill' />
                  </div>
                  <span className='font-bold text-center mt-4'>{product.name}</span>
                </a>
              </CustomLink>
            )) : (
              <div className='w-full max-w-sm flex flex-col justify-center items-center my-0 mx-auto'>
                <div className='w-32'>
                  <Image src={emptyImg} alt='Sem produtos' />
                </div>
                <strong className='text-2xl text-center my-4 text-zinc-900'>Oopa! Selecione uma categoria...</strong>
                <p className='text-center text-zinc-600'>Para visualizar alguns dos produtos selecione uma categoria do mesmo assim tera uma lista com os respectivos produtos dela!</p>
              </div>
            )}

            {!!products.length && (<Pagination totalCountOfRegisters={200} currentPage={page} onPageChange={setPage} />)}
          </>
        </section>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  }
}
