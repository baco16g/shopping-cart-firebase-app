import * as React from 'react'
import { ComponentEnhancer, lifecycle, compose } from 'recompose'
import * as firebaseUtils from '@utils/firebase'
import LoginForm from '@views/login/organisms/LoginForm'

export const PageIndex = () => {
  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  )
}

const enhancer: ComponentEnhancer<{}, {}> = compose(
  lifecycle({
    componentWillMount() {
      firebaseUtils.initialize()
    }
  })
)

export default enhancer(PageIndex)
