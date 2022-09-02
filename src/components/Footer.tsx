import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import Image from 'next/image'

import logoTransparent from '../assets/logo-transparent.svg'
import cardFlag from '../assets/cartoes.png'
import { Widget } from "./Widget";
import { useShopList } from "../hooks/ShopList";

export function Footer () {
  const { productsList } = useShopList()
  return (
    <>
      {productsList.length ? <Widget /> : null}
      <footer className='px-8 sm:px-40 py-4 bg-blue-600 text-zinc-100 flex items-center justify-between'>
        <div className='w-fit'>
          <div className='w-24 sm:w-40'>
            <Image className='opacity-40 fill-white' src={logoTransparent} alt='CN Quality' />
          </div>
          <div className='w-32 sm:w-60'>
            <h4>Bandeiras</h4>
            <Image loading='eager' src={cardFlag} alt='Bandeiras de cartões' />
          </div>
        </div>
        <div>
          <ul>
            <li className='flex'>
              <FaMapMarkerAlt className='mr-4 translate-y-1' />
              <ul>
                <li>Travessa do limoeiro</li>
                <li>Quadra J</li>
                <li>N° 15, Bairro limoeiro</li>
                <li>CEP 44,097-416</li>
              </ul>
            </li>
            <li className='flex items-center mt-14'>
              <FaPhone className='mr-4' />
              75 3022-9130
            </li>
            <li className='flex items-center'>
              <FaWhatsapp className='mr-4' />
              75 9 9964-8966
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
