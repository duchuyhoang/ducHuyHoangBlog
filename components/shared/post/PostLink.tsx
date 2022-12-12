import React from 'react'
import Link from 'next/link'
export interface IPostLInk {
  href: string
  children: React.ReactNode
}
const PostLink = (props: IPostLInk) => {
  const { href, children } = props
  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  )
}

export default PostLink
