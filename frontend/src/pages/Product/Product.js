import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import './Product.css'

const thumbnailRender = (product, thumbnailClickHandler) => {
  if (product.photos) {
    return product.photos.map((e) => {
      return (
        <img
          onClick={thumbnailClickHandler(e)}
          key={e}
          src={e}
          alt="thumbnail of the product"
          className="cursor-pointer"
        />
      )
    })
  }
}

const Product = (props) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [image, setImage] = useState('')
  const { register, setValue } = useForm()

  const onChangeHandler = (e, { name, value }) => {
    setValue(name.toLowerCase(), value)
  }

  const colorRender = () => {
    if (product.colors) {
      let opt = []
      product.colors.forEach((item) => {
        var result = {}
        result['key'] = item.toLowerCase()
        result['text'] = item
        result['value'] = item.toLowerCase()
        opt.push(result)
      })
      return (
        <Dropdown
          onChange={onChangeHandler}
          className="w-16"
          fluid
          size="small"
          name="color"
          selection
          options={opt}
        />
      )
    }
  }

  const sizeButton = (size) => {
    return (
      <div className="">
        <label className="cursor-pointer text-sm" htmlFor={size}>
          {size}
        </label>
        <input
          {...register('size')}
          type="radio"
          id={size}
          name="size"
          value={size}
          className="cursor-pointer"
        />
      </div>
    )
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/product/get/${id}`
      )
      console.log(data)
      setProduct(data)
      setLoading(false)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  useEffect(() => {
    if (product.photos) setImage(product.photos[0])
  }, [product])

  const thumbnailClickHandler = (img) => (e) => {
    setImage(img)
  }
  return (
    <main className="min-h-screen">
      <section className="flex info-section px-32">
        <div className="grid thumbnail-grid w-32 space-y-3 mr-4">
          {thumbnailRender(product, thumbnailClickHandler)}
        </div>
        <img src={image} alt="product" className="mx-4" />
        <div className="">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <h3 className=" text-lg">${product.price}</h3>
          <h3 className=" text-lg">{`${product.numReviews} review`}</h3>
          <form className="">
            <p className="">Size</p>
            <div className="flex">
              {sizeButton('S')}
              {sizeButton('M')}
              {sizeButton('L')}
            </div>
            <label htmlFor="colors" className="text-sm">
              Color
            </label>
            {colorRender()}
            <div className="flex">
              <label htmlFor="quantity" className="text-sm">
                Quantity
              </label>
              <input type="number" className="ml-5 border border-black" />
            </div>
            <button className="mt-3 text-center p-2 text-white bg-blue-600">
              Add to cart
            </button>
            <p className="border-t border-gray-600 mt-4">
              {product.description}
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Product