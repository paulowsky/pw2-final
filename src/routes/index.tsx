import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from 'src/pages/Dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import Login from 'src/pages/Login'
import Home from 'src/pages/Home'
import Editoras from 'src/pages/Editoras'
import Livros from 'src/pages/Livros'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/dashboard" exact component={Dashboard} />
    <PrivateRoute path="/livros" exact component={Livros} />
    <PrivateRoute path="/editoras" exact component={Editoras} />
  </Switch>
)

export default Routes
