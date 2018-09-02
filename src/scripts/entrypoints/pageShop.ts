import ReduxThunk from 'redux-thunk'

import extendsReducer from '@entrypoints/utils/extendsReducer'
import configureStore from '@entrypoints/utils/configureStore'
import adaptStoreToView from '@entrypoints/utils/adaptStoreToView'
import renderViews from '@entrypoints/utils/renderView'

import authReducer from '@redux/auth/reducers'
import shopReducer from '@redux/shop/reducers'
import shopView from '@views/shop'

const reducer = extendsReducer([authReducer, shopReducer])
const store = configureStore(reducer, undefined, [ReduxThunk])
const view = adaptStoreToView(store, shopView)

renderViews('data-react-shop-app', view)
