import ReduxThunk from 'redux-thunk'

import extendsReducer from '@entrypoints/utils/extendsReducer'
import configureStore from '@entrypoints/utils/configureStore'
import adaptStoreToView from '@entrypoints/utils/adaptStoreToView'
import renderViews from '@entrypoints/utils/renderView'

import authReducer from '@redux/auth/reducers'
import loginView from '@views/login'

const reducer = extendsReducer([authReducer])
const store = configureStore(reducer, undefined, [ReduxThunk])
const view = adaptStoreToView(store, loginView)

renderViews('data-react-login-app', view)
