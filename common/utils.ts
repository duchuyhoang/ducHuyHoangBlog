import { NextIncomingMessage } from 'next/dist/server/request-meta'
import { PAGE_PREFIX } from './constants'

export const buildHostUrl = (req: NextIncomingMessage | undefined): string => {
  if (!req) return ''
  const proto = req.headers?.['x-forwarded-proto'] ? 'https://' : 'http://'
  return `${proto}${req.headers.host!}`
}

export const makeid = (length: number): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const getImageSrc = (src: string): string => {
  if (src.startsWith('https://') || src.startsWith('http://')) {
    return src
  } else {
    return `${PAGE_PREFIX}/${
      src.startsWith('/') ? src.slice(0, src.length) : src
    }`
  }
}

export const getPostSrc = (slug: string): string => {
  const POST_PREFIX = '/post'
  return `${POST_PREFIX}/${
    slug.startsWith('/') ? slug.slice(0, slug.length) : slug
  }`
}
