import Image from 'next/image'

import aboutImg from '../assets/about.png'

export default function About () {
  return (
    <main>
      <Image loading='eager' width="100%" height="25px" layout="responsive" src={aboutImg} alt='Imagem sobre' />
      <div className='px-8 sm:px-40 py-24'>
        <div>
          <h1 className='text-3xl uppercase font-bold text-green-600'>Quem somos</h1>
          <p className='mt-10'>Que honra ter você aqui! Somos a CN Quality, uma empresa familiar que está em sua segunda geração. Somos especialistas em fabricação e vendas de saneantes, e distribuidora de matéria prima para produtos químicos. Nosso principal objetivo é compreender as necessidades de nossos clientes e fornecer produtos que atendam a essa demanda. Estamos há mais de 12 anos no mercado, com excelência e qualidade comprovada, mas, sempre buscando melhorar nossas linhas e facilitar a entrega de nossos produtos. Há 4 anos construímos nossa própria indústria, procurando levar qualidade com um custo benefício ainda mais satisfatório ao consumidor final. Desejamos que você seja bem vindo(a) ao nosso site, aqui você irá conhecer todas as nossas linhas de produtos. Qualquer dúvida ou se desejar solicitar um orçamento entre em contato através de nosso telefone ou nos mande uma mensagem!</p>
        </div>
        <div>
          <div className='mt-24 border-b-[1px] border-green-600 pb-12'>
            <h1 className='text-3xl uppercase font-bold text-zinc-800'>Categoria</h1>
            <span className='ml-6 flex items-center gap-2 text-green-600 font-bold before:content-[""] before:w-3 before:h-3 before:block before:bg-green-600'>Ramo de atividade</span>
          </div>
          <p className='pt-12'>Aqui você encontra produtos que são indicados a limpeza em todos os âmbitos, seja para o seu lar ou sua empresa. Com diversas categorias que vão desde linha automotiva até linha para pets, além de possuirmos produtos específicos para tratamento de pisos, álcool e produtos químicos. Confira todas as nossas linhas disponíveis no menu “Nossos Produtos”.</p>
        </div>
      </div>
    </main>
  )
}
