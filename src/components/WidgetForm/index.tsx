import { FormEvent, useCallback, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useShopList } from '../../hooks/ShopList'
import { api } from '../../services/api'
import { Loader } from '../Loader'

function to (promise: Promise<any>) {
  return promise
    .then(res => [null, res])
    .catch(error => [error])
}

export function WidgetForm () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { productsList, productsDataSetter } = useShopList()
  const [isLoadingShipping, setIsLoadingShipping] = useState(false)

  const removeProductFromList = useCallback((index: number) => {
    productsDataSetter(products => products.filter((_, i) => i !== index))
  }, [productsDataSetter])

  async function submitHandle (e: FormEvent) {
    e.preventDefault()
    setIsLoadingShipping(true)
    const [error, _] = await to(api.post('/budgets', {
      name,
      email,
      subject: 'Orçamento',
      message: `
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Olá aqui é o Server CN Quality</h1>
              <p>O cliente <b>${name.toUpperCase()}</b> quer saber o orçamento dos seguintes produtos: <b>${productsList.join(', ')}</b>, favor entrar em contato com o email <b>${email}</b>.</p>
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
    setIsLoadingShipping(false)
    if (error) alert(error.data)
  }

  return (
    <form onSubmit={submitHandle} className='w-[calc(100vw-2.5rem)] md:w-auto bg-white rounded-lg p-4 mb-4 shadow-lg'>
      <div className='flex flex-col gap-4 text-sm'>
        <input onChange={e => setName(e.target.value)} className='text-sm border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' type='text' name='name' placeholder='Digite seu nome' autoComplete='off' />
        <input onChange={e => setEmail(e.target.value)} className='text-sm border-zinc-300 rounded-md focus:ring-0 focus:ring-green-600 focus:border-green-600' type='email' name='email' placeholder='Digite um email pra contato' autoComplete='off' />
        <div className='max-w-xs flex flex-wrap gap-2'>
          {productsList.map((name, i) => (
            <div key={i} className='rounded-md bg-zinc-200 p-2 flex items-center gap-2'>
              <span className='w-28 truncate text-zinc-900'>
                {name}
              </span>
              <button onClick={() => removeProductFromList(i)} type='button' className='text-zinc-600 hover:text-zinc-900'>
                <FiX />
              </button>
            </div>
          ))}
        </div>
        <button
          disabled={!name.length || !email.length || !productsList.length || isLoadingShipping}
          className='bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-zinc-100 py-2 rounded-md' type='submit'>{!isLoadingShipping ? 'Enviar orçamento' : <Loader />}</button>
      </div>
    </form>
  )
}
