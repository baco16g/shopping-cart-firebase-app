import * as React from 'react'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import { IRootState } from '@redux/auth/reducers'
import * as authActions from '@redux/auth/actions'
import Input from '@views/login/atoms/Input'

interface IProps extends IPropsConnected, IHandelrs {}

const LoginForm = ({
  email,
  password,
  error,
  loading,
  onChangeEmail,
  onChangePassword,
  onLoginUser
}: IProps) => {
  const renderButton = () =>
    loading ? null : <button onClick={onLoginUser}>Login</button>
  return (
    <div>
      <div>
        <Input
          type="text"
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={onChangeEmail}
          value={email}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
        />
      </div>
      <p>{error}</p>
      <div>{renderButton()}</div>
    </div>
  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.auth.loginForm
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(authActions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onChangeEmail: ({ actions }: IPropsConnected) => (
      e: React.FormEvent<HTMLInputElement>
    ): void => {
      actions.changeValue({ prop: 'email', value: e.currentTarget.value })
    },
    onChangePassword: ({ actions }: IPropsConnected) => (
      e: React.FormEvent<HTMLInputElement>
    ): void => {
      actions.changeValue({ prop: 'password', value: e.currentTarget.value })
    },
    onLoginUser: ({
      actions,
      email,
      password
    }: IPropsConnected) => (): void => {
      actions.loginUser({ email, password })
    }
  })
)

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandelrs {
  onChangeEmail: React.ChangeEventHandler
  onChangePassword: React.ChangeEventHandler
  onLoginUser: () => void
}

export default enhancer(LoginForm)
