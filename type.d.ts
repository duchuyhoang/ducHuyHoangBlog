import { Action } from 'redux'

declare global {
  type Maybe<T> = T | null
  type DispatchAction<T> = Action<string> & { payload: T }
  interface HandlerStrategy<T> {
	[key: string]: (state: T, payload: any) => T
  }
}
