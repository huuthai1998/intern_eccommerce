import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UserDropdown = ({ isDrop, logoutHandler }) => {
  return (
    <div
      className={`flex flex-col shadow-md z-50 p-2 absolute right-0 top-10 ${
        !isDrop && 'hidden'
      }`}
    >
      <button className="">Account setting</button>
      <button className="" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}
export default UserDropdown
