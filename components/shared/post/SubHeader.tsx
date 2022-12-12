import React from 'react'
export interface ISubHeader {
  children: React.ReactNode
}
const SubHeader = ({ children, ...rest }: ISubHeader) => {
  return (
    <h2 className="subHeader" {...rest}>
      {children}
    </h2>
  )
}
export default SubHeader
