import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import './Cart.css'

const productsRender = (
  products,
  removeFromCart,
  colorHandler,
  changeHandler
) => {
  console.log(products)
  return products.map((e, i) => {
    const color = colorHandler(e.color)
    return (
      <tr
        style={{ 'border-top': 'solid 0.5px #979797', 'margin-top': '10px' }}
        key={i}
        className=""
      >
        <td style={{ 'padding-top': '9.5px' }} className="flex space-x-3 ">
          <img
            src={e.product.photos[0]}
            alt="product"
            className="productThumbnail object-cover"
          />
          <div className="flex flex-col justify-between">
            <h6 className="Montserrat-Medium">{e.product.name}</h6>
            <div className="flex text-xs text-gray-400 space-x-2">
              <button className="" onClick={removeFromCart(e.product._id)}>
                Remove
              </button>
            </div>
          </div>
        </td>
        <td className={` ${color}`}>
          <i className="fas fa-circle fa-2x"></i>
        </td>
        <td className="Montserrat-Medium">{e.size}</td>
        <td className="">
          <div className="quan-button flex justify-between border border-gray-400 items-center">
            <button
              className="font-bold text-lg px-2"
              disabled={e.quantity === 1}
              onClick={changeHandler('DECREMENT_ITEM_CART', e.product._id)}
            >
              -
            </button>
            <p className="Montserrat-Medium">{e.quantity}</p>
            <button
              className="font-bold text-lg px-2"
              onClick={changeHandler('INCREMENT_ITEM_CART', e.product._id)}
            >
              +
            </button>
          </div>
        </td>
        <td className="Montserrat-Medium">{`${formatter.format(
          e.product.price * e.quantity
        )}`}</td>
      </tr>
    )
  })
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Cart = () => {
  const { user, authenticated, cart, cartNumItems, subTotal } = useSelector(
    (i) => i
  )
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const removeFromCart = (_id) => (e) => {
    dispatch({ type: 'REMOVE_FROM_CART', data: _id })
  }

  const changeHandler = (type, _id) => (e) => {
    dispatch({ type, data: _id })
  }

  const colorHandler = (color) => {
    switch (color) {
      case 'White':
        return 'text-gray-300'
      case 'Red':
        return 'text-red-400'
      case 'Green':
        return 'text-green-500'
      case 'Yellow':
        return 'text-yellow-400'
      case 'Brown':
        return 'brown'
      case 'Blue':
        return 'text-blue-400'
      default:
        return 'text-black'
    }
  }
  const checkoutHandler = async (e) => {
    if (user) {
      try {
        e.preventDefault()
        console.log(cart)
        setLoading(true)
        let items = [...cart]
        items.forEach((e) => {
          e.price = e.product.price
          e.name = e.product.name
          e.product = e.product._id
        })
        console.log(cart)
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_LINK}/order/createOrder`,
          { subTotal, buyer: user._id, items, email: user.email }
        )
        dispatch({ type: 'CLEAR_CART' })
        alert('Order has been placed!')
        history.push('/')
        setLoading(false)
      } catch (err) {
        if (err.response) console.log(err.response.data)
        else console.log(err)
      }
    } else {
      alert('Please log in first')
      history.push('/login')
    }
  }
  if (!loading)
    return (
      <section className="min-h-screen px-40 w-full cart-wrapper">
        <h1 className="My-Bag">My Bag</h1>
        <div className="flex mt-10 w-full justify-between items-start">
          <table style={{ width: '800px' }} className="">
            <colgroup>
              <col span="1" style={{ width: '30%' }} />
              <col span="1" style={{ width: '20%' }} />
              <col span="1" style={{ width: '20%' }} />
              <col span="1" style={{ width: '30%' }} />
              <col span="1" style={{ width: '30%' }} />
            </colgroup>
            <tr className="text-left">
              <th
                style={{ 'font-size': '14px' }}
                className="text-bold text-left"
              >
                Products
              </th>
              <th
                style={{ 'font-size': '14px' }}
                className="text-bold text-left"
              >
                Color
              </th>
              <th
                style={{ 'font-size': '14px' }}
                className="text-bold text-left"
              >
                Size
              </th>
              <th
                style={{ 'font-size': '14px' }}
                className="text-bold text-left"
              >
                Quantity
              </th>
              <th
                style={{ 'font-size': '14px' }}
                className="text-bold text-left"
              >
                Amount
              </th>
            </tr>
            {productsRender(cart, removeFromCart, colorHandler, changeHandler)}
          </table>
          <div className="">
            <p className="text-bold text-left">Total</p>
            <div className="checkout-box Montserrat-Medium">
              <div className="flex justify-between">
                <p className="">Shipping & Handling</p>
                <p className="">Free</p>
              </div>
              <div
                style={{ 'margin-bottom': '15px' }}
                className="flex justify-between"
              >
                <p className="">Total product:</p>
                <p className="">{formatter.format(subTotal)}</p>
              </div>
              <div className="flex font-bold justify-between border-sub">
                <p style={{ 'font-size': '16px' }} className="">
                  Subtotal
                </p>
                <p className="text-bold">{formatter.format(subTotal)}</p>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="text-bold mt-2 p-2 text-white checkout-button text-center w-full"
            >
              Check out
            </button>
          </div>
        </div>
      </section>
    )
  else
    return (
      <Segment>
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      </Segment>
    )
}

export default Cart
