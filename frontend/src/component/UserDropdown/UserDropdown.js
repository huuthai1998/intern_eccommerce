import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UserDropdown = ({ isDrop, logoutHandler }) => {
  return (
    <div
      className={`flex flex-col shadow-md p-2 absolute right-0 ${
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
