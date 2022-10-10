import React from 'react'

interface IComment {
  slug: string
}

const Comment = ({ slug,...rest }: IComment) => {
  return <div id="comment" {...rest}>Comment zone to do</div>
}

export default Comment
