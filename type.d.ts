/* eslint-disable @typescript-eslint/consistent-type-definitions */
import handler from './pages/api/hello'
import reducers from './redux/reducer'
import { BaseModel } from './services/model/BaseModel'

declare global {
  type Maybe<T> = T | null
  type DispatchAction<T> = Action<string> & { payload: T }

  interface HandlerStrategy<T, ActionPayload> {
    [key: string]: (
      state: T,
      payload: DispatchAction<ActionPayload>['payload']
    ) => T
  }
  interface IPerson {
    name: string
  }
  interface IPerson {
    age: number
  }
  type Dictionary = {
    [key: string]: any
  }
  type DocData<T> = T & BaseModel
}
