import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { AiFillFacebook } from 'react-icons/ai'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
// import { BsFacebook } from 'react-icons/bs'
// import { FaFacebookSquare } from 'react-icons/fa'
import GoogleLogin from 'react-google-login'
const LoginModal = () => {
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
              clientId="1096120152389-dvjb0353hpoc5g13ml6dovgqkart6okb.apps.googleusercontent.com"
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
