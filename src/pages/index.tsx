import Image from 'next/image'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

import productImg from '../assets/product.png'

export default function Home () {
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
        <div>
          <h1 className='text-2xl text-green-600 font-semibold my-10'>
            Conheça nossas linhas de produtos
          </h1>
        </div>
        <div>
          <h1 className='text-2xl text-green-600 font-semibold my-10'>
            Conheça nossas categorias
          </h1>
        </div>
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
