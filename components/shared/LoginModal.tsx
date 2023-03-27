import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AiFillFacebook } from 'react-icons/ai'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
// import { BsFacebook } from 'react-icons/bs'
// import { FaFacebookSquare } from 'react-icons/fa'
import GoogleLogin from 'react-google-login'
// import { gapi } from 'gapi-script'
import { GOOGLE_CLIENT_ID } from '../../common/constants'
const LoginModal = () => {
  useEffect(() => {
    const initGapi = async () => {
      await import('gapi-script').then(pack => {
        const { gapi } = pack
        gapi.load('client:auth2', () => {
          gapi.auth2.init({ clientId: GOOGLE_CLIENT_ID })
        })
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initGapi()
  }, [])
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
            <FaFacebook
              size={30}
              style={{
                fill: 'blue'
              }}
            />
            <FaGithub size={30} />
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google "
              onSuccess={response => {
                console.log('succeed', response)
              }}
              onFailure={response => {
                console.log('failed', response)
              }}
              cookiePolicy={'single_host_origin'}
            />
            <FaGoogle size={30} />
            {/* <button className="login-button">
              <div
                className="icon"
                style={{
                  background: 'rgba(0,0,0,0.3)'
                }}
              >
                <AiFillFacebook
                  size={20}
                  style={{
                    fill: 'blue'
                  }}
                />
              </div>
            </button> */}
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default LoginModal
