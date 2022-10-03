import { combineReducers } from 'redux'
import { userReducer } from './user'
// export const
const reducers = combineReducers({
  user: userReducer
})
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const a = (v) => {}

export default reducers
