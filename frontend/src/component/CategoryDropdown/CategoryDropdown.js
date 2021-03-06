import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './CategoryDropdown.css'

const categoriesDropDownRender = (categories) => {
  return categories.map((i) => {
    return (
      <Link
        to={`/browse/${i.name}`}
        className="cursor-pointer cat-text"
        key={i._id}
      >
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
      className={`mx-auto top-4 category-dropdown flex space-x-16 shadow-md absolute z-50 ${
        !isDropCategory && 'hidden'
      }`}
      onMouseLeave={mouseLeaveCategoryHandler}
    >
      {categoriesDropDownRender(categories)}
    </div>
  )
}
export default CategoryDropdown
