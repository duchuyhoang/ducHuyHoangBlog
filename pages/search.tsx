/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-escape */
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { IPost } from '../components/shared/FeaturePost'
import { NextPage } from 'next'
import lunr from 'lunr'
import { useTheme } from '../components/shared/Theme'
import { THEME } from '../common/enum'
import Input from '../components/shared/Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { debounce } from '../common/utils'
import HorizontalCardPost from '../components/shared/HorizontalCardPost'

interface IRawPost extends IPost {
  content: string
}

interface IResultPost extends IPost {
  score: number
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const listPost: IRawPost[] = []
  for (const file of files) {
    const fileContent = fs.readFileSync(path.join('posts', file), 'utf-8')
    const matterFileContent = matter(fileContent)
    const post: IPost = matterFileContent.data as IPost
    listPost.push({
      ...post,
      content: matterFileContent.content
        .replace('+', '')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/(\[.*?\]|\(.*?\)|\```.*?\```|\<.*?\>) */g, '')
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ')
        .replace(/  +/g, ' ')
        .trim()
    })
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
  listPost: IRawPost[]
}
enum SearchCondition {
  MOST_SIMILAR = 'MOST_SIMILAR',
  CREATE_DATE = 'CREATE_DATE'
}

const ResultPage: NextPage<ISearchResultPage, ISearchResultPage> = props => {
  const { listPost } = props
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState<string>('')
  const [condition, setCondition] = useState<SearchCondition>(
    SearchCondition.MOST_SIMILAR
  )
  const [listFilteredPost, setListFilteredPost] = useState<IResultPost[]>([])
  const router = useRouter()

  useEffect(() => {
    const { keyword } = router.query
    if (keyword) {
      setSearchValue(keyword.toString())
    }
  }, [router])

  const index = useMemo(() => {
    return lunr(function (this) {
      this.field('tags', { boost: 4 })
      this.field('title', { boost: 3 })
      this.field('description', { boost: 2 })

      this.field('content')
      this.field('author', {
        extractor: (doc: any) => {
          return doc?.author?.name
        }
      })
      this.ref('slug')
      listPost.forEach(post => {
        this.add(post)
      })
    })
  }, [listPost])

  const listMapPost = useMemo(() => {
    return listPost.reduce((prev, post) => ({ ...prev, [post.slug]: post }), {})
  }, [listPost])

  const sortComparator = useMemo(() => {
    const comparatorList = {
      [SearchCondition.CREATE_DATE]: (a: IResultPost, b: IResultPost) => {
        if (!b.date && a.date) {
          return -1
        } else if (!a.date && b.date) return 1

        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return b.score - a.score
      },
      [SearchCondition.MOST_SIMILAR]: (a: IResultPost, b: IResultPost) => {
        return b.score - a.score
      }
      // new Date(b.date).getTime() > new Date(a.date).getTime()
    }
    return comparatorList[condition]
  }, [condition])

  useEffect(() => {
    const debouceCall = debounce(() => {
      const data = index.search(searchValue)
      setListFilteredPost(
        data.map(({ ref, score }) => ({ ...listMapPost[ref], score }))
      )
    }, 600)
    debouceCall()
    return () => {
      debouceCall.cancel()
    }
  }, [index, listMapPost, searchValue])

  useEffect(() => {
    const { query } = router.query
    if (query) {
      setSearchValue(query.toString())
    }
  }, [router])

  return (
    <section className="search-page pt-2">
      <Container fluid="lg">
        <div className="d-flex w-100 flex-column">
          <div className="search-page-title w-100 d-flex">
            <Col xs="12" className="mb-3">
              <h1>
                {searchValue.trim() ? (
                  <>
                    {listFilteredPost.length} Results for <i>"{searchValue}"</i>
                  </>
                ) : (
                  'Search post'
                )}
              </h1>
            </Col>
            <Col xs="12" md="6" className="mb-3 mb-md-0">
              <div className="search-wrapper">
                <AiOutlineSearch
                  style={{
                    cursor: 'pointer'
                  }}
                  size={28}
                />
                <Input
                  value={searchValue}
                  onChange={e => {
                    setSearchValue(e.target.value)
                  }}
                  placeholder="Search..."
                />
              </div>
            </Col>
            <Col
              xs="12"
              md="6"
              className="conditional-option d-flex justify-content-start justify-content-md-end align-items-center"
            >
              <p className="conditional-option-label mr-2">Sort by :</p>
              <select
                className="form-select conditional-option-filter"
                value={condition}
                onChange={v => {
                  setCondition(v.target.value as SearchCondition)
                }}
                style={{
                  borderColor: theme === THEME.DARK ? 'transparent' : '#ced4da'
                }}
              >
                <option value={SearchCondition.CREATE_DATE}>Create date</option>
                <option value={SearchCondition.MOST_SIMILAR}>
                  Most similar
                </option>
              </select>
            </Col>
          </div>
          <div className="search-page-content mt-3">
            {listFilteredPost.sort(sortComparator).map(post => (
              <div key={post.slug} className="mb-3">
                <HorizontalCardPost {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ResultPage
