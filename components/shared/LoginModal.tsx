/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AiFillFacebook } from 'react-icons/ai'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import {
  GITHUB_ACCESS_TOKEN_API,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  LOCAL_STORAGE_KEYS,
  PROVIDERS
} from '../../common/constants'
import { FcGoogle } from 'react-icons/fc'
import { LOGIN_METHOD } from '../../common/enum'
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  signInWithCredential
} from 'firebase/auth'

const LoginModal = () => {
  useEffect(() => {
    const initGapi = async () => {
      await import('gapi-script').then(pack => {
        const { gapi } = pack
        gapi.load('client:auth2', () => {
          gapi.client.init({ clientId: GOOGLE_CLIENT_ID, scope: 'email' })
        })
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initGapi()
  }, [])

  const handleLoginSocial = (method: LOGIN_METHOD) => {
    const Provider = PROVIDERS[method]
    return async () => {
      const auth = getAuth()
      try {
        const provider = new Provider()
        // provider.addScope('repo')
        const result = await signInWithPopup(auth, provider)
        const credential = Provider.credentialFromResult(result)
        const accessToken = credential?.accessToken
        console.log(accessToken)
        if (accessToken) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
          localStorage.setItem(LOCAL_STORAGE_KEYS.LOGIN_METHOD, method)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const click = () => {
    const provider = new GoogleAuthProvider()
    // provider.addScope('repo,user')
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result)
        const cre2 = FacebookAuthProvider.credential(
          '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'
        )
        console.log(cre2)
        const dd = signInWithCredential(auth, cre2)
          .then(result => {
            console.log('re', result)
            // Signed in
            // ...
          })
          .catch(error => {
            console.log('e', error)
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // ...
          })
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error)

        // ...
      })
  }
  return (
    <Modal
      show
      // onHide={handleClose}
      //   backdrop="static"
      keyboard={false}
    >
      <Modal.Dialog>
        {/* <Modal.Header closeButton>
          <Modal.Title>Duc Huy Hoang</Modal.Title>
        </Modal.Header> */}

        <Modal.Body className="login-modal">
          <h1 className="title">Duc Huy Hoang</h1>
          <div className="social-wrapper">
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
            {/* <FacebookLogin
              appId="1088597931155576"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleLoginSocialSucceed(LOGIN_METHOD.FACEBOOK)}
              cssClass="login-button facebook-btn"
              textButton={'Continue with Facebook'}
              icon={
                <FaFacebook
                  size={30}
                  style={{
                    fill: '#fff'
                  }}
                />
              }
            /> */}

            {/* <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              icon={false}
              className="login-button google-btn"
              buttonText=""
              onSuccess={handleLoginSocialSucceed(LOGIN_METHOD.GOOGLE)}
              onFailure={handleLoginSocialFailed(LOGIN_METHOD.GOOGLE)}
              cookiePolicy={'single_host_origin'}
            >
              <>
                <FcGoogle size={30} />
                <h4>Continue with Google</h4>
              </>
            </GoogleLogin> */}
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
            {/* 9a39a5cbce41667b80c8019c55a80bbdd1005a7d */}
            {/* <GitHubLogin
              className="login-button github-btn"
              clientId={GITHUB_CLIENT_ID}
              redirectUri={'http://localhost:3000'}
              onSuccess={handleLoginSocialSucceed(LOGIN_METHOD.GITHUB)}
              onFailure={handleLoginSocialFailed(LOGIN_METHOD.GITHUB)}
            >
              <FaGithub size={30} />
              <h4>Continue with Github</h4>
            </GitHubLogin> */}
            {/* <button onClick={click}>Nhan</button> */}
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default LoginModal
