import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import { Link } from 'react-router-dom'

const AddCategory = () => {
  const { user } = useSelector((i) => i)
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const formHook = useForm()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/category/getParents`
      )
      setCategory(data)
    }
    fetchData()
  }, [])

  // Submit the form
  const submitHandler = async (category) => {
    console.log(category)
    setLoading(true)
    try {
      console.log(user)
      await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/category/createCategory`,
        { category },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )

      alert('Category has been added!')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div className="bg-gray-300 h-full w-full justify-center">
      <h1 className="pl-8 text-lg pb-2">Categories / Add category</h1>
      <form
        onSubmit={formHook.handleSubmit(submitHandler)}
        className="ui form small rounded-md px-10 flex flex-col text-lg font-normal"
      >
        <ProductInputBox form={formHook} name="name" label="name" />
        <ProductInputBox
          form={formHook}
          name="parents"
          label="parent categories"
          type="single-drop"
          options={category}
        />

        <div className="pt-8 flex justify-end space-x-4">
          <Link
            to="/seller-category"
            style={{ color: '#ffa15f' }}
            className="w-32 bg-white p-2 text-white text-center orange"
          >
            Cancel
          </Link>
          <button
            style={{ 'background-color': '#ffa15f' }}
            className="w-32 p-2 text-white text-center orange"
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
