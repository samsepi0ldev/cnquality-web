import Image from 'next/image'
import { FaPhone, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";

import contactImg from '../assets/contact.png'

export default function Contact () {
  return (
    <main>
      <Image loading='eager' width="100%" height="25px" layout="responsive" src={contactImg} alt='Imagem sobre' />
      <div className='px-40 py-14'>
        <h1 className='text-3xl font-bold text-green-600 mb-14'>Fale conosco</h1>
        <div className='flex flex-col gap-2 mb-14'>
          <span className='flex items-center gap-2'>
            <FaPhone />
            75 3022-9130
          </span>
          <span className='flex items-center gap-2'>
            <FaWhatsapp />
            75 9 9964-8966
          </span>
          <span className='flex items-center gap-2'>
            <FaEnvelope />
            casadoclorovendas@hotmail.com
          </span>
        </div>

        <h3 className='font-bold text-lg mb-14'>Formulário de contato</h3>
        <form className='flex flex-col gap-2'>
          <label htmlFor='name' className='flex flex-col'>
            <span className='font-bold'>Nome completo</span>
            <input type='text' name='name' id='name' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='email' className='flex flex-col'>
            <span className='font-bold'>Email</span>
            <input type='text' name='email' id='email' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='subject' className='flex flex-col'>
            <span className='font-bold'>Assunto</span>
            <input type='text' name='subject' id='subject' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='message' className='flex flex-col'>
            <span className='font-bold'>Mensagem</span>
            <textarea name='message' id='message' className='h-60 border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>

          <button className='mt-4 w-fit bg-green-600 text-zinc-100 flex items-center gap-4 h-12 leading-12 rounded-md pr-10 overflow-hidden'>
            <div className='bg-green-700 px-4 h-full flex items-center justify-center'><FaPaperPlane /></div>
            Enviar mensagem
          </button>
        </form>
      </div>
    </main>
  )
}