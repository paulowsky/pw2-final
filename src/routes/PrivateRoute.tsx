import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useGlobal from 'src/hooks/useGlobal'

const PrivateRoute = ({ component: Component, ...props }: any) => {
  const { isAuthenticated } = useGlobal()

  return (
    <Route
      {...props}
      render={() =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
