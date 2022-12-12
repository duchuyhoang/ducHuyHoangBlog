import { combineReducers } from 'redux'
import { userReducer } from './user'
// export const
const reducers = combineReducers({
  user: userReducer
})

export default reducers
