import React, {FC, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import Layout from 'components/Layout'
import store, {history} from 'store'
import {requestToken} from 'store/env'
import 'styles/global.css'

const App: FC = () => {
  useEffect(() => {
    store.dispatch(requestToken())
  }, [])
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout>{}</Layout>
      </ConnectedRouter>
    </Provider>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
