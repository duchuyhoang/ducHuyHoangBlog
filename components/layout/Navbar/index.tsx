/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react'
import Link from 'next/link'
import { VscThreeBars } from 'react-icons/vsc'

import Input from '../../shared/Input'
import { AiOutlineSearch, AiOutlineLogin } from 'react-icons/ai'
import { Row, Col } from 'react-bootstrap'
import Logo from '../../../public/logo.svg'
import { AUTH_STATUS, THEME } from '../../../common/enum'
import { useTheme } from '../../shared/Theme'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { ROUTERS } from '../../../common/constants'
import { useFirebaseContext } from '../../shared/FirebaseWrapper'

import useClickOutsideComponent from '../../../common/hooks/useClickOutside'
import { IoIosCloseCircle } from 'react-icons/io'
import useIsMounted from '../../../common/hooks/useIsMounted'
import { useAuth } from '../../shared/Auth'
import UserInfo from '../../shared/UserInfo'
import Spinner from 'react-bootstrap/Spinner'
import Sidebar from './Sidebar'
import { BiMoon, BiSun } from 'react-icons/bi'

const Navbar = () => {
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isHiddenSidebarOpen, setIsOpenSidebarOpen] = useState<boolean>(false)
  const [searchTabletKeyword, setSearchTabletKeyword] = useState<string>('')
  const [searchMobileKeyword, setSearchMobileKeyword] = useState<string>('')
  const [isSearchTabletActive, setIsSearchTabletActive] =
    useState<boolean>(false)
  const [isSearchMobileActive, setIsSearchMobileActive] =
    useState<boolean>(false)
  const searchTabletRef = useRef<any>(null)
  const searchMobileRef = useRef<any>(null)
  const { theme, setTheme } = useTheme()
  const isMatch = useMediaQuery('(min-width: 768px)')
  const isMounted = useIsMounted()
  const isFullTextSearchBox = useMediaQuery(
    '(min-width: 768px) and (max-width:1000px)'
  )
  const router = useRouter()
  const { setIsOpenLoginModal, user, signOut, authStatus } = useAuth()

  const handleClickOutsideSearchTablet = () => {
    setIsSearchTabletActive(false)
    setSearchTabletKeyword('')
  }
  const handleClickOutsideSearchMobile = () => {
    setIsSearchMobileActive(false)
    setSearchMobileKeyword('')
  }

  useClickOutsideComponent(searchTabletRef, handleClickOutsideSearchTablet)
  useClickOutsideComponent(searchMobileRef, handleClickOutsideSearchMobile)

  useEffect(() => {
    setIsSearchMobileActive(false)
    setIsSearchTabletActive(false)
  }, [isMatch])

  // Disable scroll if sidebar open
  useEffect(() => {
    document.documentElement.classList[isHiddenSidebarOpen ? 'add' : 'remove'](
      'disable-scroll'
    )
    document.body.classList[isHiddenSidebarOpen ? 'add' : 'remove'](
      'disable-scroll'
    )
  }, [isHiddenSidebarOpen])

  useEffect(() => {
    if (isSearchTabletActive && isFullTextSearchBox) {
      const parent = searchTabletRef.current.parentElement
      parent.style.transform = 'translate3d(-300px, 0px, 0px)'
      parent.style.marginLeft = '50px'
      document.getElementById('navItemContainer')?.classList.remove('d-md-flex')
      setTimeout(() => {
        parent.style.transform = 'translate3d(0px, 0px, 0px)'
        parent.style.marginLeft = '10px'
      }, 100)
    } else {
      document.getElementById('navItemContainer')?.classList.add('d-md-flex')
    }
  }, [isSearchTabletActive, isFullTextSearchBox])

  useLayoutEffect(() => {
    document.documentElement.setAttribute('theme', 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme.toLowerCase())
  }, [theme])

  return (
    <>
      <nav
        ref={navRef}
        className="nav nav-dark w-100 pr-0"
        style={{
          boxSizing: 'border-box'
        }}
        id="navbar"
      >
        <section
          className="row"
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Row className={`flex-nowrap ${isSearchMobileActive ? 'pr-0' : ''}`}>
            <Col
              col="6"
              xs="2"
              sm="2"
              md="1"
              // md="1"
              lg="1"
              className="logo text-center p-0"
              //   style={{
              //     display: isSearchMobileActive ? 'none' : 'flex',
              //     ...(!isMatch && isMounted
              //       ? {
              //           width: '57%',
              //           justifyContent: 'flex-end',
              //           position: 'fixed'
              //         }
              //       : {})
              //   }}
            >
              <Link href={ROUTERS.HOME} passHref>
                <Logo width={70} height={70} fill={'var(--color-text)'} />
              </Link>
            </Col>

            <Col
              sm="5"
              md="9"
              // lg="1"
              xs={3}
              className="contentContainer justify-content-md-between justify-content-end pr-0 pl-0 flex-grow-1"
              style={{
                display: isSearchMobileActive ? 'none' : 'flex'
              }}
            >
              <section className="d-none d-md-flex mb-1" id="navItemContainer">
                <div className="d-flex">
                  <div
                    className={`nav-item ${
                      router.pathname === ROUTERS.HOME ? 'nav-active' : ''
                    }`}
                  >
                    <Link href={ROUTERS.HOME}> Home</Link>
                  </div>
                  <div
                    className={`nav-item ${
                      router.pathname === ROUTERS.ABOUT ? 'nav-active' : ''
                    }`}
                  >
                    <Link href={ROUTERS.ABOUT}> About me</Link>
                  </div>
                  <div
                    className={`nav-item ${
                      router.pathname === ROUTERS.SOFTWARE ? 'nav-active' : ''
                    }`}
                  >
                    <Link href={ROUTERS.SOFTWARE}> Software</Link>
                  </div>
                  <div
                    className={`nav-item ${
                      router.pathname === ROUTERS.TAGS ? 'nav-active' : ''
                    }`}
                  >
                    <Link href={ROUTERS.TAGS}> Tags</Link>
                  </div>
                </div>
              </section>

              <span
                style={{
                  padding: '0px',
                  marginBottom: '3px',
                  width: isMatch ? 'max-content' : 'auto',
                  display: isSearchMobileActive ? 'none' : 'flex'
                }}
                className={`searchWrapper ${
                  isSearchMobileActive || (isSearchTabletActive && isMatch)
                    ? 'searchTabletActive'
                    : ''
                }`}
              >
                {router.pathname !== ROUTERS.SEARCH ? (
                  isMatch ? (
                    <>
                      <div
                        className="searchContainer ml-1"
                        onClick={() => {
                          setIsSearchTabletActive(true)
                        }}
                        ref={searchTabletRef}
                      >
                        <AiOutlineSearch
                          style={{
                            cursor: 'pointer'
                            // fill: theme === THEME.DARK ? '#fff' : '#070615'
                          }}
                          size={23}
                        />
                        <Input
                          value={searchTabletKeyword}
                          onChange={e => {
                            setSearchTabletKeyword(e.target.value)
                          }}
                          onKeyDown={e => {
                            const keyword = searchTabletKeyword.trim()
                            if (keyword && e.key === 'Enter') {
                              router.push(
                                `/${ROUTERS.SEARCH}?keyword=${keyword}`
                              )
                            }
                          }}
                          placeholder={'Search'}
                        />
                      </div>
                    </>
                  ) : (
                    <AiOutlineSearch
                      style={{
                        cursor: 'pointer',
                        fill: theme === THEME.DARK ? '#fff' : '#070615'
                      }}
                      size={24}
                      onClick={() => {
                        setIsSearchMobileActive(prev => !prev)
                      }}
                    />
                  )
                ) : null}
              </span>
            </Col>

            <div
              className="p-0 justify-content-end justify-content-md-start"
              style={{
                width: 'max-content',
                display: isSearchMobileActive ? 'none' : 'flex'
              }}
            >
              <span
                style={{
                  margin: '0px 10px',
                  width: '30px',
                  marginBottom: '3px',
                  padding: '0px'
                }}
                className="d-none d-md-flex align-items-center justify-content-center"
              >
                {theme === THEME.DARK ? (
                  <BiSun
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={24}
                    onClick={() => {
                      setTheme(THEME.LIGHT)
                    }}
                  />
                ) : (
                  <BiMoon
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={24}
                    onClick={() => {
                      setTheme(THEME.DARK)
                    }}
                  />
                )}
              </span>

              <span
                style={{
                  paddingLeft: isMatch && isMounted ? '0px' : '10px',
                  marginBottom: '3px',
                  width: 'max-content'
                }}
                className="d-flex align-items-center justify-content-center pr-0"
              >
                {authStatus === AUTH_STATUS.IDLE ||
                authStatus === AUTH_STATUS.ERROR ? (
                  <AiOutlineLogin
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={24}
                    onClick={() => {
                      setIsOpenLoginModal(true)
                    }}
                  />
                ) : (
                  <>
                    {' '}
                    {authStatus === AUTH_STATUS.LOADING && user === null ? (
                      <Spinner animation="border" />
                    ) : (
                      <UserInfo
                        user={user!}
                        signOut={() => {
                          signOut()
                        }}
                      />
                    )}
                  </>
                )}
              </span>

              <span
                style={{
                  padding: '0px 10px',
                  marginBottom: '3px',
                  width: 'max-content',
                  cursor: 'pointer'
                }}
                className="d-flex d-md-none align-items-center justify-content-center pr-0"
              >
                <VscThreeBars
                  size={24}
                  style={{
                    fill: theme === THEME.DARK ? '#fff' : '#070615'
                  }}
                  onClick={() => {
                    setIsOpenSidebarOpen(true)
                  }}
                />
              </span>
            </div>

            <Col
              xs="10"
              style={{
                display: isSearchMobileActive ? 'flex' : 'none'
              }}
              className="flex-grow-1"
            >
              <span
                style={{
                  paddingLeft: '0px 10px',
                  marginBottom: '3px',
                  width: isMatch ? 'max-content' : 'auto',
                  display: 'flex',
                  alignItems: 'center'
                }}
                className={'searchWrapper searchTabletActive'}
              >
                <>
                  <div
                    className="searchContainer"
                    onClick={() => {
                      setIsSearchTabletActive(true)
                      // if(do)
                    }}
                    ref={searchMobileRef}
                    style={{}}
                  >
                    <AiOutlineSearch
                      style={{
                        cursor: 'pointer'
                        // fill: theme === THEME.DARK ? '#fff' : '#070615'
                      }}
                      size={23}
                    />
                    <Input
                      value={searchMobileKeyword}
                      onChange={e => {
                        setSearchMobileKeyword(e.target.value)
                      }}
                      placeholder="Search"
                      onKeyDown={e => {
                        const keyword = searchMobileKeyword.trim()
                        if (keyword && e.key === 'Enter') {
                          router.push(`/${ROUTERS.SEARCH}?keyword=${keyword}`)
                        }
                      }}
                    />
                  </div>
                </>
                <IoIosCloseCircle
                  style={{
                    cursor: 'pointer'
                  }}
                  className="ml-3"
                  size={30}
                  onClick={handleClickOutsideSearchMobile}
                />
              </span>
            </Col>
          </Row>
        </section>
      </nav>

      <Sidebar
        show={isHiddenSidebarOpen}
        onClose={() => {
          setIsOpenSidebarOpen(false)
        }}
      />
    </>
  )
}

export default Navbar
