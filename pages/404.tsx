import React from 'react'
import Image from 'next/image'
import { AiFillHome } from 'react-icons/ai'
import Link from 'next/link'
import useDocumentTitle from '../common/hooks/useDocumentTitle'

const NotFound = () => {
  useDocumentTitle({
    title: 'Not found'
  })
  return (
    <div className="wrapper position-absolute">
      <Image src="/404.png" width={300} height={300} />
      <h2>Lạc trôi à ^^ .Quay lại nào</h2>
      <Link href="/" passHref>
        <a className="btn mb-3 ml-1 mr-1 d-flex">
          <AiFillHome className="mr-2" />
          Home
        </a>
      </Link>
    </div>
  )
}
export default NotFound
