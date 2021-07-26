import UserDropdown from 'component/UserDropdown/UserDropdown'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SellerNavBar = ({ name }) => {
  const { user } = useSelector((i) => i)
  const [isDrop, setIsDrop] = useState(false)
  const dispatch = useDispatch()

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
    <nav className="px-8 bg-gray-300 w-full items-center flex justify-between space-y-4">
      <h1 className="font-bold text-3xl"> {name}</h1>
      <div className="">
        <div className="flex items-center relative">
          <button className="h-10 w-10 rounded-full border border-red-400">
            ava
          </button>
          <button onClick={onClickHandler} className="pl-4">
            {user.name} <i className="text-gray-400 fas fa-caret-down"></i>
          </button>
          <UserDropdown isDrop={isDrop} logoutHandler={logoutHandler} />
        </div>
      </div>
    </nav>
  )
}

export default SellerNavBar
