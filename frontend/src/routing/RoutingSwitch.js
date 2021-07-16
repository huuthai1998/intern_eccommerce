import React, { useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import routePaths from 'routing/paths'
import config from 'routing/config'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'

const RoutingSwitch = () => {
  const state = useSelector((i) => i)
  const dispatch = useDispatch()
  useEffect(() => {
    let user = Cookies.getJSON('authInfo')
    if (user !== undefined) dispatch({ type: 'CHECK_AUTH_SUCCESS' })
    else dispatch({ type: 'CHECK_AUTH_FAIL' })
  }, [])
  return (
    <Switch>
      {config.map(({ component: Component, ...route }) => {
        return (
          <Route
            key={route.path}
            {...route}
            render={(routeProps) => {
              if (route.authOnly && state.isLoading) return <div>LOADING</div>
              else if (
                (!route.authOnly && !route.unAuthOnly) ||
                (route.adminOnly && state.user && state.user.isAdmin) ||
                (route.unAuthOnly && !state.authenticated) ||
                (route.authOnly && state.authenticated)
              )
                return <Component {...routeProps} />
              else if (route.redirect) return <Redirect to={route.redirect} />
              else return <Redirect to={routePaths.ERROR} />
            }}
          />
        )
      })}
      {/* Go to Home if route not found */}
      <Redirect to={routePaths.HOME} />
    </Switch>
  )
}

export default RoutingSwitch
