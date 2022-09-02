import { useRouter } from 'next/router'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ShopListProvider } from '../hooks/ShopList'
import { queryClient } from '../services/query-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  if (asPath.split(/\//)[1] === 'admin') {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    )
  }
  return (
    true ?
    <div className='w-full h-screen flex items-center justify-center'>
      <h1 className='font-semibold text-2xl text-zinc-900'>Site em manutenção, volte em breve.</h1>
    </div>
    :
    <QueryClientProvider client={queryClient}>
      <ShopListProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ShopListProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
