import {createStore, combineReducers, applyMiddleware, Middleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import axiosMiddleware from 'redux-axios-middleware'
import {createBrowserHistory} from 'history'
import {axios} from 'utils/axios'
import env from './env'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  env,
})

const middlewares: Middleware[] = [
  routerMiddleware(history),
  axiosMiddleware(axios),
]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
