import { combineReducers } from 'redux'
import loginFormReducer, * as loginFormModel from '@redux/auth/reducers/loginForm'
import userReducer, * as userModel from '@redux/auth/reducers/user'

export default {
  auth: combineReducers({
    loginForm: loginFormReducer,
    user: userReducer
  })
}

export interface IRootState {
  auth: {
    loginForm: loginFormModel.IRootState
    user: userModel.IRootState
  }
}

export const getCurrentUser = (state: IRootState) =>
  userModel.getCurrentUser(state.auth.user)
