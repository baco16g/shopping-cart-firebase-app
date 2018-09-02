import actionCreatorFactory from 'typescript-fsa'
import * as firebase from 'firebase'

const actionCreator = actionCreatorFactory()

interface ILoginResult {
  user: firebase.auth.UserCredential | null
}

export const loginUser = actionCreator.async<ILoginParams, ILoginResult>(
  'LOGIN_USER'
)

export const logoutUser = actionCreator.async<{}, null>('LOGOUT_USER')

export const fetchUser = actionCreator.async<{}, null>('FETCH_USER')
