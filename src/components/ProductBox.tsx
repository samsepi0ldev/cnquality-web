import Link from 'next/link'
import Image from 'next/image'

type Product = {
  name: string
  imageUrl: string
}

interface ProductBoxProps {
  data: Product
}

export function ProductBox ({ data: { name, imageUrl } }: ProductBoxProps) {
  return (
    <div className='flex flex-col items-center w-60 bg-white rounded-md p-6 border border-zinc-200 hover:shadow-xl overflow-hidden transition-shadow'>
      <div className='relative w-60 h-60'>
        <Image src={imageUrl} alt='Image do google' layout='fill' />
      </div>
      <span className='font-bold text-center mt-4'>{name}</span>
    </div>
  )
}
