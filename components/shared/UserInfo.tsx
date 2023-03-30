/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { BsFacebook, BsGoogle } from 'react-icons/bs'
import { FaFacebookSquare, FaGithub } from 'react-icons/fa'
import { AUTH_STATUS, LOGIN_METHOD } from '../../common/enum'
import { User } from '../../services/model/User'
import { useAuth } from './Auth'
import Avatar from './Avatar'

const IconMap = {
  [LOGIN_METHOD.FACEBOOK]: BsFacebook,
  [LOGIN_METHOD.GOOGLE]: BsGoogle,
  [LOGIN_METHOD.GITHUB]: FaGithub
}

const Icon = ({ method }) => {
  const SelectedIcon = IconMap[method]
  return SelectedIcon ? (
    <SelectedIcon className="social-icon" size={16} />
  ) : null
}

interface IUserInfo {
  user: User
  signOut: () => void
}

const UserInfo = ({ user, signOut }: IUserInfo) => {
  const ref = useRef(null)
  const { authStatus } = useAuth()
  return (
    <>
      <OverlayTrigger
        trigger="click"
        container={ref}
        placement={'bottom-end'}
        rootClose
        overlay={
          <Popover id="user-info-popover">
            <Popover.Header as="h2">
              <Icon method={user.method} />
              <p className="mt-4 name">{user.name}</p>
              <Avatar src={user.avatar ?? undefined} width={50} height={50} />
            </Popover.Header>
            <Popover.Body>
              <p className="email">{user.email}</p>
            </Popover.Body>
            <div
              className={`sign-out ${
                authStatus === AUTH_STATUS.LOADING
                  ? 'justify-content-center'
                  : ''
              }`}
            >
              {authStatus === AUTH_STATUS.LOADING ? (
                <Spinner animation="border"></Spinner>
              ) : (
                <div className="d-flex align-center" onClick={signOut}>
                  <AiOutlinePoweroff size={20} />
                  <p className="ml-2">Sign out</p>
                </div>
              )}
            </div>
          </Popover>
        }
      >
        <div ref={ref}>
          <Avatar
            src={user.avatar ?? undefined}
            width={24}
            height={24}
            style={{
              cursor: 'pointer'
            }}
          />
        </div>
      </OverlayTrigger>
    </>
  )
}
export default UserInfo
