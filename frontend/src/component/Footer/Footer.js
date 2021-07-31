import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import fb from '../../assets/facebook-icon.svg'
import ig from '../../assets/instagram-6-icon.svg'
import twit from '../../assets/twitter-icon.svg'
import './Footer.css'

const itemsRender = (name) => {
  return (
    <Link to="/" className="text-gray-400">
      {name}
    </Link>
  )
}
const Footer = () => {
  return (
    <footer className="px-40 pt-24 pb-10">
      <div className="flex justify-between pb-14 border-b border-gray-400">
        <Link to="/" className="flex ">
          <img src={logo} alt="aware logo" className="" />
        </Link>
        <div className="flex space-x-4 justify-between lg-links">
          {itemsRender('Home')}
          {itemsRender('Products')}
          {itemsRender('Services')}
          {itemsRender('About Us')}
          {itemsRender('Help')}
          {itemsRender('Contacts')}
        </div>
        <div className="flex space-x-4">
          <img src={twit} alt="aware logo" className="" />
          <img src={fb} alt="aware logo" className="" />
          <img src={ig} alt="aware logo" className="" />
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <div className="flex space-x-4">
          {itemsRender('Home')}
          {itemsRender('Products')}
          {itemsRender('Services')}
          {itemsRender('About Us')}
          {itemsRender('Help')}
          {itemsRender('Contacts')}
        </div>
        <div className="flex space-x-4">
          {itemsRender('Privacy Policy')}
          {itemsRender('Terms & Conditions')}
        </div>
      </div>
    </footer>
  )
}

export default Footer
