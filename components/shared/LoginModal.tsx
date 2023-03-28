import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AiFillFacebook } from 'react-icons/ai'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
// import { BsFacebook } from 'react-icons/bs'
// import { FaFacebookSquare } from 'react-icons/fa'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { GOOGLE_CLIENT_ID } from '../../common/constants'
import { FcGoogle } from 'react-icons/fc'
import GitHubLogin from 'react-github-login'
import { LOGIN_METHOD } from '../../common/enum'
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
  const handleLoginSocialSucceed = (method: LOGIN_METHOD) => {
    return response => {
      console.log('Succeed method:', method, 'response:', response)
    }
  }
  const handleLoginSocialFailed = (method: LOGIN_METHOD) => {
    return response => {
      console.log('Failed method:', method, 'response:', response)
    }
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
            <FacebookLogin
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
            />

            <GoogleLogin
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
            </GoogleLogin>

            <GitHubLogin
              className="login-button github-btn"
              onSuccess={handleLoginSocialSucceed(LOGIN_METHOD.GITHUB)}
              onFailure={handleLoginSocialFailed(LOGIN_METHOD.GITHUB)}
            >
              <FaGithub size={30} />
              <h4>Continue with Github</h4>
            </GitHubLogin>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default LoginModal
