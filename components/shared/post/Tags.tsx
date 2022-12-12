import React from 'react'
import Tag from './Tag'
import { BsTags } from 'react-icons/bs'

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div
      className="tag-wrapper mb-3 mt-5"
      style={{
        justifyContent: 'flex-start',
        borderBottom: '1px solid #d1d0d3'
      }}
    >
      <BsTags size={26} />
      <h3 className="mr-2 ml-2">Tags:</h3>
      {tags.map((tag, index) => (
        <Tag value={tag} key={`tag_${index}`} />
      ))}
    </div>
  )
}

export default Tags
