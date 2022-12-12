import React, { createContext, useContext, useMemo } from 'react'

import type { GetStaticProps, NextPage, NextPageContext } from 'next'
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { getFirebase } from '../services/firebase'
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  startAt,
  endAt
} from 'firebase/firestore/lite'
import Slider from 'react-slick'
import { buildHostUrl } from '../common/utils'
import FeaturePost, { IPost } from '../components/shared/FeaturePost'
import VerticalCardPost from '../components/shared/VerticalCardPost'
import LeftSideBar from '../components/layout/LeftSideBar'
import HorizontalCardPost from '../components/shared/HorizontalCardPost'
import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import matter from 'gray-matter'
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

const FirebaseContext = createContext(getFirebase())

export const useFirebaseContext = () => useContext(FirebaseContext)

// export const getServerSideProps: GetStaticProps = async (context: any) => {
//   const data = await fetch(
//     `${buildHostUrl((context as NextPageContext).req)}/api/hello`
//   );
//   return {
//     props: {},
//   };
// };

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const listPost: IPost[] = []
  for (const file of files) {
    const fileContent = fs.readFileSync(path.join('posts', file), 'utf-8')
    const matterFileContent = matter(fileContent)
    listPost.push(matterFileContent.data as IPost)
  }
  return {
    props: { listPost }
  }
}

const Home: NextPage = (props: any) => {
  const { listPost } = props
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false
    }),
    []
  )
  return (
    <>
      <div className="row">
        <section
          className="col-3 d-xl-block d-lg-block d-md-block d-sm-none d-none"
          style={{ background: '#f2f1f5' }}
          //   , width: "310px"
        >
          <LeftSideBar
            tags={[
              'All',
              'News',
              'Release',
              'Algorithm',
              'DevOps',
              'Security',
              'Design'
            ]}
          />
        </section>
        <section className="col-xl-9 col-lg-9 col-md-9 col-12">
          <FeaturePost />
          <div className="recent-post">
            <h3 className="recent-post-title ml-4">Recent post</h3>
            <Slider {...settings}>
              <div className="col-4">
                <VerticalCardPost
                  title={
                    'Learn Python with Pj! Part 4 - Dictionaries and Files adakdad akdakldad aklda;ldkad;ladk dâdjaj'
                  }
                  description={
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque vitae, neque ullam sapiente dolor repudiandae accusamus optio consequatur repellat, voluptate praesentium, consequuntur quibusdam nostrum explicabo architecto? Impedit, cum illo. adadadnaldkad dajdakldjada kajdajkld dnada'
                  }
                  author={{
                    name: 'Huy hoang',
                    avatar: 'he'
                  }}
                  date={new Date()}
                  slug={'hello'}
                  image={
                    'https://about.gitlab.com/images/blogimages/nobl9_1.jpeg'
                  }
                  tags={['News', 'Release', 'Algorithm']}
                />
              </div>

              <div className="col-4">
                <VerticalCardPost
                  title={
                    'Learn Python with Pj! Part 4 - Dictionaries and Files adakdad akdakldad aklda;ldkad;ladk dâdjaj'
                  }
                  description={
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque vitae, neque ullam sapiente dolor repudiandae accusamus optio consequatur repellat, voluptate praesentium, consequuntur quibusdam nostrum explicabo architecto? Impedit, cum illo. adadadnaldkad dajdakldjada kajdajkld dnada'
                  }
                  author={{
                    name: 'Huy hoang',
                    avatar: 'he'
                  }}
                  date={new Date()}
                  slug={'hello'}
                  image={
                    'https://about.gitlab.com/images/blogimages/nobl9_1.jpeg'
                  }
                  tags={[]}
                />
              </div>

              <div className="col-4">
                <VerticalCardPost
                  title={'Hello world'}
                  description={'dakdadlkadmalkdjalkjaclkajaad'}
                  author={{
                    name: 'Huy hoang 123',
                    avatar: 'he'
                  }}
                  date={new Date()}
                  slug={'hello1'}
                  tags={[]}
                  image={'https://about.gitlab.com/images/blogimages/locks.jpg'}
                />
              </div>
              <div className="col-4">
                <VerticalCardPost
                  title={'Hello world'}
                  description={'dakdadlkadmalkdjalkjaclkajaad'}
                  author={{
                    name: 'Huy hoang 123',
                    avatar: 'he'
                  }}
                  tags={[]}
                  date={new Date()}
                  slug={'hello2'}
                  image={
                    'https://about.gitlab.com/images/blogimages/eosecurity.jpg'
                  }
                />
              </div>
            </Slider>
          </div>

          <div className="older-post">
            <h3 className="older-post-title ml-4 mt-4">Older post</h3>
            <div className="older-post-container">
              {listPost.map((post: IPost, index: number) => (
                <HorizontalCardPost {...post} key={`horizontal_${index}`} />
              ))}

              {/* <HorizontalCardPost
                title={"Learn Python with Pj! Part 4 - Dictionaries and Files"}
                description={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque vitae, neque ullam sapiente dolor repudiandae accusamus optio consequatur repellat, voluptate praesentium, consequuntur quibusdam nostrum explicabo architecto? Impedit, cum illo. adadadnaldkad dajdakldjada kajdajkld dnada"
                }
                author={{
                  name: "Huy hoang",
                  avatar: "he",
                }}
                date={new Date()}
                slug={"hello"}
                image={
                  "https://about.gitlab.com/images/blogimages/nobl9_1.jpeg"
                }
                tags={["News", "Release", "Algorithm"]}
              />
              <HorizontalCardPost
                title={"Learn Python with Pj! Part 4 - Dictionaries and Files"}
                description={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat itaque vitae, neque ullam sapiente dolor repudiandae accusamus optio consequatur repellat, voluptate praesentium, consequuntur quibusdam nostrum explicabo architecto? Impedit, cum illo. adadadnaldkad dajdakldjada kajdajkld dnada"
                }
                author={{
                  name: "Huy hoang",
                  avatar: "he",
                }}
                date={new Date()}
                slug={"hello"}
                image={
                  "https://about.gitlab.com/images/blogimages/nobl9_1.jpeg"
                }
                tags={["News", "Release"]}
              /> */}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
