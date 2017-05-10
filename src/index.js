import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import rootReducer from './reducers'
import AppRouter from './components/AppRouter'
import './styles/index.scss'

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
})

const composeEnhancers = process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

let middleware = [
  thunk
]

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware]
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  persistState([], {key: '2016-blanks'})
)

const store = createStore(rootReducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
