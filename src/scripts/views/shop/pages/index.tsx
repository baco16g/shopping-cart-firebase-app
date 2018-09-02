import * as React from 'react'
import { ComponentEnhancer, lifecycle, compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { $Call } from 'utility-types'
import * as firebaseUtils from '@utils/firebase'
import * as authActions from '@redux/auth/actions'
import * as shopActions from '@redux/shop/actions'
import * as shopModel from '@redux/shop/reducers'
import Header from '@views/shop/organisms/Header'
import Products from '@views/shop/organisms/Products'
import Cart from '@views/shop/organisms/Cart'

export const PageIndex = () => {
  return (
    <React.Fragment>
      <Header />
      <Products />
      <Cart />
    </React.Fragment>
  )
}

const mapStateToProps = (state: shopModel.IRootState) => ({
  products: shopModel.getCartProducts(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(shopActions, dispatch)
  }
})

const enhacer: ComponentEnhancer<IPropsConnected, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<IPropsConnected, {}>({
    componentWillMount() {
      firebaseUtils.initialize()
      this.props.actions.fetchUser({})
      this.props.actions.addEventForProductsFetch({})
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.products === nextProps.products) {
        return false
      }
      // this.props.actions.addEventForProductsFetch({})
    }
  })
)

interface IPropsConnected
  extends $Call<typeof mapStateToProps>,
    $Call<typeof mapDispatchToProps> {}

export default enhacer(PageIndex)
