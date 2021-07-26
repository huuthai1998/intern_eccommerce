import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterDropdown from './FilterDropdown'

const categoriesRender = (category) => {
  return category.map((e, i) => {
    return (
      <Link
        key={e._id}
        to={`/browse/${e.name}`}
        className="text-gray-400 font-semibold  border-gray-300  focus:text-red-400  hover:text-red-400"
      >
        {e.name}
      </Link>
    )
  })
}
const BrowseSidebar = () => {
  const { filter } = useSelector((i) => i)
  const dispatch = useDispatch()
  const [category, setCategory] = useState([])
  const formHook = useForm()
  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getSub`
    )
    setCategory(data)
  }

  const applyFilter = async (sendData) => {
    dispatch({
      type: 'ADD_FILTER',
      data: sendData,
    })
  }

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  return (
    <nav className="p-4 border-r 0 h-screen w-72 flex flex-col space-y-4">
      <h3 className="font-bold">Category</h3>
      <div className="border-b-2 pb-8 border-gray-400 flex flex-col space-y-2">
        {categoriesRender(category)}
      </div>
      <form
        onSubmit={formHook.handleSubmit(applyFilter)}
        className="flex flex-col"
      >
        <FilterDropdown form={formHook} name="Size" />
        <FilterDropdown
          form={formHook}
          name="Color"
          options={[
            'All',
            'Blue',
            'Brown',
            'White',
            'Black',
            'Yellow',
            'Green',
            'Red',
          ]}
        />
        <FilterDropdown
          form={formHook}
          name="Brand"
          options={[
            'All',
            'Adidas',
            'Nike',
            'Zara',
            'Uniqlo',
            'H&M',
            'Routine',
          ]}
        />
        <FilterDropdown form={formHook} name="Available" />
        <button className="bg-red-400 p-2 text-white">Apply</button>
      </form>
    </nav>
  )
}

export default BrowseSidebar
