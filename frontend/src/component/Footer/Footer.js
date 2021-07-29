import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import fb from '../../assets/facebook-icon.svg'
import ig from '../../assets/instagram-6-icon.svg'
import twit from '../../assets/twitter-icon.svg'

const itemsRender = (name) => {
  return (
    <Link to="/" className="text-gray-400">
      {name}
    </Link>
  )
}
const Footer = () => {
  return (
    <footer className="px-40 pb-24">
      <div className="flex justify-between">
        <Link to="/" className="flex ">
          <img src={logo} alt="aware logo" className="" />
        </Link>
        <div className="flex space-x-4">
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
    </footer>
  )
}

export default Footer
