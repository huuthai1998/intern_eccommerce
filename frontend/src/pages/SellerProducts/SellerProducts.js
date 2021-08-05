import axios from 'axios'
import SearchBar from 'component/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import ActionsDropdown from './ActionsDropdown'
import { useSelector } from 'react-redux'
import exportSvg from '../../assets/export-orange.svg'
import './SellerProducts.css'

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
      <tr
        style={{ height: '40px' }}
        className={`${i % 2 !== 0 && 'lowGray-bg'}`}
        key={e._id}
      >
        <td className="flex first-render-td">
          <img
            style={{ 'margin-right': '16px' }}
            src={e.photos[0]}
            alt="product"
            className="prod-seller-thumb object-cover"
          />
          <div className="flex flex-col justify-between">
            <Link to={`/product/${e._id}`} className="prod-name">
              {e.name}
            </Link>
            <h6 className="cat-text-seller text-left">{category}</h6>
          </div>
        </td>
        <td className="text-left first-render-td prod-name">{`${e.sold}/${e.quantity}`}</td>
        <td className="text-left first-render-td prod-name">{date}</td>
        <td className="text-left first-render-td prod-name">
          {e.price * e.sold}
        </td>
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
    <section style={{ 'margin-top': '36px' }} className="min-h-screen h-full">
      <div className="flex justify-between">
        <div className="flex space-x-4 w-64 items-center">
          <label htmlFor="sort" className="uppercase">
            <nobr className="sort-by"> sort by</nobr>
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
            className="add-button-seller text-white items-center flex p-2 px-4"
          >
            <p className="text-2xl">+</p>
            <p className="addProd-text text-white">Add product</p>
          </Link>
          <button className="export-button items-center flex p-2 px-4">
            <img src={exportSvg} alt="export" className="" />
            <p className="addProd-text">Export</p>
          </button>
        </div>
      </div>
      <table className="bg-white w-full mt-5">
        <tr
          style={{ 'border-color': '#ededed', 'margin-bottom': '12px' }}
          className="text-sm text-left text-gray-400 border-b"
        >
          <th className="uppercase seller-table-th">Products</th>
          <th className="uppercase text-left seller-table-th">Sold</th>
          <th className="uppercase text-left seller-table-th">Date Added</th>
          <th className="uppercase text-left seller-table-th">Profit ($)</th>
          <th className="uppercase text-left seller-table-th"></th>
        </tr>
        {productsRender(products, deleteHandler)}
      </table>
    </section>
  )
}

export default SellerProducts
