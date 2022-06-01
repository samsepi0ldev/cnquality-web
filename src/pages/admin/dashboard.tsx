import Link from 'next/link'
import Image from 'next/image'
import { FaDoorOpen, FaPen, FaTrashAlt } from 'react-icons/fa'
import { HeaderDashboard } from '../../components/HeaderDashboard'

export default function Dashboard () {
  return (
    <>
      <HeaderDashboard />
      <main className='p-4 flex justify-center flex-wrap gap-8'>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className='relative rounded overflow-hidden flex flex-col gap-2 p-4 w-full max-w-xs text-zinc-700 shadow-sm bg-white dark:bg-zinc-900'>
            <span className='z-10 dark:text-zinc-100'>Nome produto <strong className='text-green-600'>/Disponível</strong></span>
            <strong className='text-zinc-900 dark:text-zinc-100 z-10'>Categoria</strong>
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
                <Image width={150} height={150} src='https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg' alt='Image' />
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}
