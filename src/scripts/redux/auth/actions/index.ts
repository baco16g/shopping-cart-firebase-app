import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { Dispatch } from 'redux'
import * as firebase from 'firebase'
import * as asyncActions from './async'
import * as firebaseUtils from '@utils/firebase'

const actionCreator = actionCreatorFactory()

export const changeValue = actionCreator<{ prop: string; value: string }>(
  'CHANGE_VALUE'
)

export const changeError = actionCreator<{ error: string }>('CHANGE_ERROR')

export const loginUser = bindThunkAction(
  asyncActions.loginUser,
  async (params, dispatch) => {
    const user = await firebaseUtils.signIn(params).catch((error: Error) => {
      dispatch(changeError({ error: error.toString() }))
      return null
    })
    if (user) {
      location.href = ' /'
    }
    return { user }
  }
)

export const logoutUser = bindThunkAction(asyncActions.logoutUser, async () => {
  await firebaseUtils.signOut()
  return null
})

export const storeUser = actionCreator<{ data: firebase.User }>('STORE_USER')

export const fetchUser = bindThunkAction(
  asyncActions.fetchUser,
  async (_, dispatch: Dispatch) => {
    const success = (user: firebase.User) => {
      dispatch(storeUser({ data: user }))
    }
    const faild = () => ({})
    firebaseUtils.fetchUser(success, faild)
    return null
  }
)
