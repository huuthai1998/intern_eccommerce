import React from 'react'
import { Link } from 'react-router-dom'
import './HomePageCard.css'

const HomePageCard = ({ image, name, link }) => {
  return (
    <div className="card-wrapper relative">
      <img src={image} alt="" className="w-full h-full object-cover" />
      <div className="absolute bot-wrapper">
        <h1 className="card-text text-center">{name}</h1>
        <div className="Line-home"></div>
        <Link to={`/browse/${link}`} className="shop-button">
          Shop now
        </Link>
      </div>
    </div>
  )
}

export default HomePageCard
