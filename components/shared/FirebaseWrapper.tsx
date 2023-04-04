import React, { useContext, useEffect, useState } from 'react'
import { FIREBASE_CONFIGS } from '../../common/constants'
import { COLLECTION_NAMES, FIREBASE_LOADING_STATUS } from '../../common/enum'
import { Datasource } from '../../services/Datasource'
import { Comment } from '../../services/model/Comment'
import { User } from '../../services/model/User'

interface IFirebaseContext {
  dataSource: Datasource
  status: FIREBASE_LOADING_STATUS
}

const FirebaseContext = React.createContext<IFirebaseContext>({} as any)

interface IFirebaseWrapper {
  children?: React.ReactNode
}

const FirebaseWrapper = ({ children }: IFirebaseWrapper) => {
  const [dataSource] = useState<Datasource>(new Datasource(FIREBASE_CONFIGS))
  const [status, setStatus] = useState<FIREBASE_LOADING_STATUS>(
    FIREBASE_LOADING_STATUS.LOADING
  )

  useEffect(() => {
    dataSource.addRepository<Comment>(COLLECTION_NAMES.COMMENT)
    dataSource.addRepository<User>(COLLECTION_NAMES.USER)
    setStatus(FIREBASE_LOADING_STATUS.SUCCEED)
  }, [])
  return (
    <FirebaseContext.Provider
      value={{
        dataSource,
        status
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebaseContext = () => useContext(FirebaseContext)

export default FirebaseWrapper
