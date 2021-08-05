import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import SidebarItem from './SidebarItem'
import './SellerBar.css'

const SellerBar = ({ name }) => {
  return (
    <nav className="seller-bar min-h-screen h-full flex flex-col">
      <Link to="/" className="logo-seller-wrapper">
        <img src={logo} alt="logo" className="w-full h-full" />
      </Link>
      <SidebarItem route={name} name="Overview" icon="fas fa-chart-bar" />
      <SidebarItem
        route={name}
        name="Orders"
        icon="fas fa-shopping-cart"
        link="/orders"
      />
      <SidebarItem
        route={name}
        name="Categories"
        icon="fas fa-tshirt"
        link="/seller-category"
      />
      <SidebarItem
        route={name}
        name="Products"
        icon="fas fa-list"
        link="/seller-products"
      />
      <SidebarItem route={name} name="Payments" icon="fab fa-bitcoin" />
      <SidebarItem route={name} name="Promotions" icon="fas fa-tag" />
      <SidebarItem route={name} name="Setting" icon="fas fa-cog" />
    </nav>
  )
}

export default SellerBar
