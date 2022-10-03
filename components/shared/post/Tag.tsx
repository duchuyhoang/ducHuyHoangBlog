import React from 'react'

export interface ITag{
	value:string
}

const Tag = ({ value }) => {
  {
    return (
      <a className="post-tag" href={`/tag?tag=${value}`}>
        {value}
      </a>
    )
  }
}

export default Tag
