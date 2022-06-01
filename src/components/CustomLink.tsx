import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"


interface CustomLinkProps extends LinkProps {
  children: ReactElement
}

export function CustomLink ({ children, ...rest }: CustomLinkProps) {
  const { asPath } = useRouter()
  const isActive = 
    asPath === rest.href || asPath.split(/\/+\d/g)[0] === rest.href ? 
      'after:bg-green-600 text-green-600' : 'text-zinc-900'

  const className = children.props.className + ' ' + isActive
  
  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}
