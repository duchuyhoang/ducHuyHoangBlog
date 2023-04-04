import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ROUTERS } from '../../../common/constants'
import Logo from '../../../public/logo.svg'

interface ISidebar {
  show: boolean
  onClose: () => void
}

const Sidebar = ({ show, onClose }: ISidebar) => {
  const router = useRouter()
  return (
    <div
      className="hideSidebar"
      style={{
        width: show ? '100vw' : '0px',
        visibility: show ? 'visible' : 'hidden'
      }}
    >
      <h2 className="title">
        <div className="d-flex justify-space-between align-center">
          <Link href={ROUTERS.HOME} passHref>
            <Logo width={70} height={70} fill={'var(--color-text)'} />
          </Link>
          <AiOutlineClose
            className="icon"
            size={25}
            style={{
              cursor: 'pointer'
            }}
            onClick={onClose}
          />
        </div>
      </h2>
      <div className="item-container">
        <Link href={ROUTERS.HOME} passHref>
          <a
            className={`item ${
              router.pathname === ROUTERS.HOME ? 'item-active' : ''
            }`}
            onClick={onClose}
          >
            Home
          </a>
        </Link>

        <Link href={ROUTERS.ABOUT} passHref>
          <a
            className={`item ${
              router.pathname === ROUTERS.ABOUT ? 'item-active' : ''
            }`}
            onClick={onClose}
          >
            About me
          </a>
        </Link>

        <Link href={ROUTERS.SOFTWARE} passHref>
          <a
            className={`item ${
              router.pathname === ROUTERS.SOFTWARE ? 'item-active' : ''
            }`}
            onClick={onClose}
          >
            Software
          </a>
        </Link>

        <Link href={ROUTERS.TAGS} passHref>
          <a
            className={`item ${
              router.pathname === ROUTERS.TAGS ? 'item-active' : ''
            }`}
            onClick={onClose}
          >
            Tags
          </a>
        </Link>
        {/* <p className="item">Search</p> */}
      </div>
    </div>
  )
}

export default Sidebar
