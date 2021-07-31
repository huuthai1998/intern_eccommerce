import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UserDropdown = ({ isDrop, logoutHandler }) => {
  return (
    <div
      className={`bg-gray-200 flex flex-col shadow-2xl z-50 p-2 absolute right-12 top-14 ${
        !isDrop && 'hidden'
      }`}
    >
      <button className="text-left border-b border-gray-300 px-2">
        Account setting
      </button>
      <button className="text-left px-2" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}
export default UserDropdown
