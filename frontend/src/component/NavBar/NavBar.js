import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import UserDropdown from 'component/UserDropdown/UserDropdown'
import Cookies from 'js-cookie'

const NavBar = () => {
  const { authenticated } = useSelector((i) => i)
  const dispatch = useDispatch()
  const [isDrop, setIsDrop] = useState(false)

  const onClickHandler = (e) => {
    e.preventDefault()
    setIsDrop(!isDrop)
  }
  const logoutHandler = (e) => {
    e.preventDefault()
    setIsDrop(false)
    dispatch({ type: 'LOGOUT_REQUEST' })
    try {
      Cookies.remove('authInfo')
      dispatch({ type: 'LOGOUT_SUCCESS' })
    } catch (error) {
      console.error(error)
      throw error.message
    }
  }

  return (
    <nav className="">
      <section className="w-screen grid grid-nav py-6">
        <div className="flex justify-center">
          <div className="">Search Bar</div>
        </div>
        <div className="flex justify-center">
          <img src={logo} alt="aware logo" className="" />
        </div>
        {!authenticated ? (
          <div className="flex justify-center">
            <div className="space-x-4">
              <button className="text-base">Register</button>
              <button className="text-base font-bold text-red-400 rounded-full px-8 py-1 border border-red-400">
                Log In
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex justify-center">
            <UserDropdown isDrop={isDrop} logoutHandler={logoutHandler} />
            <button
              onClick={onClickHandler}
              className="rounded-full border border-red-400"
            >
              avatar
            </button>
          </div>
        )}
      </section>
      <section className="border-t border-b border-gray-200 py-4 flex space-x-8 justify-center">
        <div className="flex">
          <span className="">
            Men<i className="ml-2 fas fa-chevron-down"></i>
          </span>
        </div>
        <div className="flex">
          <span className="">
            Ladies<i className="ml-2 fas fa-chevron-down"></i>
          </span>
        </div>
        <div className="flex">
          <span className="">
            Girls<i className="ml-2 fas fa-chevron-down"></i>
          </span>
        </div>
        <div className="flex">
          <span className="">
            Boys<i className="ml-2 fas fa-chevron-down"></i>
          </span>
        </div>
      </section>
    </nav>
  )
}

export default NavBar
