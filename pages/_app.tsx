import "../styles/index.scss";
import type { AppProps } from "next/app";
import { createContext, useContext } from "react";
import { getFirebase } from "../services/firebase";
import Navbar from "../components/layout/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/layout/Footer";
import { MDXProvider } from "@mdx-js/react";

import Message from "../Message";
const FirebaseContext = createContext(getFirebase());

const components = {
  p: Message,
};

export const useFirebaseContext = () => useContext(FirebaseContext);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseContext.Provider value={getFirebase()}>
      <Navbar />
      <div
        className="w-100 d-flex"
        style={{ minHeight: "calc(100vh - 270px)" }}
      >
        {/* <MDXProvider components={components}> */}
        <Component {...pageProps} />
        {/* </MDXProvider> */}
      </div>
      <Footer />
    </FirebaseContext.Provider>
  );
}
export default MyApp;
