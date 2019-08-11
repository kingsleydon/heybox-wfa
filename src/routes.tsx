import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Index from 'pages/Index'

const routes = (
  <Switch>
    <Route path="/" component={Index} />
  </Switch>
)

export default routes
