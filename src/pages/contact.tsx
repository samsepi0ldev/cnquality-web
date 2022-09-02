import Image from 'next/image'
import { FormEvent, useRef, useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { Form, Input } from '@rocketseat/unform'

import contactImg from '../assets/contact.png'
import { api } from '../services/api';
import { Loader } from '../components/Loader';

function to (promise: Promise<any>) {
  return promise
    .then(res => [null, res])
    .catch(error => [error.response.data.error])
}

export default function Contact () {
  const [isLoadingShipping, setIsLoadingShipping] = useState(false)
  async function handleSubmit (data: any) {
    setIsLoadingShipping(true)
    const [error, _] = await to(api.post('/budgets', {
      ...data,
      message: `
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <p>Óla eu sou <b>${data.name.toUpperCase()}</b></p>
              <p>${data.message}</p>
              <p>favor entrar em contato com o email <b>${data.email}</b>.</p>
              <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
              <p>Boa Sorte e bom trabalho.</p>
            </div>
            <style>
              .main { background-color: white; }
              a:hover { border-left-width: 1em; min-height: 2em; }
            </style>
          </body>
        </html>
      `
    }))
    if (error) alert('Preencha todos os campos!')
    setIsLoadingShipping(false)
  }
  return (
    <main>
      <Image loading='eager' width="100%" height="25px" layout="responsive" src={contactImg} alt='Imagem sobre' />
      <div className='px-8 sm:px-40 py-14'>
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
        <Form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <label htmlFor='name' className='flex flex-col'>
            <span className='font-bold'>Nome completo</span>
            <Input type='text' name='name' id='name' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='email' className='flex flex-col'>
            <span className='font-bold'>Email</span>
            <Input type='text' name='email' id='email' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='subject' className='flex flex-col'>
            <span className='font-bold'>Assunto</span>
            <Input type='text' name='subject' id='subject' className='border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>
          <label htmlFor='message' className='flex flex-col'>
            <span className='font-bold'>Mensagem</span>
            <Input multiline name='message' id='message' className='h-60 border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' />
          </label>

          <button disabled={isLoadingShipping} className='mt-4 w-fit bg-green-600 text-zinc-100 flex items-center gap-4 h-12 leading-12 rounded-md pr-10 overflow-hidden'>
            {!isLoadingShipping ? (
              <>
                <div className='bg-green-700 px-4 h-full flex items-center justify-center'><FaPaperPlane /></div>
                Enviar mensagem
              </>
            ) : <Loader />}
          </button>
        </Form>
      </div>
    </main>
  )
}