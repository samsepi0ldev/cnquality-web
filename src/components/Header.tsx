import { FaPhone, FaStore } from 'react-icons/fa'
import Image from 'next/image'

import { CustomLink } from './CustomLink'
import logoCNQuality from '../assets/logo.png'

export function Header () {
  return (
    <header className='w-full h-60 flex flex-col'>
      <nav className='w-fit h-10 hidden items-center px-5 text-sm font-medium sm:flex'>
        <CustomLink href='/'>
          <a className='first:ml-0 mx-5 leading-10 relative after:content[""] after:w-full after:h-1 after:block after:absolute after:bottom-0 after:rounded-t-full'>
            Inicio
          </a>
        </CustomLink>
        <CustomLink href='/about'>
          <a className='first:ml-0 mx-5 leading-10 relative after:content[""] after:w-full after:h-1 after:block after:absolute after:bottom-0 after:rounded-t-full'>
            Conheça a CN Quality
          </a>
        </CustomLink>
        <CustomLink href='/products'>
          <a className='first:ml-0 mx-5 leading-10 relative after:content[""] after:w-full after:h-1 after:block after:absolute after:bottom-0 after:rounded-t-full'>
            Nossos produtos
          </a>
        </CustomLink>
        <CustomLink href='/contact'>
          <a className='first:ml-0 mx-5 leading-10 relative after:content[""] after:w-full after:h-1 after:block after:absolute after:bottom-0 after:rounded-t-full'>
            Fale conosco
          </a>
        </CustomLink>
      </nav>
      <section className='px-8 sm:px-40 flex items-center gap-40 h-full bg-white'>
        <div className='w-40'>
          <Image loading='eager' src={logoCNQuality} alt='CN Quality' />
        </div>
        <div className='gap-14 hidden sm:flex'>
          <div className='flex flex-col gap-6'>
            <h4 className='text-green-600 font-bold'>Empresa</h4>
            <div className='text-zinc-900 flex items-center'>
              <FaStore className='text-2xl self-start' />
              <div className='pl-5 flex flex-col leading-5'>
                <span>C NERI DOS SANTOS</span>
                <span>CNPJ: 07.917.278/0001-77</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <h4 className='text-green-600 font-bold'>Contato</h4>
            <div className='text-zinc-900 flex items-center'>
              <FaPhone className='text-2xl self-start' />
              <div className='pl-5 flex flex-col leading-5'>
                <span>75 3022-9130</span>
                <span>75 9 9964-8966</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}
