import "../styles/index.scss";
import type { AppProps } from "next/app";
import { createContext, useContext } from "react";
import { getFirebase } from "../services/firebase";
import Navbar from "../components/layout/Navbar";

const FirebaseContext = createContext(getFirebase());

export const useFirebaseContext = () => useContext(FirebaseContext);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseContext.Provider value={getFirebase()}>
      <Navbar />
      <div className="col-sm-5" style={{ height: 3000 }}>
        ddd
        <Component {...pageProps} />
      </div>
    </FirebaseContext.Provider>
  );
}
export default MyApp;
