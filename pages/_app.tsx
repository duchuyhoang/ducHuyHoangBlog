import '../styles/index.scss'
import type { AppProps } from 'next/app'
import React, { createContext, useContext, ReactElement } from 'react'
import { getFirebase } from '../services/firebase'
import Navbar from '../components/layout/Navbar'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from '../components/layout/Footer'
import { Provider } from 'react-redux'
import store from '../redux'
const FirebaseContext = createContext(getFirebase())
// const components = {
//   p: Message
// }

export const useFirebaseContext = () => useContext(FirebaseContext)
const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={getFirebase()}>
        <Navbar />
        <div
          className="w-100 position-relative"
          style={{ minHeight: 'calc(100vh - 270px)' }}
        >
          <Component {...pageProps} />
        </div>
        <Footer />
      </FirebaseContext.Provider>
    </Provider>
  )
}
export default MyApp
