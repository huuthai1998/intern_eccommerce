import React from 'react'
import { Link } from 'react-router-dom'
import './SellerBar.css'

const SidebarItem = (props) => {
  const { name, icon, link, route } = props
  console.log(name, route)
  return (
    <Link
      to={link ? link : '/add-product'}
      style={{
        height: '48px',
      }}
      className={`${
        name === route ? 'highlightColor' : 'normal-color'
      } item-text flex items-center border-l-4 seller-mode`}
    >
      <i style={{ 'margin-right': '20px' }} className={icon}></i>
      <span className="">{name}</span>
    </Link>
  )
}

export default SidebarItem
