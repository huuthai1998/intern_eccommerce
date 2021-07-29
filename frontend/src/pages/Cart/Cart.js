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
    console.log(e.quantity)
    const color = colorHandler(e.color)
    return (
      <tr key={i} className="text-base border-t border-gray-400">
        <td className="flex space-x-3 ">
          <img
            src={e.product.photos[0]}
            alt="product"
            className="productThumbnail object-cover"
          />
          <div className="flex flex-col justify-between">
            <h6 className="text-sm font-bold">{e.product.name}</h6>
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
        <td className=" font-bold">{e.size}</td>
        <td className="">
          <div className="flex border border-gray-400 items-center">
            <button
              className="px-2 font-bold text-lg"
              disabled={e.quantity === 1}
              onClick={changeHandler('DECREMENT_ITEM_CART', e.product._id)}
            >
              {' '}
              -{' '}
            </button>
            <p className="">{e.quantity}</p>
            <button
              className="px-2 font-bold text-lg"
              onClick={changeHandler('INCREMENT_ITEM_CART', e.product._id)}
            >
              {' '}
              +{' '}
            </button>
          </div>
        </td>
        <td className=" font-bold">{`$${e.product.price * e.quantity}`}</td>
      </tr>
    )
  })
}

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
      case 'white':
        return 'text-gray-300'
      case 'red':
        return 'text-ted-400'
      case 'green':
        return 'text-green-500'
      case 'yellow':
        return 'text-yellow-400'
      case 'brown':
        return 'text-brown-400'
      case 'blue':
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
      <section className="min-h-screen p-8 px-40 w-full">
        <h1 className="text-xl">My Bag</h1>
        <div className="flex mt-10 w-full justify-between items-start">
          <table className="flex-grow">
            <tr className="text-sm text-left">
              <th className="text-sm font-bold">Products</th>
              <th className="text-sm  font-bold">Color</th>
              <th className="font-bold">Size</th>
              <th className="font-bold">Quantity</th>
              <th className="font-bold">Amount</th>
            </tr>
            {productsRender(cart, removeFromCart, colorHandler, changeHandler)}
          </table>
          <div className="w-72">
            <p className="font-bold text-sm">Total</p>
            <div className="bg-gray-300 p-3">
              <div className="flex justify-between">
                <p className="">Shipping & Handling</p>
                <p className="">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="">Total product:</p>
                <p className="">{subTotal}</p>
              </div>
              <div className="flex font-bold justify-between border-t border-gray-400">
                <p className="">Subtotal</p>
                <p className="">{subTotal}</p>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="mt-2 p-2 text-white bg-red-500 text-center w-full"
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
