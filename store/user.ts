import { Action, AnyAction } from 'redux'

export interface UserInfo {
  token: Maybe<string>
  email: Maybe<string>
  name: Maybe<string>
  avatar: Maybe<string>
}

const initialState: UserInfo = {
  token: null,
  email: null,
  name: null,
  avatar: null
}

const userReducer = (state = initialState, action: AnyAction): any => {
  return null
}
