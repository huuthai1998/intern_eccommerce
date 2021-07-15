import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const state = useSelector((i) => i)
  const history = useHistory()

  console.log(state)
  if (!state.authenticated) history.push('/login')
  return <div className="">Home Page</div>
}

export default Home
