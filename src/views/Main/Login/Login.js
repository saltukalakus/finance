import React, {PropTypes as T} from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../../utils/AuthService'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className="main-div">
        <br />
        <h4>Login</h4>
        <br />
        <Button onClick={auth.login.bind(this)}>Login</Button>
      </div>
    )
  }
}

/*Login.contextTypes = {
  router: PropTypes.object.isRequired
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}*/

export default Login
