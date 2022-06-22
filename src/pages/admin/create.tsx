import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaImage } from 'react-icons/fa'
import { GetStaticProps } from 'next'

import { api } from '../../services/api'
import { HeaderDashboard } from '../../components/HeaderDashboard'

type CategoryProps = {
  id: number
  name: string
  imageUrl: string
}

interface DashboardProps {
  categories: CategoryProps[]
}

export default function Create ({ categories }: DashboardProps) {
  return (
    <>
      <HeaderDashboard />
      <nav className='flex items-center justify-center gap-10 mt-6'>
        <Popover className='relative'>
        <Popover.Button className='rounded border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-zinc-100 px-4 py-2 transition-colors'>
          Categoria
        </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl'>
                <form className='bg-white dark:bg-zinc-900 p-8 rounded flex flex-col gap-4'>
                  <input className='w-full h-12 px-4 rounded-md bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 border-2 border-transparent focus:ring-0 focus:border-brand-500 duration-200 transition-[border-color] ease-in-out' type='text' name='name' placeholder='Nome da categoria' />
                  <label className='cursor-pointer w-full h-36 block border-2 border-dashed rounded border-brand-500 flex items-center justify-center' htmlFor='image'>
                    <span className='text-brand-500 flex items-center gap-4'>
                      <FaImage className='text-3xl' />
                      Selecione uma imagem
                    </span>
                    <input className='hidden' name='image' type='file' id='image' />
                  </label>
                  <button className='w-full h-12 uppercase bg-brand-500 text-zinc-100 rounded-md'>Salvar</button>
                </form>
              </Popover.Panel>
          </Transition>
        </Popover>
        <Popover className='relative'>
        <Popover.Button className='rounded border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-zinc-100 px-4 py-2 transition-colors'>
          Produtos
        </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl'>
                <form className='bg-white dark:bg-zinc-900 p-8 rounded flex flex-col gap-4'>
                  <input className='dark:bg-zinc-800 dark:text-zinc-100 w-full h-12 px-4 rounded-md bg-zinc-200 border-2 border-transparent focus:ring-0 focus:border-brand-500 duration-200 transition-[border-color] ease-in-out' type='text' name='name' placeholder='Nome do produto' />
                  <select className=' dark:bg-zinc-800 dark:text-zinc-100 w-full h-12 px-4 rounded-md bg-zinc-200 border-2 border-transparent focus:ring-0 focus:border-brand-500 duration-200 transition-[border-color] ease-in-out' name='category_id'>
                    <option selected disabled>Escolha uma categoria</option>
                    {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                  </select>
                  <label className='cursor-pointer w-full h-36 border-2 border-dashed rounded border-brand-500 flex items-center justify-center' htmlFor='image'>
                    <span className='text-brand-500 flex items-center gap-4'>
                      <FaImage className='text-3xl' />
                      Selecione uma imagem
                    </span>
                    <input className='hidden' name='image' type='file' id='image' />
                  </label>
                  <button className='w-full h-12 uppercase bg-brand-500 text-zinc-100 rounded-md'>Salvar</button>
                </form>
              </Popover.Panel>
          </Transition>
        </Popover>
      </nav>
    </>
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
