import Image from 'next/image'
import { useState } from 'react'

import errorImage from '../assets/error.jpg'

type Product = {
  name: string
  imageUrl: string
}

interface ProductBoxProps {
  data: Product
}

export function ProductBox ({ data: { name, imageUrl } }: ProductBoxProps) {
  const [error, setError] = useState<any>(null)
  return (
    <div className='flex flex-col items-center w-60 bg-white rounded-md p-6 border border-zinc-200 hover:shadow-xl overflow-hidden transition-shadow'>
      <div className='relative w-60 h-60'>
        <Image
          src={error ?? imageUrl}
          alt={name}
          placeholder='blur'
          blurDataURL='/assets/placeholder.png'
          onError={() => setError(errorImage)}
          layout='fill' />
      </div>
      <span className='font-bold text-center mt-4'>{name}</span>
    </div>
  )
}
