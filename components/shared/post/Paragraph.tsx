import React from 'react'

interface IParagraph {
  children: React.ReactNode
}

const Paragraph = ({ children, ...rest }: IParagraph) => {
  return <p className="paragraph">{children}</p>
}

export default Paragraph
