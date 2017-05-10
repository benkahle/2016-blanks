import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var config = {
  apiKey: 'AIzaSyD3xxNtRdqgqbYw2WUlmswKT3eEZbF6Q1M',
  authDomain: 'blanks-5a110.firebaseapp.com',
  databaseURL: 'https://blanks-5a110.firebaseio.com',
  projectId: 'blanks-5a110',
  storageBucket: 'blanks-5a110.appspot.com',
  messagingSenderId: '801475889815'
}
firebase.initializeApp(config)
console.log(firebase)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
