import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { google } from 'googleapis'
import { useShopList } from '../../hooks/ShopList'


type DescriptionType = {
  link: string
  text: string
}

type ProductProps = {
  product: {
    id: number
    name: string
    image: string
    available: boolean
    description: DescriptionType
    category_id: number
  }
}

export default function Product ({ product }: ProductProps) {
  const { name, image, available, description } = product
  const { productsDataSetter, productsList } = useShopList()

  const isAlreadyAddInShopList = productsList.includes(name)

  return (
    <section className='px-40 py-8 flex gap-4 justify-evenly'>
      <div className='w-64 h-64 relative flex overflow-hidden'>
        <Image className='flex-shrink-0 block rounded-lg' loading='eager' layout='fill' src={image} alt={name} />
      </div>
      <div className='flex flex-col max-w-lg'>
        <h1 className='text-2xl mb-4'>{name}</h1>
        <span className={`text-sm ${available ? 'text-green-600' : 'text-zinc-600'}`}>{available ? 'Disponível' : 'Indisponível'}</span>
        <p className='text-sm mt-4'>

        </p>
        
        <button
          onClick={() => productsDataSetter(name)}
          disabled={!available || isAlreadyAddInShopList}
          className={`text-zinc-100 h-10 leading-10 rounded-md mt-8 px-4 ${isAlreadyAddInShopList ? 'bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600'}`}>
            { isAlreadyAddInShopList ? 'Adicionado ao carrinho' : 'Adicionar no carrinho'}
          </button>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params
  const products = [
    {
      name: 'Limpa Alumínio',
      image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
      available: true,
      category: 'Limpeza Geral'
    },
    {
      name: 'Shampoo automotivo',
      image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
      available: true,
      category: 'Linha Automotiva'
    },
    {
      name: 'Hipoclorito de sódio a 12%',
      image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
      available: true,
      category: 'Institucional'
    },
    {
      name: 'Sabão líquido perolizado',
      image: 'https://images.tcdn.com.br/img/img_prod/746019/limpador_multiuso_tradicional_500ml_rajja_37_1_20200127131831.jpg',
      available: false,
      category: 'Doméstica'
    }
  ]

  // async function fetchGoogleAndReturnSnippets (query) {
  //   const customerSearch = google.customsearch('v1')
  //   const response = await customerSearch.cse.list({
  //     auth: process.env.API_KEY,
  //     cx: process.env.SEARCH_ENGINEER_ID,
  //     q: query,
  //     exactTerms: 'produto ' + query + ' limpeza',
  //     num: 1
  //   })
  //   console.log(response.data.items)
  //   const snippets = response.data.items.map(item => ({ link: item.link, text: item.snippet }))
  //   return snippets[0]
  // }
  

  // const description = await fetchGoogleAndReturnSnippets(product.name)
  // Object.assign(product, { description })

  return {
    props: { product: products[+id] }
  }
}
