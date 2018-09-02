import { Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import * as asyncActions from '@redux/shop/actions/async'
import * as shopModel from '@redux/shop/reducers/'
import * as authModel from '@redux/auth/reducers'
import * as cartModel from '@redux/shop/reducers/cart'
import * as firebaseUtils from '@utils/Firebase'
import * as storage from '@utils/Storage'

const actionCreator = actionCreatorFactory()

export const fetchAllProducts = actionCreator<{ products: Products }>(
  'FETCH_ALL_PRODUCTS '
)

export const addEventForProductsFetch = bindThunkAction(
  asyncActions.addEventForProductsFetch,
  async (_, dispatch: Dispatch) => {
    await firebaseUtils.addEventForfetchProducts(snapshot => {
      dispatch(fetchAllProducts({ products: snapshot.val().products }))
    })
    return null
  }
)

export const restoreCart = bindThunkAction(
  asyncActions.restoreCart,
  async () => {
    const cart = await storage.loadLocalStorageByKey<cartModel.IRootState>(
      'cart'
    )
    return { cart }
  }
)

export const addToCartSafe = actionCreator<{ productCode: ProductCode }>(
  'ADD_TO_CART_SAFE'
)

export const addToCart = bindThunkAction(
  asyncActions.addToCart,
  async (params, dispatch: Dispatch, getState: () => State) => {
    const { productCode } = params
    const inventory = getState().shop.products.ByCode[productCode].inventory
    const hasInventory = inventory > 0
    if (hasInventory) {
      dispatch(addToCartSafe({ productCode }))
    }
    return null
  }
)

export const checkout = bindThunkAction(
  asyncActions.checkout,
  async (_, __, getState: () => State) => {
    const { auth, shop } = getState()
    const { data: user } = auth.user
    const { cart } = shop
    if (!user) {
      await storage.saveLocalStorageByKey(cart, 'cart')
      location.href = '/login/'
    } else {
      await storage.deleteLocalStorageByKey('cart')
    }
    return null
  }
)

type State = authModel.IRootState & shopModel.IRootState
