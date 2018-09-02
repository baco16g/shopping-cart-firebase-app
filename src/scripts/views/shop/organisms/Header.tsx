import * as React from 'react'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import * as authModel from '@redux/auth/reducers'
import * as authActions from '@redux/auth/actions'

const Header = ({ user, onLogin, onLogout }: IProps) => {
  const renderUser = () => {
    return user ? (
      <div>
        <p>{user.email}</p>
        <p>{user.displayName}</p>
      </div>
    ) : null
  }

  const renderAuthButton = () => {
    return user ? (
      <div>
        <button onClick={onLogout}>logout</button>
      </div>
    ) : (
      <div>
        <button onClick={onLogin}>login</button>
      </div>
    )
  }

  return (
    <header>
      {renderUser()}
      {renderAuthButton()}
    </header>
  )
}

const mapStateToProps = (state: authModel.IRootState) => ({
  user: authModel.getCurrentUser(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(authActions, dispatch)
  }
})

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onLogin: () => () => {
      location.href = '/login/'
    },
    onLogout: ({ actions }: IConnectedProps) => () => {
      actions.logoutUser({})
    }
  })
)

interface IConnectedProps
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandelrs {
  onLogin: () => void
  onLogout: () => void
}

interface IProps extends IConnectedProps, IHandelrs {}

export default enhancer(Header)
