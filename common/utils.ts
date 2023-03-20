import { NextIncomingMessage } from 'next/dist/server/request-meta'

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
