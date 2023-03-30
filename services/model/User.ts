import { LOGIN_METHOD } from '../../common/enum'
export interface User {
  uid: string
  method: LOGIN_METHOD
  name: Maybe<string>
  email: string
  avatar: Maybe<string>
}
