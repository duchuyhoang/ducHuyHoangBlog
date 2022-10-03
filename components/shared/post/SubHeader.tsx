import React from 'react'

const SubHeader = ({ children, ...rest }) => {
  return (
    <h2
      style={{
        fontWeight: 400,
        fontSize: '32px',
        lineHeight: '36px'
      }}
      {...rest}
    >
      {children}
    </h2>
  )
}
export default SubHeader
