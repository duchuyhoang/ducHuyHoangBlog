/** @type {import('next').NextConfig} */
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['about.gitlab.com'],
    loader: 'akamai',
    path: ''
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react'
  },
  images: {
    domains: ['about.gitlab.com']
  }
})
const withTM = require('next-transpile-modules')([
  'gsap',
  'hover-effect',
  'react-syntax-highlighter'
])
module.exports = withTM(
  withMDX({
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      domains: ['about.gitlab.com'],
      loader: 'akamai',
      path: ''
    },
    eslint: {
      ignoreDuringBuilds: true
    },
    webpack: config => {
      config.plugins.push(
        new ESLintPlugin({
          // Plugin options
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          failOnError: true,
          context: path.resolve(process.cwd()),
          cache: true,
          // cacheLocation: path.resolve(
          //   paths.appNodeModules,
          //   '.cache/.eslintcache'
          // ),
          // ESLint class options
          cwd: process.cwd(),
          resolvePluginsRelativeTo: __dirname,
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app/base')]
            // rules: {
            //   ...(!hasJsxRuntime && {
            //     'react/react-in-jsx-scope': 'error'
            //   })
            // }
          }
        })
      )
      return config
    },
    basePath: '/ducHuyHoangBlog',
    assetPrefix: '/ducHuyHoangBlog'
  })
)
