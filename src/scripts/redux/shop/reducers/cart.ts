import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '@redux/shop/actions'
import * as asyncActions from '@redux/shop/actions/async'

type addedCodes = ProductCode[]
interface IQuantityByCode {
  [key: number]: number
}

const initialState = {
  addedCodes: [],
  quantityByCode: {}
}

///////////

const cart = reducerWithInitialState<IRootState>(initialState)
  .case(actions.addToCartSafe, (state, { productCode }) => ({
    ...state,
    addedCodes: addIdToCart(state.addedCodes, productCode),
    quantityByCode: updateQuantityByCode(state.quantityByCode, productCode)
  }))
  .case(asyncActions.restoreCart.done, (state, { result }) => {
    const { cart: data } = result
    return data ? data : state
  })
  .case(asyncActions.checkout.done, state => ({
    ...initialState
  }))

const addIdToCart = (state: addedCodes, productCode: ProductCode) => {
  const canAddId = state.indexOf(productCode) === -1
  if (canAddId) {
    return [...state, productCode]
  } else {
    return state
  }
}

const updateQuantityByCode = (
  state: IQuantityByCode,
  productCode: ProductCode
) => ({
  ...state,
  [productCode]: (state[productCode] || 0) + 1
})

///////////

export interface IRootState {
  addedCodes: addedCodes
  quantityByCode: IQuantityByCode
}

export default cart

///////////

export const getQuantity = (state: IRootState, productCode: ProductCode) =>
  state.quantityByCode[productCode] || 0

export const getAddedCodes = (state: IRootState) => state.addedCodes
