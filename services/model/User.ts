import { LOGIN_METHOD } from '../../common/enum'
export interface User {
  method: LOGIN_METHOD
  name: Maybe<string>
  email: string
  avatar: Maybe<string>
}
