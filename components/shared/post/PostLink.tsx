import Link from 'next/link'

const PostLink = props => {
  const { href, children } = props
  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  )
}

export default PostLink
