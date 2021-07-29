import axios from 'axios'
import SearchBar from 'component/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import ActionsDropdown from 'pages/SellerProducts/ActionsDropdown'

const ordersRender = (orders, markCancel, markComplete) => {
  return orders.map((e, i) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
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
    let product = ''
    e.items.forEach((prod, idx) => {
      if (idx !== 0)
        product += `, ${prod.name} (${prod.size}) X ${prod.quantity}`
      else product += `${prod.name} (${prod.size}) X ${prod.quantity}`
    })
    return (
      <tr className={`${i % 2 !== 0 && 'bg-gray-300'} text-base`} key={e._id}>
        <td className="flex space-x-3 p-1 px-5">{e._id.substring(0, 6)}</td>
        <td className="p-1 px-5">{date}</td>
        <td className="p-1 px-5">{product}</td>
        <td className="p-1 px-5">{formatter.format(e.subTotal)}</td>
        <td>
          <p
            className={`rounded-full p-1 text-sm text-center ${
              e.status === 'Pending'
                ? 'bg-yellow-400'
                : e.status === 'Completed'
                ? 'bg-green-400'
                : 'bg-red-400'
            }`}
          >
            {e.status}
          </p>
        </td>
        <ActionsDropdown
          name="orders"
          _id={e._id}
          markComplete={markComplete}
          markCancel={markCancel}
        />
      </tr>
    )
  })
}
const Orders = () => {
  const { user } = useSelector((i) => i)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/order/getAll`
      )
      setOrders(data)
    }
    fetchData()
  }, [])

  const markComplete = (_id) => async (e) => {
    try {
      console.log('ff')
      setLoading(true)
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_LINK}/order/markOrder`,
        { _id, status: 'Completed' },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      let temp = [...orders]
      var tempStatus = temp.find((e) => e._id === _id)
      tempStatus.status = 'Completed'
      setOrders(temp)
      setLoading(false)
      alert('Order has been marked as completed!')
    } catch (err) {
      console.log(err)
    }
  }

  const markCancel = (_id) => async (e) => {
    try {
      setLoading(true)
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_LINK}/order/markOrder`,
        { _id, status: 'Canceled' },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      let temp = [...orders]
      var tempStatus = temp.find((e) => e._id === _id)
      tempStatus.status = 'Canceled'
      setOrders(temp)
      setLoading(false)
      alert('Order has been marked as canceled!')
    } catch (err) {
      console.log(err)
    }
  }

  const sortOptions = [
    { key: 'date-added', value: 'date-added', text: 'Date added' },
  ]

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
      </div>
      <table className="bg-white w-full mt-5">
        <tr className="text-sm text-left text-gray-400 border-b border-gray-400">
          <th className="uppercase p-3 px-5">Order id</th>
          <th className="uppercase p-3 px-5">ordered date</th>
          <th className="uppercase p-3 px-5">detail</th>
          <th className="uppercase p-3 px-5">total ($)</th>
          <th className="uppercase p-3 px-5">status</th>
          <th className="uppercase p-3 px-5"></th>
        </tr>
        {ordersRender(orders, markCancel, markComplete)}
      </table>
    </section>
  )
}

export default Orders
