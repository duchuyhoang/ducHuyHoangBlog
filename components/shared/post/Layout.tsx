import React from 'react'

const Layout = ({ children }) => {
  return (
    <section className="d-flex justify-center align-center">
      <div className="col-8 col-sm-12">{children}</div>
    </section>
  )
}

export default Layout
