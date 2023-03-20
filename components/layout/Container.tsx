import React from 'react'

interface IContainer {
  children: React.ReactNode
}

const Container = ({ children }: IContainer) => {
  return <section className="container">{children}</section>
}
export default Container
