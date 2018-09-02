import { combineReducers } from 'redux'
import productsReducer, * as productsModel from '@redux/shop/reducers/products'
import cartReducer, * as cartModel from '@redux/shop/reducers/cart'

export default {
  shop: combineReducers({
    products: productsReducer,
    cart: cartReducer
  })
}

export interface IRootState {
  shop: {
    products: productsModel.IRootState
    cart: cartModel.IRootState
  }
}

const getAddedCodes = (state: IRootState) =>
  cartModel.getAddedCodes(state.shop.cart)

const getQuantity = (state: IRootState, code: ProductCode) =>
  cartModel.getQuantity(state.shop.cart, code)

const getProduct = (state: IRootState, code: ProductCode) =>
  productsModel.getProduct(state.shop.products, code)

export const getVisibleProducts = (state: IRootState) =>
  productsModel.getVisibleProducts(state.shop.products)

export const getTotal = (state: IRootState) =>
  getAddedCodes(state)
    .reduce((total, code) => {
      if (!getProduct(state, code) || !getQuantity(state, code)) {
        return total
      }
      return total + getProduct(state, code).price * getQuantity(state, code)
    }, 0)
    .toFixed(2)

export const getCartProducts = (state: IRootState) =>
  getAddedCodes(state).map(code => ({
    ...getProduct(state, code),
    quantity: getQuantity(state, code)
  }))
