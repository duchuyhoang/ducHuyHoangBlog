import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { IPost } from '../components/shared/FeaturePost'
import { NextPage } from 'next'
import lunr from 'lunr'

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const listPost: IPost[] = []
  for (const file of files) {
    const fileContent = fs.readFileSync(path.join('posts', file), 'utf-8')
    const matterFileContent = matter(fileContent)
    const post: IPost = matterFileContent.data as IPost
    listPost.push(post)
  }
  // Sort post by date
  listPost.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return {
    props: { listPost }
  }
}

interface ISearchResultPage {
  listPost: IPost[]
}

const ResultPage: NextPage<ISearchResultPage, ISearchResultPage> = props => {
  const { listPost } = props
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const index = useMemo(() => {
    return lunr(function (this) {
      this.field('title', { boost: 2 })
      this.field('description')
      this.ref('slug')
      listPost.forEach(post => {
        this.add(post)
      })
    })
  }, [listPost])
  const listMapPost = useMemo(() => {
    return listPost.reduce((prev, post) => ({ ...prev, [post.slug]: post }), {})
  }, [listPost])
  console.log('ppp', listMapPost)
  useEffect(() => {
    const data = index.search('tổng hợp')
    console.log(data.map(data => listMapPost[data.ref]))
  }, [index, listMapPost])
  console.log(listPost)
  console.log(router.query)
  useEffect(() => {
    const { query } = router.query
    if (query) {
      setSearchValue(query.toString())
    }
  }, [router])
  return (
    <section className="search-page">
      <Container fluid="lg pt-3"></Container>
    </section>
  )
}

export default ResultPage
