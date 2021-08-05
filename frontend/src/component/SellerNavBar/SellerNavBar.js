import UserDropdown from 'component/UserDropdown/UserDropdown'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ava from '../../assets/ava.png'
import './SellerNavbar.css'

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
    <nav className="seller-nav-wrapper w-full items-center flex justify-between">
      <h1 className="Montserrat-Bold"> {name}</h1>
      <div className="">
        <div className="flex items-center relative">
          <button className="h-10 w-10 rounded-full ava-seller-button flex justify-center items-start">
            <img src={ava} alt="" className="h-9 w-9 rounded-full" />
          </button>
          <button
            onClick={onClickHandler}
            style={{ 'font-size': '14px', 'margin-left': '16px' }}
            className="Montserrat-Bold"
          >
            {user.name} <i className="text-gray-400 fas fa-caret-down"></i>
          </button>
          <UserDropdown isDrop={isDrop} logoutHandler={logoutHandler} />
        </div>
      </div>
    </nav>
  )
}

export default SellerNavBar
