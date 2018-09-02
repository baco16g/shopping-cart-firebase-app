import { combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '@redux/shop/actions'
import * as asyncActions from '@redux/shop/actions/async'

interface IByCode {
  [key: number]: Product
}
const byCodeInitial: IByCode = {}

type VisibleCodes = ProductCode[]
const visibleCodesInitial: VisibleCodes = []

///////////

const ByCode = reducerWithInitialState<IByCode>(byCodeInitial)
  .case(actions.fetchAllProducts, (state, { products }) => ({
    ...state,
    ...Object.values(products).reduce((acc: IByCode, product) => {
      acc[product.code] = product
      return acc
    }, {})
  }))
  .case(actions.addToCartSafe, (state, { productCode }) => ({
    ...state,
    [productCode]: decrementInventory(state[productCode])
  }))

const decrementInventory = (state: Product) => ({
  ...state,
  inventory: state.inventory - 1
})

///////////

const visibleCodes = reducerWithInitialState<VisibleCodes>(
  visibleCodesInitial
).case(actions.fetchAllProducts, (_, { products }) =>
  Object.values(products).map(product => product.code)
)

///////////

export interface IRootState {
  ByCode: IByCode
  visibleCodes: VisibleCodes
}

export default combineReducers({
  ByCode,
  visibleCodes
})

///////////

export const getProduct = (state: IRootState, code: ProductCode) =>
  state.ByCode[code]

export const getVisibleProducts = (state: IRootState) =>
  state.visibleCodes.map(code => getProduct(state, code))
