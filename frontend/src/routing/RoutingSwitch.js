import React, { useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import routePaths from 'routing/paths'
import config from 'routing/config'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from 'component/NavBar/NavBar'
import SellerBar from 'component/SellerBar/SellerBar'
import SellerNavBar from 'component/SellerNavBar/SellerNavBar'
import jwt from 'jsonwebtoken'
import BrowseSidebar from 'component/BrowseSidebar/BrowseSidebar'
import Footer from 'component/Footer/Footer'
import TitleHeader from 'component/TitlteHeader'

const RoutingSwitch = () => {
  const state = useSelector((i) => i)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'CHECK_AUTH_REQUEST',
    })
    let user = Cookies.getJSON('authInfo')
    if (user !== undefined)
      dispatch({
        type: 'CHECK_AUTH_SUCCESS',
        data: { ...jwt.decode(user), token: user },
      })
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
              if (state.isLoading) {
                return <div>LOADING</div>
              } else if (route.unAuthOnly && !state.authenticated) {
                return <Component {...routeProps} />
              } else if (
                route.path === '/product/:id' ||
                route.path === '/cart'
              ) {
                return (
                  <div className="">
                    <NavBar /> <Component {...routeProps} /> <Footer />
                  </div>
                )
              }
              // Seller Only
              else if (
                route.adminOnly &&
                state.user !== undefined &&
                state.user.isAdmin
              ) {
                return (
                  <div className="flex w-screen bg-gray-300">
                    <SellerBar />
                    <div className="max-h-screen flex flex-col w-full">
                      <SellerNavBar name={route.name} />
                      <Component {...routeProps} />
                    </div>
                  </div>
                )
              }

              // Customer
              else if (
                (!route.authOnly && !route.unAuthOnly && !route.adminOnly) ||
                (route.unAuthOnly &&
                  !state.authenticated &&
                  !route.adminOnly) ||
                (route.authOnly && state.authenticated && !route.adminOnly)
              ) {
                return (
                  <div className="">
                    <NavBar />
                    <TitleHeader />
                    <div className="flex px-40">
                      <BrowseSidebar />
                      <Component {...routeProps} />
                    </div>
                    <Footer />
                  </div>
                )
              } else if (route.redirect) {
                return <Redirect to={route.redirect} />
              } else return <Redirect to={routePaths.ERROR} />
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
