import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './CategoryDropdown.css'

const categoriesDropDownRender = (categories) => {
  return categories.map((i, key) => {
    return (
      <div className="cursor-pointer " key={key}>
        {i}
      </div>
    )
  })
}
const CategoryDropdown = ({ isDropCategory, categories }) => {
  console.log(isDropCategory)
  return (
    <div
      className={`mx-auto category-dropdown p-4 bg-gray-300 flex space-x-16 shadow-md p-2 absolute ${
        !isDropCategory && 'hidden'
      }`}
    >
      {categoriesDropDownRender(categories)}
    </div>
  )
}
export default CategoryDropdown
