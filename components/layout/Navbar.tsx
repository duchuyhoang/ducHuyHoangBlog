import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { AiOutlineSearch } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'

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

  useEffect(() => {
    setNavbarHeight(navRef.current?.offsetHeight || 0)
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

    if (services?.auth)
      createUserWithEmailAndPassword(
        services?.auth,
        'huyhoang10032000@gmail.com',
        '10032000'
      )
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          console.log(userCredential)
          // ...
        })
        .catch(error => {
          console.log(error, error.code)
          console.log(error.message)

          const errorCode = error.code
          const errorMessage = error.message
          // ..
        })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="nav nav-dark w-100"
        style={{
          boxSizing: 'border-box'
        }}
      >
        <div className="row d-none d-sm-block d-md-block d-lg-block d-xl-block">
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
              <span style={{ padding: 5 }}>
                <AiOutlineSearch
                  size={19}
                  onClick={() => {
                    setIsSeachInputOpen(prev => !prev)
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <section
          className="row"
          style={{
            justifyContent: 'space-between'
          }}
        >
          <div
            className="col-sm-3 d-sm-none d-md-none d-lg-none d-xl-none d-flex"
            style={{
              alignItems: 'center'
              //   justifyContent: "center",
            }}
          >
            <AiOutlineSearch
              size={25}
              onClick={() => {
                setIsSeachInputOpen(prev => !prev)
              }}
            />
          </div>
          <div className="col-6 col-xl-2 col-lg-2 col-sm-3 col-md-2 logo">
            <Link href="/" passHref>
              <Image
                src="/logo.png"
                alt="logo"
                //   layout="fill"
                width={150}
                height={100}
              />
            </Link>
          </div>
          <div className="col-xl-8 col-sm-6 col-lg-5 col-md-5 col-7 contentContainer d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
            <div className="nav-item">
              <Link href={'/about'}> About me</Link>
            </div>
            <div className="nav-item">Software</div>
            <div className="nav-item">Tags</div>
            {/* <div className="nav-item">Contact</div> */}
          </div>
          <div className="col-lg-4 col-md-5 col-sm-3 d-flex flex-row-reverse">
            <div
              className="accountContainer d-flex mt-2"
              style={{ justifyContent: 'flex-end' }}
            >
              <div className="item">
                <span
                  style={{ padding: 5 }}
                  className="d-flex d-sm-none d-md-none d-lg-none d-xl-none"
                >
                  <VscThreeBars
                    size={25}
                    onClick={() => {
                      setIsOpenSidebarOpen(true)
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="expertContainer d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
              <Link
                href="https://www.facebook.com/croong.hoang"
                //   className="expertBtn"
              >
                Talk to an expert
              </Link>
            </div>
          </div>
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
        className="searchContainer"
        style={{
          ...(isSearchInputOpen && {
            top: navRef.current?.offsetHeight || 0 + 4,
            visibility: 'visible'
          })
        }}
      >
        <AiOutlineSearch
          className="searchIcon"
          size={18}
          onClick={() => {
            setIsSeachInputOpen(prev => !prev)
          }}
        />
        <Input
          value={searchKeyWord}
          onChange={e => {
            console.log(e)
            setSearchKeyWord(e.target.value)
          }}
        />
        <GrFormClose
          className="closeIcon"
          size={18}
          onClick={() => {
            setIsSeachInputOpen(false)
            setSearchKeyWord('')
          }}
        />
      </div>
      <div
        className="hideSidebar"
        style={{
          width: isHiddenSidebarOpen ? '100vw' : '0px',
          visibility: isHiddenSidebarOpen ? 'visible' : 'hidden'
        }}
      >
        <h2 className="title">
          <div className="d-flex justify-space-between align-center">
            <Link href="/" passHref>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundImage: "url('/logo.png')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center'
                }}
              ></div>
            </Link>
            <GrFormClose
              className="icon"
              size={25}
              onClick={() => {
                setIsOpenSidebarOpen(false)
              }}
            />
          </div>
        </h2>
        <div className="item-container">
          <Link href="/about" passHref>
            <a
              className="item"
              onClick={handleCloseHiddenSideBar}
            >
              About me
            </a>
          </Link>

          <a href="" className="item">
            Software
          </a>
          <a href="" className="item">
            Tags
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
