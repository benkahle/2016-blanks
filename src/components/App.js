import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

import logo from '../logo.svg'
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

export { firebase }

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
