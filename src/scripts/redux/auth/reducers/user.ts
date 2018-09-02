import * as firebase from 'firebase'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '@redux/auth/actions'
import * as asyncActions from '@redux/auth/actions/async'

const initialState: IRootState = {
  data: null,
  error: '',
  loading: false
}

export default reducerWithInitialState(initialState)
  .case(asyncActions.fetchUser.started, state => ({
    ...state,
    error: initialState.error,
    loading: true
  }))
  .case(asyncActions.fetchUser.failed, state => ({
    ...state,
    error: 'The following system error has occurred',
    loading: false
  }))
  .case(asyncActions.fetchUser.done, state => ({
    ...state,
    loading: false
  }))
  .case(actions.storeUser, (state, { data }) => ({
    ...state,
    data
  }))
  .case(asyncActions.logoutUser.started, state => ({
    ...state,
    error: initialState.error,
    loading: true
  }))
  .case(asyncActions.logoutUser.failed, state => ({
    ...state,
    error: 'The following system error has occurred',
    loading: false
  }))
  .case(asyncActions.logoutUser.done, state => ({
    ...state,
    data: null
  }))

export interface IRootState {
  data: firebase.User | null
  error: string
  loading: boolean
}

/////////

export const getCurrentUser = (state: IRootState) => state.data
