import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement, useCallback, useEffect, useState } from 'react'
import { FaDoorOpen, FaMoon, FaSun } from 'react-icons/fa'

interface CustomLinkDashboardProps extends LinkProps {
  children: ReactElement
}

function CustomLinkDashboard ({ children, ...rest}: CustomLinkDashboardProps) {
  const { asPath } = useRouter()
  console.log(asPath, rest.href)
  const isActive = asPath === rest.href ? 'dark:text-zinc-100 text-zinc-800 after:bg-brand-500 font-bold' : 'dark:text-zinc-400 text-zinc-600'
  const className = `${children.props.className} ${isActive}`
  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}

export function HeaderDashboard () {
  const [isActiveDarkMode, setIsActiveDarkMode] = useState(false)

  const darkModeHandle = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setIsActiveDarkMode(value => !value)
    localStorage.setItem('theme', document.documentElement.className)
  }, [])

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)'))) {
      document.documentElement.classList.add('dark')
      setIsActiveDarkMode(true)
    }
  }, [])

  return (
    <header className='flex items-center justify-between px-4 h-16 bg-white dark:bg-zinc-900'>
      <h1 className='font-bold text-2xl text-zinc-800 dark:text-zinc-100 leading-8'>
        CNQuality<span className='text-brand-500 text-4xl leading-8'>.</span>
      </h1>
      <div className='w-fit h-full flex items-center leading-[4rem]'>
        <CustomLinkDashboard href='/admin/dashboard'>
          <a className='relative px-2 after:content-[""] after:w-full after:h-[2px] after:absolute after:bottom-0 after:left-0 after:block hover:text-zinc-900 dark:hover:text-zinc-100'>
            Inicio
          </a>
        </CustomLinkDashboard>
        <CustomLinkDashboard href='/admin/create'>
          <a className='relative px-2 after:content-[""] after:w-full after:h-[2px] after:absolute after:bottom-0 after:left-0 after:block hover:text-zinc-900 dark:hover:text-zinc-100'>
            Cadastrar
          </a>
        </CustomLinkDashboard>
      </div>
      <div className='flex items-center gap-4 text-zinc-800 dark:text-zinc-100'>
        <button onClick={darkModeHandle} className='w-12 h-12 rounded hover:bg-zinc-200 flex items-center justify-center dark:hover:bg-zinc-800'>
          {isActiveDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button className='w-12 h-12 rounded hover:bg-zinc-200 flex items-center justify-center dark:hover:bg-zinc-800'>
          <FaDoorOpen />
        </button>
        <span>john.doe</span>
      </div>
    </header>
  )
}
