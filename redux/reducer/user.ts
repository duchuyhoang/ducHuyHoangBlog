export interface IUser {
  name: string
  age: number
}

const initialState: IUser = {
  name: 'Huy',
  age: 10
}

const handler: HandlerStrategy<IUser, number> = {
  hello: (state: IUser, payload) => {
    console.log(state, payload)
    return state
  }
}

export const userReducer = (
  state: IUser = initialState,
  { type, payload }: DispatchAction<string>
): // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
IUser => (handler[type] ? handler[type](state, payload) : state)
