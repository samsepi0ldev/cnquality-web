import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ShopListProvider } from '../hooks/ShopList'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  if (asPath.split(/\//)[1] === 'admin') {
    return <Component {...pageProps} />
  }
  return (
    <ShopListProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ShopListProvider>
  )
}

export default MyApp
