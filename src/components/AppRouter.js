import React, { Component } from 'react'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import App, { firebase } from './App'
import Home from './Home'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export function login () {
  const provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('user_friends')
  firebase.auth().signInWithRedirect(provider)
}

const Login = () => (
  <div>
    You must login to view this site:
    <button onClick={login}>Login</button>
  </div>
)

class AppRouter extends Component {
  constructor (props) {
    super(props)
    this.routes = (
      <Router history={browserHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={Home} onEnter={(n, r, c) => this.checkAuth(n, r, c)} />
          <Route path='login' component={Login} />
          <Redirect from='*' to={'/'} />
        </Route>
      </Router>
    )
  }

  checkAuth (nextState, replace, callback) {
    if (!this.props.user.id) {
      replace('/login')
    }
    callback()
  }

  render () {
    return this.routes
  }
}

const AppRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter)

export default AppRouterContainer
