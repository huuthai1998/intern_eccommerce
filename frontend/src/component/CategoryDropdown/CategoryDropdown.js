import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './CategoryDropdown.css'

const categoriesDropDownRender = (categories) => {
  return categories.map((i) => {
    return (
      <Link to={`/browse/${i.name}`} className="cursor-pointer " key={i._id}>
        {i.name}
      </Link>
    )
  })
}
const CategoryDropdown = ({
  isDropCategory,
  categories,
  mouseLeaveCategoryHandler,
}) => {
  return (
    <div
      className={`mx-auto category-dropdown p-4 bg-gray-300 flex space-x-16 shadow-md p-2 absolute ${
        !isDropCategory && 'hidden'
      }`}
      onMouseLeave={mouseLeaveCategoryHandler}
    >
      {categoriesDropDownRender(categories)}
    </div>
  )
}
export default CategoryDropdown
