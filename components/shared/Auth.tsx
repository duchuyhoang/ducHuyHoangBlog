/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useContext, useEffect, useState } from 'react'
import { UseFormUnregister } from 'react-hook-form'
import { LOCAL_STORAGE_KEYS, PROVIDERS } from '../../common/constants'
import {
  AUTH_STATUS,
  COLLECTION_NAMES,
  FIREBASE_LOADING_STATUS,
  LOGIN_METHOD
} from '../../common/enum'
import { User } from '../../services/model/User'
import { useFirebaseContext } from './FirebaseWrapper'
import {
  getAuth,
  signInWithCredential,
  UserCredential,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { where, limit } from 'firebase/firestore/lite'
import LoginModal from './LoginModal'

interface IAuthContextValue {
  user: Maybe<DocData<User>>
  setUser: React.Dispatch<React.SetStateAction<Maybe<DocData<User>>>>
  signOut: () => void
  signIn: (payload: { accessToken: string; method: LOGIN_METHOD }) => void
  authStatus: AUTH_STATUS
  setIsOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setAuthStatus: React.Dispatch<React.SetStateAction<AUTH_STATUS>>
}

const AuthContext = React.createContext<IAuthContextValue>(
  {} as IAuthContextValue
)

interface IAuthContext {
  children?: React.ReactNode
}

const Auth = ({ children }: IAuthContext) => {
  const [user, setUser] = useState<Maybe<DocData<User>>>(null)
  const [authStatus, setAuthStatus] = useState<AUTH_STATUS>(AUTH_STATUS.IDLE)
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
  const { dataSource, status } = useFirebaseContext()

  const clearCredential = () => {
    setUser(null)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGIN_METHOD)
  }

  const signOut = () => {
    const auth = getAuth()

    setAuthStatus(AUTH_STATUS.LOADING)
    firebaseSignOut(auth)
      .then(() => {
        console.log('succeed logout')
        setAuthStatus(AUTH_STATUS.IDLE)
        clearCredential()
      })
      .catch(error => {
        console.log('sign out error', error)
        setAuthStatus(AUTH_STATUS.ERROR)
        clearCredential()
      })
  }

  const signIn = ({
    accessToken,
    method
  }: {
    accessToken: string
    method: LOGIN_METHOD
  }) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGIN_METHOD, method)
    handleAuth()
  }

  const getUserInfoFromFirebaseRs = (
    result: UserCredential,
    method: LOGIN_METHOD
  ) => {
    const payload: User = {
      uid: result.user.providerData[0].uid,
      email: result.user.email ?? '',
      method,
      avatar: result.user.photoURL,
      name: result.user.displayName
    }
    if (method === LOGIN_METHOD.GITHUB || method === LOGIN_METHOD.FACEBOOK) {
      payload.email = result.user.providerData[0]?.email ?? ''
    }
    if (method === LOGIN_METHOD.GITHUB) {
      payload.name = (result.user as any).reloadUserInfo?.screenName
    }
    if (method === LOGIN_METHOD.FACEBOOK) {
      payload.avatar =
        payload.avatar +
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `?access_token=${localStorage.getItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN
        )}}`
    }
    return payload
  }

  const handleAuth = async () => {
    if (status === FIREBASE_LOADING_STATUS.SUCCEED) {
      const userRepository = dataSource.getRepository<User>(
        COLLECTION_NAMES.USER
      )
      const method = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGIN_METHOD)
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      const SelectedProvider = method ? PROVIDERS[method] : null

      if (SelectedProvider && accessToken) {
        setAuthStatus(AUTH_STATUS.LOADING)

        const credential = SelectedProvider.credential(accessToken)
        const auth = getAuth()
        setAuthStatus(AUTH_STATUS.LOADING)

        signInWithCredential(auth, credential)
          .then(async result => {
            let queries: any = []
            console.log('result', result)
            try {
              const payload = getUserInfoFromFirebaseRs(
                result,
                method as LOGIN_METHOD
              )
              queries = [
                where('uid', '==', payload.uid),
                where('method', '==', method),
                limit(1)
              ]
              const users = await userRepository?.getAll(...queries)
              const selectedUser = users![0]

              if (!selectedUser) {
                const newUser = await userRepository?.addOne(payload)
                if (newUser) {
                  setUser({
                    ...payload,
                    docId: newUser.id
                  })
                } else {
                  console.log('Failed add user')
                }
              } else {
                await userRepository?.updateOne(selectedUser.docId, payload)
                setUser({
                  ...payload,
                  docId: selectedUser.docId
                })
              }
              setAuthStatus(AUTH_STATUS.SUCCEED)
              console.log('users', users)
            } catch (e) {
              setAuthStatus(AUTH_STATUS.ERROR)
              console.log(e)
            }

            // console.log('rs', result.user.e)
          })
          .catch(error => {
            console.log(error)
            clearCredential()
            setAuthStatus(AUTH_STATUS.ERROR)
          })
      }
    }
  }

  useEffect(() => {
    handleAuth()
  }, [dataSource, status])
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut,
        signIn,
        authStatus,
        setIsOpenLoginModal,
        setAuthStatus
      }}
    >
      <LoginModal
        show={isOpenLoginModal}
        handleClose={() => {
          setIsOpenLoginModal(false)
        }}
      />
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
export const useAuth = () => useContext(AuthContext)
