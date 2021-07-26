import React from 'react'
import { Link } from 'react-router-dom'

const SidebarItem = (props) => {
  const { name, icon, link } = props
  return (
    <Link
      to={link ? link : '/add-product'}
      className="pl-4 text-gray-600 p-2 font-semibold flex space-x-4 text-lg items-center border-l-4 border-gray-300  focus:text-red-400 focus:border-red-400 hover:text-red-400 hover:border-red-400"
    >
      <i className={icon}></i>
      <span className="">{name}</span>
    </Link>
  )
}

export default SidebarItem
