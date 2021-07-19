import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import UserDropdown from 'component/UserDropdown/UserDropdown'
import Cookies from 'js-cookie'
import axios from 'axios'
import CategoryDropdown from 'component/CategoryDropdown/CategoryDropdown'

const categoriesRender = (dropCategories, categories, hoverCategoryHandler) => {
  return categories.map((i, index) => {
    return (
      <div
        className="flex"
        key={categories._id}
        onMouseOver={hoverCategoryHandler(index)}
      >
        <span className=" cursor-pointer">
          {i.name}
          <i className="ml-2 fas fa-chevron-down"></i>
        </span>
        <CategoryDropdown
          isDropCategory={dropCategories[index]}
          categories={i.subCategories}
        />
      </div>
    )
  })
}

const NavBar = () => {
  const { authenticated } = useSelector((i) => i)
  const dispatch = useDispatch()
  const [category, setCategory] = useState([])
  const [isDrop, setIsDrop] = useState(false)
  const [dropCategories, setDropCategories] = useState([])
  const hoverCategoryHandler = (idx) => (e) => {
    setDropCategories(
      dropCategories.map((u, i) => {
        if (i === idx) return true
        else return false
      })
    )
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/category/getAll')
      setCategory(data)
      setDropCategories(new Array(data.length).fill(false))
    }
    fetchData()
  }, [])

  const onClickHandler = (e) => {
    e.preventDefault()
    setIsDrop(!isDrop)
  }
  const logoutHandler = (e) => {
    e.preventDefault()
    setIsDrop(false)
    dispatch({ type: 'LOGOUT_REQUEST' })
    try {
      Cookies.remove('authInfo')
      dispatch({ type: 'LOGOUT_SUCCESS' })
    } catch (error) {
      console.error(error)
      throw error.message
    }
  }

  return (
    <nav className="">
      <section className="w-screen grid grid-nav py-6">
        <div className="flex justify-center">
          <div className="">Search Bar</div>
        </div>
        <div className="flex justify-center">
          <img src={logo} alt="aware logo" className="" />
        </div>
        {!authenticated ? (
          <div className="flex justify-center">
            <div className="space-x-4">
              <button className="text-base">Register</button>
              <button className="text-base font-bold text-red-400 rounded-full px-8 py-1 border border-red-400">
                Log In
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex justify-center">
            <UserDropdown isDrop={isDrop} logoutHandler={logoutHandler} />
            <button
              onClick={onClickHandler}
              className="rounded-full border border-red-400"
            >
              avatar
            </button>
          </div>
        )}
      </section>
      <section className="relative border-t border-b border-gray-200 py-4 flex space-x-8 justify-center">
        {categoriesRender(dropCategories, category, hoverCategoryHandler)}
      </section>
    </nav>
  )
}

export default NavBar
