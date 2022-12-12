import React from 'react'

export interface ITag {
  value: string
}

const Tag = ({ value, ...rest }: ITag) => {
  return (
    <a className="post-tag" href={`/tag?tag=${value}`} {...rest}>
      {value}
    </a>
  )
}

export default Tag
