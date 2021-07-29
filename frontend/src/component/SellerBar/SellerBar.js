import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import SidebarItem from './SidebarItem'

const SellerBar = () => {
  return (
    <nav className="border-gray-500 border-r bg-gray-300 min-h-screen h-full w-72 flex flex-col  space-y-4">
      <Link to="/" className="mb-2 p-8">
        <img src={logo} alt="logo" />
      </Link>
      <SidebarItem name="Overview" icon="fas fa-chart-bar" />
      <SidebarItem name="Orders" icon="fas fa-shopping-cart" link="/orders" />
      <SidebarItem
        name="Categories"
        icon="fas fa-tshirt"
        link="/seller-category"
      />
      <SidebarItem name="Products" icon="fas fa-list" link="/seller-products" />
      <SidebarItem name="Payments" icon="fab fa-bitcoin" />
      <SidebarItem name="Promotions" icon="fas fa-tag" />
      <SidebarItem name="Setting" icon="fas fa-cog" />
    </nav>
  )
}

export default SellerBar
