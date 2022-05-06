import type { GetStaticProps, NextPage, NextPageContext } from "next";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { getFirebase, test } from "../services/firebase";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  endAt,
} from "firebase/firestore/lite";

import { createContext, useContext } from "react";
import { buildHostUrl } from "../common/utils";
const os = require("os");

// import { MDXProvider } from "@mdx-js/react";

// export async function getStaticPaths() {}

// export async function getServerSideProps(context: NextPageContext) {
//   //   const session = await getSession(context);

//   // context.res.
//   let props: {
//     comments: any[];
//     auth: Maybe<Auth>;
//     // signIn: (email: string, password: string) => void;
//     // signUp: (email: string, password: string) => void;
//   } = {
//     comments: [],
//     auth: null,
//     // signIn: (email: string, password: string) => {},
//     // signUp: (email: string, password: string) => {},
//   };
//   try {
//     const firebase = getFirebase();
//     if (firebase) {
//       // firebase.auth
//       const q = query(firebase.database.comment);
//       const data = await (await getDocs(q)).docs;
//       //   const data1 = await addDoc(firebase.database.comment, {
//       //     id: "ddddd",
//       //     vallue: "hy",
//       //   });
//       props.comments = data.map((d) => d.data());
//       //   console.log(props)
//       //   props.signIn=(email:string,password:string)=>{

//       //   }
//     } else {
//       console.log("wrong");
//     }

//     // console.log("lll", props);
//   } catch (e) {
//     console.log(e);
//   }
//   return {
//     props,
//   };
// }

const FirebaseContext = createContext(getFirebase());

export const useFirebaseContext = () => useContext(FirebaseContext);

export const getServerSideProps: GetStaticProps = async (context: any) => {
  const data = await fetch(
    `${buildHostUrl((context as NextPageContext).req)}/api/hello`
  );
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return <>helllo</>;
};

export default Home;
