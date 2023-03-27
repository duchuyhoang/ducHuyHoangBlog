/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/indent */
import React, { createContext, ReactNode, useContext } from 'react'

import type { GetStaticProps, NextPage, NextPageContext } from 'next'
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth'
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
import Slider, { Settings } from 'react-slick'
import { buildHostUrl } from '../common/utils'
import FeaturePostList, { IPost } from '../components/shared/FeaturePost'
import VerticalCardPost from '../components/shared/VerticalCardPost'
import LeftSideBar from '../components/layout/LeftSideBar'
import HorizontalCardPost from '../components/shared/HorizontalCardPost'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import useMediaQuery from '../hooks/useMediaQuery'
import { Col, Container, Row } from 'react-bootstrap'
import useDocumentTitle from '../common/hooks/useDocumentTitle'

const FEATURE_POST_COUNT = 3
const RECENT_POST_COUNT = 7

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
  let listFeaturePost: IPost[] = []
  const listRecentPost: IPost[] = []
  for (const file of files) {
    const fileContent = fs.readFileSync(path.join('posts', file), 'utf-8')
    const matterFileContent = matter(fileContent)
    listPost.push(matterFileContent.data as IPost)
  }
  // Sort post by date
  listPost.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  listFeaturePost = listPost
    .filter(post => post.isFeature)
    .slice(0, FEATURE_POST_COUNT)

  const featurePostId = listFeaturePost.map(post => post.slug)

  for (let i = 0; i < listPost.length; i++) {
    const selectedPost = listPost[i]
    if (!featurePostId.includes(selectedPost.slug)) {
      listRecentPost.push(selectedPost)
    }
    if (listRecentPost.length === RECENT_POST_COUNT) {
      break
    }
  }
  return {
    props: { listPost, listFeaturePost, listRecentPost }
  }
}

interface IHome {
  listPost: IPost[]
  listFeaturePost: IPost[]
  listRecentPost: IPost[]
  children?: ReactNode
}

const Home: NextPage<IHome, IHome> = props => {
  const { listPost, listFeaturePost, listRecentPost } = props
  const isSmall = useMediaQuery('(max-width: 650px)')
  const isMedium = useMediaQuery('(min-width: 650px) and (max-width: 1050px)')
  const isLarge = useMediaQuery('(min-width: 1050px) and (max-width: 1400px)')
  const isSuperLarge = useMediaQuery('(min-width: 1400px)')
  const totalRecent = listRecentPost.length
  // console.log('total', listPost)
  // console.log('list feature', listFeaturePost)
  // console.log('list recent', listRecentPost)

  useDocumentTitle({
    title: 'Home'
  })

  // useEffect(() => {
  //   document.querySelector('.slick-track')?.classList.add('init')
  // }, [])

  const settings: Settings = {
    dots: true,
    infinite: totalRecent > 2,
    speed: 500,
    // rtl: true,
    // rtl: listRecentPost.length < 3 ? false : false,
    centerMode: !(totalRecent > 2)
      ? false
      : isSmall
      ? false
      : isMedium
      ? false
      : true,
    rtl: false,
    // centerMode: true,
    slidesToShow: isSmall
      ? 1
      : isMedium
      ? Math.min(totalRecent, 2)
      : isSuperLarge
      ? Math.min(totalRecent, 4)
      : Math.min(totalRecent, 3),
    // slidesToShow: isSmall ? 1 : isMedium ? 2 : isSuperLarge ? 4 : 3,
    slidesToScroll: 1,

    // rows: 2,
    // slidesPerRow: isSmall
    //   ? 1
    //   : isMedium
    //   ? 2
    //   : isLarge
    //   ? 3
    //   : isSuperLarge
    //   ? 4
    //   : 3,
    arrows: false
  }
  return (
    <>
      <section className="intro">
        <h1>I'm Huy</h1>
      </section>
      <Container fluid="lg pt-3">
        <Row style={{ margin: '0px' }} className="p-0">
          {/* <section
          className="col-3 d-md-block d-sm-none d-none"
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
        </section> */}
          {/* <Row> */}
          <FeaturePostList posts={listFeaturePost} />
          <div
            className="recent-post"
            style={{
              padding: isSmall ? '0px' : '10px 0px'
            }}
          >
            <h3 className="recent-post-title mt-4 pb-4">Recent post</h3>
            <Slider {...settings}>
              {listRecentPost.map(post => (
                <Col xs={3} key={post.slug}>
                  <VerticalCardPost
                    title={post.title}
                    description={post.description}
                    author={post.author}
                    date={post.date ? new Date(post.date) : null}
                    slug={post.slug}
                    tags={post.tags}
                    isFeature={false}
                    image={post.image}
                  />
                </Col>
              ))}
            </Slider>
          </div>

          <div className="older-post pt-3 pb-4">
            <h3 className="older-post-title mt-4 mb-4">Older post</h3>
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
          {/* </Row> */}
        </Row>
      </Container>
    </>
  )
}

export default Home
