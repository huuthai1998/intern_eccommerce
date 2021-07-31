import axios from 'axios'
import SearchBar from 'component/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import ActionsDropdown from './ActionsDropdown'
import { useSelector } from 'react-redux'

const productsRender = (products, deleteHandler) => {
  return products.map((e, i) => {
    // Format date
    const dbDate = new Date(e.createdAt)
    let date = format(new Date(e.createdAt), 'E, do MMM-yyyy')

    const todate = new Date().getTime()

    if (!(dbDate === todate)) {
      date = format(new Date(e.createdAt), 'E, do MMM-yyyy')
    } else {
      date = format(new Date(e.createdAt), 'do MMM-yyyy')
      date = 'Today, ' + date
    }
    let category = ''
    e.categories.forEach((e, i) => {
      if (i !== 0) category += ', ' + e.name
      else category += e.name
    })
    return (
      <tr className={`${i % 2 !== 0 && 'bg-gray-300'} text-base`} key={e._id}>
        <td className="flex space-x-3 p-1 px-5">
          <img
            src={e.photos[0]}
            alt="product"
            className="w-8 h-10 object-cover"
          />
          <div className="flex flex-col">
            <Link to={`/product/${e._id}`} className="text-base">
              {e.name}
            </Link>
            <h6 className="text-sm text-gray-400">{category}</h6>
          </div>
        </td>
        <td className="p-1 px-5">{`${e.sold}/${e.quantity}`}</td>
        <td className="p-1 px-5">{date}</td>
        <td className="p-1 px-5">{e.price * e.sold}</td>
        <ActionsDropdown _id={e._id} deleteHandler={deleteHandler} />
      </tr>
    )
  })
}
const SellerProducts = () => {
  const { user } = useSelector((i) => i)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/product/getAll`
      )
      setProducts(data)
    }
    fetchData()
  }, [])
  const sortOptions = [
    { key: 'date-added', value: 'date-added', text: 'Date added' },
  ]

  const deleteHandler = (_id) => async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/product/deleteProduct`,
        { _id },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      setProducts(products.filter((i) => i._id !== _id))
      alert('Product has been Deleted!')
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <section className="min-h-screen h-full p-8">
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
            to="/add-product"
            className="text-white items-center flex p-2 px-4"
          >
            <p className=" ">+</p>
            <p className="ml-2">Add product</p>
          </Link>
        </div>
      </div>
      <table className="bg-white w-full mt-5">
        <tr className="text-sm text-left text-gray-400 border-b border-gray-400">
          <th className="uppercase p-3 px-5">Products</th>
          <th className="uppercase p-3 px-5">Sold</th>
          <th className="uppercase p-3 px-5">Date Added</th>
          <th className="uppercase p-3 px-5">Profit ($)</th>
          <th className="uppercase p-3 px-5"></th>
        </tr>
        {productsRender(products, deleteHandler)}
      </table>
    </section>
  )
}

export default SellerProducts
