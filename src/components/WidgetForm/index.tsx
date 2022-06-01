import { useCallback, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useShopList } from '../../hooks/ShopList'


export function WidgetForm () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { productsList, productsDataSetter } = useShopList()

  const removeProductFromList = useCallback((index: number) => {
    productsDataSetter(products => products.filter((_, i) => i !== index))
  }, [productsDataSetter])

  return (
    <form className='w-[calc(100vw-2.5rem)] md:w-auto bg-white rounded-lg p-4 mb-4 shadow-lg'>
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
          disabled={!name.length || !email.length || !productsList.length}
          className='bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-zinc-100 py-2 rounded-md' type='submit'>Enviar orçamento</button>
      </div>
    </form>
  )
}
