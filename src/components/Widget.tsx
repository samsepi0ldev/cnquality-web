import { FaShoppingCart } from 'react-icons/fa'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm'

export function Widget () {
  return (
    <Popover className='flex flex-col fixed items-end right-8 bottom-8'>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className='bg-green-600 text-zinc-100 px-3 h-12 rounded-full flex items-center group'>
        <FaShoppingCart className='w-6 h-6' />
        <div className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
          <span className='pl-2'>Carrinho</span>
        </div>
      </Popover.Button>
    </Popover>
  )
}
