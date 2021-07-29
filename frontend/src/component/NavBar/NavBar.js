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
import { useForm } from 'react-hook-form'

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
  const { authenticated, cartNumItems } = useSelector((i) => i)
  const dispatch = useDispatch()
  const formHook = useForm()
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

  const cartRender = (
    <Link to="/cart" className="ml-5 flex ">
      <button className="flex cart-wrapper items-baseline">
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      </button>
      {cartNumItems > 0 ? (
        <span
          className="text-white text-sm relative rounded-full h-4 w-4 flex items-center justify-center z-10 cart-count"
          style={{ backgroundColor: '#ffa15f' }}
        >
          {cartNumItems}
        </span>
      ) : (
        <></>
      )}
    </Link>
  )

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

  const submitHandler = ({ name }) => {
    dispatch({ type: 'ADD_FILTER', data: { name, skip: 0 } })
  }

  return (
    <nav className="">
      <section className="w-screen grid grid-nav py-6 border-b border-gray-400 px-40">
        <form
          onSubmit={formHook.handleSubmit(submitHandler)}
          className="relative searchBar"
        >
          <input
            {...formHook.register('name')}
            placeholder="Search"
            className="h-10 p-2 py-4 border-black border rounded-lg w-full pr-8 focus:outline-none"
          />
          <button className="absolute right-5 top-2">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="aware logo" className="" />
        </Link>
        {!authenticated ? (
          <div className="flex justify-end">
            <div className="space-x-4 flex items-center">
              <Link to="/register" className="text-base">
                Register
              </Link>
              <Link
                to="/login"
                className="text-base font-bold text-red-400 rounded-full px-8 py-1 border border-red-400"
              >
                Log In
              </Link>
              {cartRender}
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-end">
            <UserDropdown isDrop={isDrop} logoutHandler={logoutHandler} />
            <button
              onClick={onClickHandler}
              className="rounded-full border border-red-400"
            >
              avatar
            </button>
            {cartRender}
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
