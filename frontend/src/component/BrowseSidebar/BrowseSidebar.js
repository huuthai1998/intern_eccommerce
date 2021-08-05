import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import FilterDropdown from './FilterDropdown'
import './BrowseSidebar.css'

const categoriesRender = (category, categoryChosen) => {
  console.log(categoryChosen)
  return category.map((e, i) => {
    return (
      <Link
        key={e._id}
        to={`/browse/${e.name}`}
        className={`category-name ${
          categoryChosen === e.name ? 'highlightColor' : 'normal-color'
        }`}
      >
        {e.name}
      </Link>
    )
  })
}

const BrowseSidebar = () => {
  const { category: categoryChosen } = useParams()
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

  const colorClickHandler = (cor) => (e) => {
    formHook.setValue('color', cor)
  }

  const applyFilter = async (sendData) => {
    dispatch({
      type: 'ADD_FILTER',
      data: { ...sendData, skip: 0 },
    })
  }

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  return (
    <nav
      style={{ 'margin-right': '16px', width: '200px' }}
      className="pb-8 h-screen flex flex-col space-y-4"
    >
      <h3 className="font-bold text-lg filter-header">Category</h3>
      <div className="Line-Copy"></div>
      <div style={{ 'margin-bottom': '30px' }} className="flex flex-col">
        {categoriesRender(category, categoryChosen)}
      </div>
      <div className="Line"></div>
      <form
        onSubmit={formHook.handleSubmit(applyFilter)}
        className="flex flex-col"
      >
        <h3
          style={{ 'margin-top': '30px' }}
          className="font-bold text-lg pb-6 filter-header"
        >
          Filter
        </h3>
        <FilterDropdown form={formHook} name="Size" sizeOpt={['S', 'M', 'L']} />
        <FilterDropdown
          form={formHook}
          name="Color"
          colorClickHandler={colorClickHandler}
          options={[
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
