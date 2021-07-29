import axios from 'axios'
import SearchBar from 'component/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import ActionsDropdown from '../SellerProducts/ActionsDropdown'
import { useSelector } from 'react-redux'

const categoriesRender = (categories, deleteHandler) => {
  return categories.map((e, i) => {
    return (
      <tr className={`${i % 2 !== 0 && 'bg-gray-300'} text-base`} key={e._id}>
        <td className="p-1 px-5">{e.name}</td>
        <td className="p-1 px-5">{e.parent && e.parent.name}</td>
        <ActionsDropdown _id={e._id} deleteHandler={deleteHandler} />
      </tr>
    )
  })
}
const SellerCategories = () => {
  const { user } = useSelector((i) => i)
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getAll`
    )
    setCategories(data)
  }
  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  const sortOptions = [
    { key: 'date-added', value: 'date-added', text: 'Date added' },
  ]

  const deleteHandler = (_id) => async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/category/deleteCategory`,
        { _id },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      setCategories(categories.filter((i) => i._id !== _id))
      alert('Category has been Deleted!')
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <section className="h-full p-8">
      <div className="flex justify-between">
        <div className="flex space-x-4 w-64 items-center">
          <label htmlFor="sort" className="uppercase text-gray-400">
            <nobr> sort by</nobr>
          </label>
          <Dropdown
            className="flex-grow"
            fluid
            name="sort"
            selection
            options={sortOptions}
          />
        </div>
        <div className="flex space-x-3">
          <SearchBar />
          <Link
            style={{ backgroundColor: '#ffa15f' }}
            to="/add-category"
            className="text-white items-center flex p-2 px-4"
          >
            <p className=" ">+</p>
            <p className="ml-2">Add category</p>
          </Link>
        </div>
      </div>
      <table className="bg-white w-full mt-5">
        <tr className="text-sm text-left text-gray-400 border-b border-gray-400">
          <th className="uppercase p-3 px-5">Categories</th>
          <th className="uppercase p-3 px-5">Parent Categories</th>
          <th className="uppercase p-3 px-5"></th>
        </tr>
        {categoriesRender(categories, deleteHandler)}
      </table>
    </section>
  )
}

export default SellerCategories
