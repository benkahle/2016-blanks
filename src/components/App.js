import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

import { login } from './AppRouter'
import { setUser } from '../actions'
import '../styles/App.scss'

var config = {
  apiKey: 'AIzaSyD3xxNtRdqgqbYw2WUlmswKT3eEZbF6Q1M',
  authDomain: 'blanks-5a110.firebaseapp.com',
  databaseURL: 'https://blanks-5a110.firebaseio.com',
  projectId: 'blanks-5a110',
  storageBucket: 'blanks-5a110.appspot.com',
  messagingSenderId: '801475889815'
}
firebase.initializeApp(config)

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

export class App extends Component {
  componentWillMount () {
    firebase.auth().getRedirectResult().then(result => {
      if (result && result.user) {
        let user = result.user
        if (result.credential) {
          user.userToken = result.credential.accessToken
        }
        this.props.setUser(user)
        browserHistory.replace('/')
      }
    }).catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      console.error(errorCode, errorMessage, email, credential)
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to 2016 ____s</h2>
          <p className='App-intro'>
            The current year is 2017.
          </p>
          {
            this.props.user.id
            ? <div>Welcome, {this.props.user.displayName}</div>
            : <button onClick={login}>Login</button>
          }
        </div>
        {this.props.children}
      </div>
    )
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export { firebase }
export default AppContainer
