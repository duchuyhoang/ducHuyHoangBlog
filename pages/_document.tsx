import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <meta property="custom" content="addaad" />
        <base href="/ducHuyHoangBlog/"></base>
        <link
          rel="icon"
          type="image/x-icon"
          href="/ducHuyHoangBlog/logo.png"
        ></link>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document
