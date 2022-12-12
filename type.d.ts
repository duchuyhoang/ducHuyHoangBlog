import handler from './pages/api/hello'
import reducers from './redux/reducer'

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
}