import HomePageCard from 'component/HomePageCard/HomePageCard'
import React from 'react'
import { useHistory } from 'react-router-dom'
import mainHome from '../assets/mainHome.jpg'
import boys from '../assets/boys.jpg'
import girls from '../assets/girls.jpg'
import ladies from '../assets/ladies.jpg'
import men from '../assets/men.jpg'
import './Home.css'

const Home = () => {
  return (
    <section
      style={{ 'margin-top': '37px' }}
      className="min-h-screen px-40 w-full"
    >
      <div className="mainImg-wrapper relative">
        <img src={mainHome} alt="" className="w-full h-full object-cover" />
        <h1 className="absolute uppercase header-img">Outfit of the week</h1>
        <button className="absolute shop-home-now">Shop now</button>
      </div>
      <div style={{ 'margin-top': '19px' }} className="flex justify-between">
        <HomePageCard image={men} name="Men" link="Suit" />
        <HomePageCard image={ladies} name="Ladies" link="Skirt" />
        <HomePageCard image={girls} name="Girls" link="Suit" />
        <HomePageCard image={boys} name="Boys" link="Suit" />
      </div>
    </section>
  )
}

export default Home
