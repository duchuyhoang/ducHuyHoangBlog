import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../shared/Modal'
import { VscThreeBars } from 'react-icons/vsc'
import { FaGithub, FaFacebookSquare } from 'react-icons/fa'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth
} from 'firebase/auth'
import { getFirebase } from '../../services/firebase'
import { useFirebaseContext } from '../../pages'
import Input from '../shared/Input'
import {
  AiFillInstagram,
  AiOutlineSearch,
  AiOutlineClose
} from 'react-icons/ai'
import { Row, Col } from 'react-bootstrap'
import { FiSun, FiMoon } from 'react-icons/fi'
import { BsMoon, BsSun } from 'react-icons/bs'
import Logo from '../../public/logo.svg'
import { THEME } from '../../common/enum'
import { useTheme } from '../shared/Theme'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { ROUTERS } from '../../common/constants'

const Navbar = () => {
  const [currentWindowOffsetY, setWindowOffsetY] = useState(0)
  // const [isHideScrollBar, setIsHideScrollBar] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false)
  const [isSearchInputOpen, setIsSeachInputOpen] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isHiddenSidebarOpen, setIsOpenSidebarOpen] = useState<boolean>(false)
  const [searchKeyWord, setSearchKeyWord] = useState<string>()
  const context = useFirebaseContext()
  const [navbarHeight, setNavbarHeight] = useState<number>(0)
  const { theme, setTheme } = useTheme()
  const isMatch = useMediaQuery('(min-width: 790px)')
  const router = useRouter()

  useLayoutEffect(() => {
    document.documentElement.setAttribute('theme', 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme.toLowerCase())
  }, [theme])

  useEffect(() => {
    setNavbarHeight(navRef.current?.offsetHeight ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navRef.current])
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
        className="nav nav-dark w-100"
        style={{
          boxSizing: 'border-box'
        }}
        id="navbar"
      >
        {/* <div className="row d-none d-sm-block d-md-block d-lg-block d-xl-block">
          <div
            className="accountContainer col-12 d-flex"
            style={{ justifyContent: 'flex-end' }}
          >
            <div className="item">
              <p
                onClick={() => {
                  setIsLoginModalOpen(true)
                }}
              >
                Login
              </p>
              <span className="divide"> / </span>
              <p
                onClick={() => {
                  setIsSignUpModalOpen(true)
                }}
              >
                Sign up
              </p>
            </div>
          </div>
        </div> */}
        <section
          className="row"
          style={{
            justifyContent: 'space-between'
          }}
        >
          <Row className="flex-nowrap">
            <Col className="d-flex d-md-none align-items-center p-0" xs="1">
              <AiOutlineSearch
                size={25}
                style={{
                  fill: theme === THEME.DARK ? '#fff' : '#070615'
                }}
                onClick={() => {
                  setIsSeachInputOpen(prev => !prev)
                }}
              />
            </Col>

            <Col col="6" xs="10" md="2" lg="1" className="logo text-center">
              <Link href="/" passHref>
                {/* <Image
                  src="/logo.svg"
                  alt="logo"
                  //   layout="fill"
                  width={80}
                  height={120}
                /> */}
                <Logo width={70} height={60} fill={'var(--color-text)'} />
              </Link>
            </Col>

            <Col
              col="6"
              sm="9"
              md="10"
              lg="11"
              className="contentContainer d-none d-md-flex justify-content-end"
            >
              <Row className="d-flex">
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
              </Row>

              <Row
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

                <span
                  style={{
                    padding: '0px 5px',
                    width: '30px',
                    marginBottom: '3px'
                  }}
                >
                  {theme === THEME.DARK ? (
                    <BsSun
                      style={{
                        cursor: 'pointer',
                        fill: theme === THEME.DARK ? '#fff' : '#070615'
                      }}
                      size={21}
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
                      size={19}
                      onClick={() => {
                        setTheme(THEME.DARK)
                      }}
                    />
                  )}
                </span>
                <span
                  style={{
                    padding: '0px 5px',
                    marginBottom: '3px',
                    width: 'max-content'
                  }}
                >
                  <AiOutlineSearch
                    style={{
                      cursor: 'pointer',
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    size={23}
                    onClick={() => {
                      setIsSeachInputOpen(prev => !prev)
                    }}
                  />
                </span>
              </Row>
            </Col>

            <Col className="d-flex d-md-none p-0 align-items-center justify-content-end">
              <div
                className="accountContainer d-flex mt-2"
                style={{ justifyContent: 'flex-end' }}
              >
                <div className="item">
                  <span style={{ padding: 5 }} className="d-flex">
                    <VscThreeBars
                      size={25}
                      style={{
                        fill: theme === THEME.DARK ? '#fff' : '#070615'
                      }}
                      onClick={() => {
                        setIsOpenSidebarOpen(true)
                      }}
                    />
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {/* <div className="col-lg-4 col-md-5 col-sm-3 d-flex flex-row-reverse">
            <div
              className="accountContainer d-flex mt-2"
              style={{ justifyContent: 'flex-end' }}
            >
              <div className="item">
                <span
                  style={{ padding: 5 }}
                  className="d-flex d-sm-none d-xl-none"
                >
                  <VscThreeBars
                    size={25}
                    style={{
                      fill: theme === THEME.DARK ? '#fff' : '#070615'
                    }}
                    onClick={() => {
                      setIsOpenSidebarOpen(true)
                    }}
                  />
                </span>
              </div>
            </div>
          </div> */}
        </section>

        <Modal
          title={'Log in'}
          isOpen={isLoginModalOpen}
          handleClose={() => {
            setIsLoginModalOpen(false)
          }}
        >
          <>Hello</>
        </Modal>

        <Modal
          title={'Sign up'}
          isOpen={isSignUpModalOpen}
          handleClose={() => {
            setIsSignUpModalOpen(false)
          }}
        >
          <>
            <Input
              value={'ddd'}
              onChange={e => {
                console.log(e)
              }}
            />
            <button onClick={signUp}>Sign up</button>
          </>
        </Modal>
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
