import axios from 'axios'
import FilterDropdown from 'component/BrowseSidebar/FilterDropdown'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Dropdown, Dimmer, Loader, Segment } from 'semantic-ui-react'
import './Product.css'
import star from '../../assets/star.svg'

const thumbnailRender = (product, thumbnailClickHandler) => {
  if (product.photos) {
    return product.photos.map((e) => {
      return (
        <img
          key={e}
          onClick={thumbnailClickHandler(e)}
          src={e}
          alt="thumbnail of the product"
          className="cursor-pointer object-cover w-full thumbnail-img"
        />
      )
    })
  }
}

const sameProductsRender = (products, id) => {
  return products.map((e, i) => {
    if (e._id !== id)
      return (
        <Link to={`/product/${e._id}`} key={e._id}>
          <img
            src={e.photos[0]}
            alt="thumbnail of the product"
            className="cursor-pointer object-cover sameBrandPic"
          />
        </Link>
      )
  })
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

const colorRender = (colors, colorClickHandler) => {
  return colors.map((item) => {
    const color = colorHandler(item)
    return (
      <button
        style={{ 'margin-right': '20px' }}
        className={`w-8 cursor-pointer ${color} focus:border-black focus:border focus:p-2`}
        onClick={colorClickHandler(item)}
      >
        <i className="fas fa-circle fa-2x"></i>
      </button>
    )
  })
}

const Product = (props) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState({})
  const [sameBrandProduct, setSameBrandProduct] = useState([])
  const [image, setImage] = useState('')
  const formHook = useForm()
  const { setValue, handleSubmit } = formHook

  const onChangeHandler = (e, { name, value }) => {
    setValue(name.toLowerCase(), value)
  }

  const addToCartHandler = (data) => {
    console.log(data)
    if (data.size === null || data.size === undefined)
      alert('Please select a size')
    else dispatch({ type: 'ADD_CART', data: { ...data, product, quantity } })
  }

  const colorClickHandler = (value) => (e) => {
    e.preventDefault()
    setValue('color', value)
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/product/get/${id}`
      )
      const { data: sameBrand } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/product/getByBrand/${data.brand}`
      )
      setSameBrandProduct(sameBrand)
      setProduct(data)
      setLoading(false)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  useEffect(() => {
    fetchData()
    return () => {}
  }, [id])

  useEffect(() => {
    if (product.photos) setImage(product.photos[0])
  }, [product])

  const thumbnailClickHandler = (img) => (e) => {
    setImage(img)
  }

  const changeHandler = (type, _id) => (e) => {
    e.preventDefault()
    switch (type) {
      case 'INCREASE':
        setQuantity(quantity + 1)
        break
      case 'DECREASE':
        setQuantity(quantity - 1)
        break
      default:
        break
    }
  }
  if (!loading)
    return (
      <main className="min-h-screen mt-10  px-40">
        {product.categories && (
          <h3 className="text-center mb-10">{`${product.categories[0].parent.name}/ ${product.categories[0].name}/ ${product.name}`}</h3>
        )}
        <section className="flex info-section">
          <div className="grid thumbnail-grid mr-8">
            {thumbnailRender(product, thumbnailClickHandler)}
          </div>
          <div className="flex w-3/4">
            <img
              src={image}
              alt="product"
              className="photo-main object-cover"
            />
            <div className="flex flex-col pl-16">
              <h3 className="prodName">{product.name}</h3>
              <h3 style={{ 'margin-bottom': '13px' }} className="prodPrice">
                {formatter.format(product.price)}
              </h3>
              <div
                className="flex items-center"
                style={{ 'margin-bottom': '26px' }}
              >
                <img src={star} alt="star" className="" />
                <img src={star} alt="star" className="" />
                <img src={star} alt="star" className="" />
                <img src={star} alt="star" className="" />
                <img src={star} alt="star" className="" />
                <div className="Line-4"></div>
                <h3 className="text-regular">{`${product.numReviews} review`}</h3>
              </div>
              {product.sold < product.quantity ? (
                <form className="" onSubmit={handleSubmit(addToCartHandler)}>
                  <p
                    style={{ 'margin-bottom': '9px' }}
                    className="Montserrat-Medium"
                  >
                    Size
                  </p>
                  <div
                    style={{ 'margin-bottom': '28px' }}
                    className="flex space-x-4"
                  >
                    <FilterDropdown
                      form={formHook}
                      name="size"
                      sizeOpt={product.size}
                    />
                  </div>
                  <label htmlFor="colors" className="Montserrat-Medium">
                    Color
                  </label>
                  <div style={{ 'margin-top': '9px' }} className="flex">
                    {colorRender(product.colors, colorClickHandler)}
                  </div>
                  <div
                    style={{ 'margin-top': '28px', 'margin-bottom': '30px' }}
                    className="flex items-center"
                  >
                    <label
                      style={{ 'margin-right': '21px' }}
                      htmlFor="quantity"
                      className="Montserrat-Medium"
                    >
                      Quantity
                    </label>
                    <div className="quan-button flex justify-between border border-gray-400 items-center">
                      <button
                        className="px-2 font-bold text-xl"
                        disabled={quantity === 1}
                        onClick={changeHandler('DECREASE')}
                      >
                        -
                      </button>
                      <p className="Montserrat-Medium">{quantity}</p>
                      <button
                        className="px-2 font-bold text-xl"
                        onClick={changeHandler('INCREASE')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button className="text-regular mt-3 text-center p-2 text-white add-button w-full">
                    Add to cart
                  </button>
                </form>
              ) : (
                <p className="uppercase text-red-500 font-bold">Out of stock</p>
              )}
              <div className="Line-2"></div>
              <p className="text-regular">{product.description}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              style={{ 'margin-left': '121px', width: '100px' }}
              className="flex flex-col"
            >
              <p className="">More from</p>
              <p className="">{product.brand}</p>
              <div className="flex flex-col">
                {sameProductsRender(sameBrandProduct, id)}
              </div>
            </div>
          </div>
        </section>
      </main>
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

export default Product
