
export interface IUser {
  name: string
  age: number
}

const initialState: IUser = {
  name: 'Huy',
  age: 10
}

const handler: HandlerStrategy<IUser> = {
  hello: (state: IUser, payload: any) => {
    console.log(state, payload)
    return state
  }
}

export const userReducer = (
  state: IUser = initialState,
  { type, payload }: DispatchAction<string>
) => (handler[type] ? handler[type](state, payload) : state)
