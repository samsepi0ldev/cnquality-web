import Image from 'next/image'
import { FormEvent, useCallback, useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

import cnQualityLogo from '../../assets/logo.png'
import { api } from '../../services/api'

const to = (promise: Promise<any>) => promise
  .then(res => [null, res])
  .catch(error => [error])

export default function Admin () {
  const [error, setError] = useState<any>(undefined)
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const elms = e.target as any

    const data = {
      username: elms.username.value,
      password: elms.password.value
    }
    console.log(data)
    const [err, response] = await to(api.post('/session', data))
    if (err) {
      if (error) return
      setError(err.response.data.error)
      setTimeout(() => setError(undefined), 3000)
    }
    console.log(response)
  }, [error])
  return (
    <div className='w-full h-screen flex items-center justify-evenly text-zinc-800'>
      <div className='w-full max-w-md'>
        <div className='w-48 mb-16'>
          <Image src={cnQualityLogo} alt='CNQuality' />
        </div>
        <h1 className='text-6xl font-bold break-before-all'>Faça seu login na plataforma</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full max-w-lg rounded-md bg-white p-16 shadow-lg shadow-slate-200'>
        {error ? <span className='text-sm p-2 block text-red-500 border border-red-200 bg-red-100 font-medium rounded-md mb-2 text-center'>{error}</span> : null}
        <div className='flex flex-col gap-4'>
          <div className='relative flex-1 group'>
            <input className='peer w-full h-12 pl-12 pr-4 rounded-md bg-zinc-200 border-2 border-transparent focus:ring-0 focus:border-brand-500 duration-200 transition-[border-color] ease-in-out' type='text' name='username' placeholder='Usuário' autoComplete='off' />
            <FaUser className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 peer-focus:text-brand-500 transition-all ease-in-out duration-200' />
          </div>
          <div className='relative flex-1 group'>
            <input className='peer w-full h-12 pl-12 pr-4 rounded-md bg-zinc-200 border-2 border-transparent focus:ring-0 focus:border-brand-500 transition-[border-color] ease-in-out duration-200' type='password' name='password' placeholder='Usuário' />
            <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 peer-focus:text-brand-500 transition-all ease-in-out duration-200' />
          </div>
          <button className='w-full h-12 uppercase bg-brand-500 text-zinc-100 rounded-md' type='submit'>Entrar</button>
        </div>
      </form>
    </div>
  )
}
