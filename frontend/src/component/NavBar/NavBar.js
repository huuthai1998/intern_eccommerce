import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import UserDropdown from 'component/UserDropdown/UserDropdown'
import Cookies from 'js-cookie'
import axios from 'axios'
import CategoryDropdown from 'component/CategoryDropdown/CategoryDropdown'
import { Input } from 'semantic-ui-react'

const categoriesRender = (
  dropCategories,
  categories,
  hoverCategoryHandler,
  mouseLeaveCategoryHandler
) => {
  return categories.map((i, index) => {
    if (i.parent === null) {
      const subCategories = categories.filter(
        (e) => e.parent && e.parent.name === i.name
      )
      return (
        <div
          className="flex"
          key={i._id}
          onMouseOver={hoverCategoryHandler(index)}
        >
          <span className=" cursor-pointer">
            {i.name}
            <i className="ml-2 fas fa-chevron-down"></i>
          </span>
          <CategoryDropdown
            isDropCategory={dropCategories[index]}
            categories={subCategories}
            mouseLeaveCategoryHandler={mouseLeaveCategoryHandler}
          />
        </div>
      )
    } else return <div className="div" hidden key={i._id}></div>
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

  const mouseLeaveCategoryHandler = (e) => {
    setDropCategories(
      dropCategories.map((u) => {
        return false
      })
    )
  }
  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getAll`
    )
    setCategory(data)
    setDropCategories(new Array(data.length).fill(false))
  }
  useEffect(() => {
    fetchData()
    return () => {}
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
      <section className="w-screen grid grid-nav py-6 border-b border-gray-400">
        <div className="flex justify-center">
          <Input
            icon="search"
            iconPosition="right"
            placeholder="Search"
            className="border-black border rounded-lg"
          />
        </div>
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="aware logo" className="" />
        </Link>
        {!authenticated ? (
          <div className="flex justify-center">
            <div className="space-x-4">
              <Link to="/register" className="text-base">
                Register
              </Link>
              <Link
                to="/login"
                className="text-base font-bold text-red-400 rounded-full px-8 py-1 border border-red-400"
              >
                Log In
              </Link>
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
      <section className="relative border-b border-gray-400 py-4 flex space-x-8 justify-center">
        {categoriesRender(
          dropCategories,
          category,
          hoverCategoryHandler,
          mouseLeaveCategoryHandler
        )}
      </section>
    </nav>
  )
}

export default NavBar
