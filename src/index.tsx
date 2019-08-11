import React, {FC, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'connected-react-router'
import {Provider, useSelector} from 'react-redux'
import Layout from 'components/Layout'
import store, {history, State} from 'store'
import {requestToken, checkToken} from 'store/env'
import routes from './routes'
import 'styles/global.css'
import {axios} from 'utils/axios'
import {Box, Text, Button} from 'grommet'
import {Update} from 'grommet-icons'

const App: FC = () => {
  useEffect(() => {
    if (axios.defaults.headers.common['Authorization']) {
      store.dispatch(checkToken())
    } else {
      store.dispatch(requestToken())
    }
  }, [])

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout>
          <Container />
        </Layout>
      </ConnectedRouter>
    </Provider>
  )
}

const Container: FC = () => {
  const tokenExpired = useSelector<State, boolean>(
    state => state.env.tokenExpired
  )

  const error = useSelector<State, boolean>(state => state.env.error)

  const errorTips = (
    <Box flex align="center" justify="center">
      <Text margin={{bottom: 'large'}}>Oops……加载出错</Text>
      <Button
        primary
        icon={<Update size="small" />}
        label="重试"
        color="accent-1"
        onClick={() => location.reload()}
      />
    </Box>
  )

  if (error) {
    return errorTips
  }

  return tokenExpired ? null : routes
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
