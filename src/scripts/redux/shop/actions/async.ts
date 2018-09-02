import actionCreatorFactory from 'typescript-fsa'
import * as cartModel from '@redux/shop/reducers/cart'

const actionCreator = actionCreatorFactory()

export const addEventForProductsFetch = actionCreator.async<{}, null>(
  'ADD_EVENT_FOR_PRODUCTS_FETCH '
)

export const restoreCart = actionCreator.async<
  {},
  { cart: cartModel.IRootState | null }
>('RESTORE_CART')

export const addToCart = actionCreator.async<
  { productCode: ProductCode },
  null
>('ADD_TO_CART')

export const checkout = actionCreator.async<{}, null>('CHECKOUT')
