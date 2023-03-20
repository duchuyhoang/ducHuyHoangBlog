import '../styles/index.scss'
import type { AppProps } from 'next/app'
import React, {
  createContext,
  useContext,
  ReactElement,
  useState,
  useEffect
} from 'react'
import { getFirebase } from '../services/firebase'
import Navbar from '../components/layout/Navbar'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from '../components/layout/Footer'
import { Provider } from 'react-redux'
import store from '../redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AiOutlineArrowUp } from 'react-icons/ai'
import Theme from '../components/shared/Theme'
const FirebaseContext = createContext(getFirebase())

// const components = {
//   p: Message
// }

export const useFirebaseContext = () => useContext(FirebaseContext)
const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const [isShowScrollTop, setIsShowScrollTop] = useState(false)
  const handleScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        console.log(entries)
        setIsShowScrollTop(!entries[0].isIntersecting)
      },
      {
        // root: document.getElementById('scroll-anchor'),
        rootMargin: '-300px 0px 0px 0px',
        threshold: 1
      }
    )
    observer.observe(document.getElementById('scroll-anchor')!)
  }, [])
  return (
    <Provider store={store}>
      <Theme>
        <FirebaseContext.Provider value={getFirebase()}>
          <Navbar />
          <div id="scroll-anchor"></div>
          <div
            className="w-100 position-relative"
            style={{ minHeight: 'calc(100vh - 270px)' }}
          >
            <Component {...pageProps} />
          </div>
          {isShowScrollTop && (
            <div
              className="d-flex p-3 scroll-to-top-container"
              onClick={handleScrollToTop}
            >
              <AiOutlineArrowUp color="#fff" size={20} />
            </div>
          )}

          <Footer />
        </FirebaseContext.Provider>
      </Theme>
    </Provider>
  )
}
export default MyApp
