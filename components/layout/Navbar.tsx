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
import Modal from '../shared/Modal'
import { VscThreeBars } from 'react-icons/vsc'
import { FaGithub, FaFacebookSquare } from 'react-icons/fa'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth
} from 'firebase/auth'
import { getFirebase, services } from '../../services/firebase'
import Input from '../shared/Input'
import {
  AiFillInstagram,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineLogin
} from 'react-icons/ai'
import { Row, Col } from 'react-bootstrap'
import { BsMoon, BsSun } from 'react-icons/bs'
import Logo from '../../public/logo.svg'
import {
  AUTH_STATUS,
  COLLECTION_NAMES,
  FIREBASE_LOADING_STATUS,
  THEME
} from '../../common/enum'
import { useTheme } from '../shared/Theme'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { ROUTERS } from '../../common/constants'
import { useFirebaseContext } from '../shared/FirebaseWrapper'

import { addDoc, where, refEqual, orderBy } from 'firebase/firestore/lite'
import { Datasource } from '../../services/Datasource'
import useClickOutsideComponent from '../../common/hooks/useClickOutside'
import { IoIosCloseCircle } from 'react-icons/io'
import useIsMounted from '../../common/hooks/useIsMounted'
import { useAuth } from '../shared/Auth'
import UserInfo from '../shared/UserInfo'
import Spinner from 'react-bootstrap/Spinner'

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [isSearchInputOpen, setIsSeachInputOpen] = useState<boolean>(false)
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
  const context = useFirebaseContext()
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

  useEffect(() => {
    if (isSearchTabletActive && isFullTextSearchBox) {
      const parent = searchTabletRef.current.parentElement
      parent.style.transform = 'translate3d(-400px, 0px, 0px)'
      document.getElementById('navItemContainer')?.classList.remove('d-md-flex')
      setTimeout(() => {
        parent.style.transform = 'translate3d(0px, 0px, 0px)'
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

  const handleCloseHiddenSideBar = useCallback(() => {
    setIsOpenSidebarOpen(false)
  }, [])

  // useEffect(() => {
  //   window.addEventListener("scroll", function (e: any) {
  //     if (!firstTimeLoadNav.current) {
  //       let windowScrollY = this.scrollY;
  //       if (windowScrollY <= currentWindowOffsetY) {
  //         setIsHideScrollBar(false);
  //       } else {
  //         setIsHideScrollBar(true);
  //       }
  //       setWindowOffsetY(windowScrollY);
  //     } else firstTimeLoadNav.current = false;
  //   });
  //   return () => {
  //     window.removeEventListener("scroll", function (e: any) {
  //       let windowScrollY = this.scrollY;
  //       if (windowScrollY <= currentWindowOffsetY) {
  //         setIsHideScrollBar(false);
  //       } else {
  //         setIsHideScrollBar(true);
  //       }
  //     });
  //   };
  // }, [currentWindowOffsetY]);

  const signUp = () => {
    // console.log(context);
    const services = getFirebase()
    // console.log("hello", services);

    // if (services?.auth)
    //   createUserWithEmailAndPassword(
    //     services?.auth,
    //     'huyhoang10032000@gmail.com',
    //     '10032000'
    //   )
    //     .then(userCredential => {
    //       // Signed in
    //       const user = userCredential.user
    //       console.log(userCredential)
    //       // ...
    //     })
    //     .catch(error => {
    //       console.log(error, error.code)
    //       console.log(error.message)

    //       const errorCode = error.code
    //       const errorMessage = error.message
    //       // ..
    //     })
  }

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
            {/* <Col className="d-flex d-md-none align-items-center p-0" xs="1">
              <AiOutlineSearch
                size={25}
                style={{
                  fill: theme === THEME.DARK ? '#fff' : '#070615'
                }}
                onClick={() => {
                  setIsSeachInputOpen(prev => !prev)
                }}
              />
            </Col> */}

            <div
              className="d-flex d-md-none p-0 mb-1 align-items-center"
              style={{
                width: 'max-content',
                zIndex: 1000
              }}
            >
              <span style={{ padding: 5 }}>
                <VscThreeBars
                  size={33}
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
              col="6"
              xs="2"
              sm="1"
              md="1"
              // md="1"
              lg="1"
              className="logo text-center p-0"
              style={{
                display: isSearchMobileActive ? 'none' : 'flex',
                ...(!isMatch && isMounted
                  ? {
                      width: '57%',
                      justifyContent: 'flex-end',
                      position: 'fixed'
                    }
                  : {})
              }}
            >
              {/* <button
                onClick={async () => {
                  const repository = context.dataSource.getRepository(
                    COLLECTION_NAMES.USER
                  )
                  const newUser = await repository?.addOne({
                    name: 'HUy hoang',
                    email: 'huy@gmail.com',
                    age: 123
                  })
                  console.log(newUser)
                }}
              >
                Them user
              </button>
              <button
                onClick={async () => {
                  const repository = context.dataSource.getRepository(
                    COLLECTION_NAMES.COMMENT
                  )
                  const userRepo = context.dataSource.getRepository(
                    COLLECTION_NAMES.USER
                  )
                  console.log(Datasource.repositories)
                  console.log(userRepo?.getReference)
                  const userRef = await userRepo?.getReference(
                    'PpZBzRDK16xaz3pKo6WK'
                  )
                  const data = await repository?.addOne({
                    user: userRef,
                    postSlug: 'abc-123',
                    content: 'ABc 123'
                  })
                  console.log(data)
                }}
              >
                Them comment
              </button>
              <button
                onClick={async () => {
                  const repository = context.dataSource.getRepository(
                    COLLECTION_NAMES.COMMENT
                  )
                  const userRepo = context.dataSource.getRepository(
                    COLLECTION_NAMES.USER
                  )
                  const userRef = await userRepo?.getReference(
                    'PpZBzRDK16xaz3pKo6WK'
                  )
                  console.log('ref', userRef)
                  const datas = await repository?.getAll(
                    // where('user', '==', null)
                    orderBy('user')
                  )
                  console.log(datas)
                }}
              >
                Get all
              </button>

              <button
                onClick={async () => {
                  const repository = context.dataSource.getRepository(
                    COLLECTION_NAMES.COMMENT
                  )
                  const data = await repository?.getById('Env6NXq3NcHIAporZu5a')
                  console.log('d', data)
                }}
              >
                Get by id
              </button> */}
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
                  padding: '0px 10px',
                  marginBottom: '3px',
                  width: isMatch ? 'max-content' : 'auto',
                  display: isSearchMobileActive ? 'none' : 'flex'
                }}
                className={`searchWrapper ${
                  isSearchMobileActive || isSearchTabletActive
                    ? 'searchTabletActive'
                    : ''
                }`}
              >
                {isMatch ? (
                  <>
                    <div
                      className="searchContainer"
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
                        onClick={() => {
                          setIsSeachInputOpen(prev => !prev)
                        }}
                      />
                      <Input
                        value={searchTabletKeyword}
                        onChange={e => {
                          setSearchTabletKeyword(e.target.value)
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
                    size={33}
                    onClick={() => {
                      setIsSearchMobileActive(prev => !prev)
                    }}
                  />
                )}
              </span>
            </Col>

            {/* <Row
              className="d-flex flex-nowrap"
              style={{
                width: 'max-content'
              }}
            >
              {isMatch && (
                  <div
                    className="p-0"
                    style={{
                      width: 'max-content'
                    }}
                  >
                    <span
                      className="nav-item"
                      style={{ padding: '0px', margin: '0px 5px' }}
                    >
                      <Link
                        href="https://www.facebook.com/croong.hoang"
                        passHref
                      >
                        <a target={'_blank'}>
                          <FaFacebookSquare
                            size={25}
                            style={{
                              fill: theme === THEME.DARK ? '#fff' : '#070615'
                            }}
                          />
                        </a>
                      </Link>
                    </span>
                    <span
                      className="nav-item"
                      style={{ padding: '0px', margin: '0px 5px' }}
                    >
                      <Link href="https://github.com/duchuyhoang" passHref>
                        <a target={'_blank'}>
                          <FaGithub
                            size={25}
                            style={{
                              fill: theme === THEME.DARK ? '#fff' : '#070615'
                            }}
                          />
                        </a>
                      </Link>
                    </span>
                    <span
                      className="nav-item"
                      style={{
                        padding: '0px',
                        margin: '0px 5px',
                        marginRight: '30px'
                      }}
                    >
                      <Link
                        href="https://www.instagram.com/duchuy_h/?hl=en"
                        passHref
                      >
                        <a target={'_blank'}>
                          <AiFillInstagram
                            size={25}
                            style={{
                              fill: theme === THEME.DARK ? '#fff' : '#070615'
                            }}
                          />
                        </a>
                      </Link>
                    </span>
                  </div>
                )}
            </Row> */}

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
                  <BsSun
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={33}
                    onClick={() => {
                      setTheme(THEME.LIGHT)
                    }}
                  />
                ) : (
                  <BsMoon
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={31}
                    onClick={() => {
                      setTheme(THEME.DARK)
                    }}
                  />
                )}
              </span>

              <span
                style={{
                  padding: '0px 10px',
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
                    size={33}
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
            </div>

            <Col
              xs="10"
              style={{
                display: isSearchMobileActive ? 'flex' : 'none'
              }}
              className="pr-1 flex-grow-1"
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
                      onClick={() => {
                        setIsSeachInputOpen(prev => !prev)
                      }}
                    />
                    <Input
                      value={searchMobileKeyword}
                      onChange={e => {
                        setSearchMobileKeyword(e.target.value)
                      }}
                      placeholder="Search"
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

      <div
        className="hideSidebar"
        style={{
          width: isHiddenSidebarOpen ? '100vw' : '0px',
          visibility: isHiddenSidebarOpen ? 'visible' : 'hidden'
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
              onClick={() => {
                setIsOpenSidebarOpen(false)
              }}
            />
          </div>
        </h2>
        <div className="item-container">
          <Link href={ROUTERS.HOME} passHref>
            <a
              className={`item ${
                router.pathname === ROUTERS.HOME ? 'item-active' : ''
              }`}
              onClick={handleCloseHiddenSideBar}
            >
              Home
            </a>
          </Link>

          <Link href={ROUTERS.ABOUT} passHref>
            <a
              className={`item ${
                router.pathname === ROUTERS.ABOUT ? 'item-active' : ''
              }`}
              onClick={handleCloseHiddenSideBar}
            >
              About me
            </a>
          </Link>

          <Link href={ROUTERS.SOFTWARE} passHref>
            <a
              className={`item ${
                router.pathname === ROUTERS.SOFTWARE ? 'item-active' : ''
              }`}
              onClick={handleCloseHiddenSideBar}
            >
              Software
            </a>
          </Link>

          <Link href={ROUTERS.TAGS} passHref>
            <a
              className={`item ${
                router.pathname === ROUTERS.TAGS ? 'item-active' : ''
              }`}
              onClick={handleCloseHiddenSideBar}
            >
              Tags
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
