/* eslint-disable @typescript-eslint/consistent-type-definitions */
import moment from 'moment'
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

export const getDateStringText = (date: moment.MomentInput): string => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const momentObj = moment(date)
  if (momentObj.isValid()) {
    const date = momentObj.toDate()
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  } else {
    return 'Unknown'
  }
}

interface DescribableFunction {
  (): void
  cancel: () => void
}

export const debounce = (
  cb: () => void,
  timeout: number
): DescribableFunction => {
  let timer

  const describeFunc = (): void => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb()
    }, timeout)
  }
  describeFunc.cancel = () => {
    clearTimeout(timer)
  }
  return describeFunc
}

export const throttle = (
  cb: () => void,
  timeout: number,
  count: number
): any => {
  let executedCount = 0
  setTimeout(() => {
    executedCount = 0
  }, timeout)
  return () => {
    if (executedCount + 1 <= count) {
      executedCount++
      cb()
    }
  }
}

export const wrapperAsync = async <T>(
  asyncFunc: Promise<any>
): Promise<any> => {
  try {
    const rs = await asyncFunc
    return [rs, null]
  } catch (e) {
    return [null, e]
  }
}
