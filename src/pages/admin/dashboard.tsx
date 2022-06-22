import { useState } from 'react'
import Image from 'next/image'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

import { HeaderDashboard } from '../../components/HeaderDashboard'
import { useProducts } from '../../hooks/useProducts'
import { Pagination } from '../../components/Pagination'

export default function Dashboard () {
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = useProducts(page)
  return (
    <>
      <HeaderDashboard />
      <main className='p-4 flex justify-center flex-wrap gap-8'>
        {isLoading ? (
          <span className='m-auto w-8 h-8 block rounded-full border-4 border-t-green-600 border-green-600/10 animate-spin'></span>
        ): error ? (
<div className='p-4 bg-red-500 h-fit rounded text-zinc-100 self-center mx-auto shadow-md'>
                Oops!!! Algo de errado não esta certo.
              </div>
        ) : data.products && data.products.map(product => (
          <div key={product.id} className='relative rounded overflow-hidden flex flex-col gap-2 p-4 w-full max-w-xs text-zinc-700 shadow-sm bg-white dark:bg-zinc-900'>
            <span className='z-10 dark:text-zinc-100'>{product.name} <strong className={product.available ? 'text-green-600' : 'text-red-600'}>/{product.available ? 'Disponível' : 'Indisponível'}</strong></span>
            <strong className='text-zinc-900 dark:text-zinc-100 z-10'>{product.category.name}</strong>
            <div className='flex gap-1 mt-4 z-10'>
              <button className='transition-colors w-10 h-10 border-[1px] border-brand-500 text-brand-500 rounded hover:bg-brand-500 hover:text-zinc-100 flex items-center justify-center'>
                <FaPen />
              </button>
              <button className='transition-colors w-10 h-10 border-[1px] border-brand-500 text-brand-500 rounded hover:bg-brand-500 hover:text-zinc-100 flex items-center justify-center'>
                <FaTrashAlt />
              </button>
            </div>
            <div className='flex w-full h-full absolute left-0 top-0 z-0 overflow-hidden'>
              <div className='w-full h-full bg-gradient-to-r from-white dark:from-zinc-900 to-white/40 dark:to-zinc-900/40'></div>
              <div className='absolute right-0 -z-10'>
                <Image width={150} height={150} src={product.imageUrl} alt={product.name} />
              </div>
            </div>
          </div>
        ))}
        {!isLoading && (
              <Pagination
                totalCountOfRegisters={data.count}
                registerPerPage={6}
                currentPage={page}
                onPageChange={setPage}
              />
            )}
      </main>
    </>
  )
}
