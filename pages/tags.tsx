/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/indent */
import React, { useMemo, useState } from 'react'
import type { NextPage } from 'next'
import TagFilter from '../components/shared/TagFilter'
import { Container } from 'react-bootstrap'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { IPost } from '../components/shared/FeaturePost'
import HorizontalCardPost from '../components/shared/HorizontalCardPost'
import NothingFound from '../components/shared/NothingFound'

// function imageUploaded() {
//   return new Promise((resolve, reject) => {
//     const file = ((document.querySelector('#file') as any)?.files as any)[0]

//     const reader = new FileReader()
//     console.log('next')

//     reader.onload = function () {
//       const base64String = (reader?.result as any)
//       .replace(
//         /^data:image\/png;base64,/,
//         ''
//       )

//       const imageBase64Stringsep = base64String

//       // alert(imageBase64Stringsep);
//       resolve(imageBase64Stringsep)
//     }
//     reader.readAsDataURL(file)
//   })
// }

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))
  const listPost: IPost[] = []
  const tags = new Set<string>()
  for (const file of files) {
    const fileContent = fs.readFileSync(path.join('posts', file), 'utf-8')
    const matterFileContent = matter(fileContent)
    const post: IPost = matterFileContent.data as IPost
    listPost.push(post)
    post.tags.forEach(tag => tags.add(tag))
  }
  // Sort post by date
  listPost.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return {
    props: { listPost, tags: Array.from(tags) }
  }
}

interface ITagManagementPage {
  listPost: IPost[]
  tags: string[]
}
enum TagCondition {
  AND = 'AND',
  OR = 'OR'
}

const TagManagement: NextPage<
  ITagManagementPage,
  ITagManagementPage
> = props => {
  const { tags, listPost } = props

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [condition, setCondition] = useState<TagCondition>(TagCondition.AND)
  const handleToggle = (value: any, isActive: boolean) => {
    const tagsSet = new Set(selectedTags)
    if (isActive) {
      tagsSet.add(value)
    } else {
      tagsSet.delete(value)
    }
    setSelectedTags(Array.from(tagsSet))
  }
  const isTagActive = (tag: string) => {
    return selectedTags.includes(tag)
  }
  const filteredPost = useMemo(() => {
    return listPost.filter(post => {
      if (condition === TagCondition.AND) {
        return selectedTags.every(value => post.tags.includes(value))
      } else {
        return post.tags.some(value => selectedTags.includes(value))
      }
    })
  }, [condition, listPost, selectedTags])

  const isNothingFound = useMemo(() => {
    if (selectedTags.length === 0 && condition === TagCondition.OR) return true
    if (selectedTags.length > 0 && filteredPost.length === 0) return true
  }, [filteredPost, selectedTags, condition])

  return (
    <section className="tag-page">
      <Container fluid="lg pt-3">
        <div className="d-flex justify-content-between tag-page-title align-items-center">
          <h1>Tags and Condition</h1>
          <select
            className="form-select conditional-option-filter"
            value={condition}
            onChange={v => {
              setCondition(v.target.value as TagCondition)
            }}
          >
            <option value={TagCondition.AND}>And</option>
            <option value={TagCondition.OR}>Or</option>
          </select>
        </div>
        <div className="tag-container mt-4">
          {tags.map(tag => (
            <TagFilter
              key={tag}
              label={tag}
              value={tag}
              handleToggle={handleToggle}
              isActive={isTagActive(tag)}
            />
          ))}

          {/* <TagFilter
            label="ALo2"
            value={13}
            handleToggle={handleToggle}
            isActive={true}
          /> */}
        </div>

        {isNothingFound ? (
          <div className="mt-5 mb-5 pt-5 pb-5">
            <NothingFound />
          </div>
        ) : (
          <div className="mt-4 mb-4 py-2 pr-2 post-container">
            {filteredPost.map(post => (
              <div key={post.slug} className="mb-3">
                <HorizontalCardPost {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default TagManagement
