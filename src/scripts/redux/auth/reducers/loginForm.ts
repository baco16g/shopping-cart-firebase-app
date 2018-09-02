import * as firebase from 'firebase'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '@redux/auth/actions'
import * as asyncActions from '@redux/auth/actions/async'

const initialState: IRootState = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
}

export default reducerWithInitialState(initialState)
  .case(actions.changeValue, (state, { prop, value }) => ({
    ...state,
    [prop]: value
  }))
  .case(actions.changeError, (state, { error }) => ({
    ...state,
    error
  }))
  .case(asyncActions.loginUser.started, state => ({
    ...state,
    error: initialState.error,
    loading: true
  }))
  .case(asyncActions.loginUser.failed, state => ({
    ...state,
    error: 'The following system error has occurred',
    loading: false
  }))
  .case(asyncActions.loginUser.done, (state, { result }) => {
    return Object.assign(
      {
        ...state,
        ...result,
        loading: false
      },
      result.user
        ? {
            email: initialState.email,
            password: initialState.password
          }
        : {}
    )
  })

export interface IRootState {
  email: string
  password: string
  user: firebase.auth.UserCredential | null
  error: string
  loading: boolean
}
