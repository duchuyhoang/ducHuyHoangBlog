/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { LOCAL_STORAGE_KEYS, PROVIDERS } from '../../common/constants'
import { FcGoogle } from 'react-icons/fc'
import { AUTH_STATUS, LOGIN_METHOD, THEME } from '../../common/enum'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { IoMdClose } from 'react-icons/io'
import { useTheme } from '../shared/Theme'
import { useAuth } from './Auth'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Spinner } from 'react-bootstrap'
import Loading from './Loading'

interface ILoginModal {
  handleClose: () => void
  show: boolean
}

const LoginModal = (props: ILoginModal) => {
  const { show, handleClose } = props
  const { theme } = useTheme()
  const { authStatus, signIn, signOut, setAuthStatus, setIsOpenLoginModal } =
    useAuth()
  const isCentered = useMediaQuery('(max-width: 576px)')

  const handleLoginSocial = (method: LOGIN_METHOD) => {
    const Provider = PROVIDERS[method]
    return async () => {
      const auth = getAuth()
      try {
        const provider = new Provider()
        if (method === LOGIN_METHOD.FACEBOOK) {
          provider.addScope('public_profile,email')
          console.log('scope fb edited ada')
        }
        setAuthStatus(AUTH_STATUS.LOADING)
        const result = await signInWithPopup(auth, provider)
        console.log('rss', result)
        const credential = Provider.credentialFromResult(result)
        const accessToken = credential?.idToken || credential?.accessToken
        if (accessToken) {
          signIn({
            accessToken,
            method
          })
          setIsOpenLoginModal(false)
        }
      } catch (e) {
        console.log('login social failed', e)
        signOut()
        setAuthStatus(AUTH_STATUS.ERROR)
      }
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="login-modal"
      backdrop="static"
      keyboard={false}
      centered={isCentered}
    >
      <Modal.Body>
        <IoMdClose
          style={{
            cursor: 'pointer',
            fill: theme === THEME.DARK ? '#fff' : '#070615'
          }}
          className="close"
          size={28}
          onClick={handleClose}
        />
        <div
          style={{
            background: 'url(/ducHuyHoangBlog/loginImg.png)'
          }}
          className="image mt-5"
        ></div>
        <h1 className="title mb-5">Duc Huy Hoang's Blog</h1>
        <div className="social-wrapper">
          {authStatus === AUTH_STATUS.LOADING ? (
            <div
              className="w-100 d-flex align-center justify-content-center"
              style={{
                height: '200px'
              }}
            >
              <Loading
                iconProps={{
                  width: '150px',
                  height: '150px'
                }}
              />
            </div>
          ) : (
            <>
              <button
                className="login-button facebook-btn"
                onClick={handleLoginSocial(LOGIN_METHOD.FACEBOOK)}
              >
                <FaFacebook
                  size={30}
                  style={{
                    fill: '#fff'
                  }}
                />
                <h4>Continue with Facebook</h4>
              </button>

              <button
                className="login-button google-btn"
                onClick={handleLoginSocial(LOGIN_METHOD.GOOGLE)}
              >
                <FcGoogle size={30} />
                <h4>Continue with Google</h4>
              </button>
              <button
                className="login-button github-btn"
                onClick={handleLoginSocial(LOGIN_METHOD.GITHUB)}
              >
                <FaGithub size={30} />
                <h4>Continue with Github</h4>
              </button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
