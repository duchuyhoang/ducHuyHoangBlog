import React from 'react'

const SubHeader = ({ children, ...rest }) => {
  return (
    <h2 className="subHeader" {...rest}>
      {children}
    </h2>
  )
}
export default SubHeader
