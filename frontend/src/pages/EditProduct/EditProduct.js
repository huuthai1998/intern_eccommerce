import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import * as firebase from 'firebase'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const EditProduct = () => {
  const { id } = useParams()
  const { user } = useSelector((i) => i)
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})

  const history = useHistory()

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/product/get/${id}`
      )
      let temp = data.categories.map((e) => {
        return e.name
      })
      setProduct({ ...data, categories: temp })
      setLoading(false)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  const storageRef = firebase.storage().ref()
  const fetchCategory = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getSub`
    )
    setCategory(data)
  }

  let formHook = useForm()

  useEffect(() => {
    fetchData()
    fetchCategory()
    return () => {
      setCategory([])
    }
  }, [])

  // Submit the form
  const submitHandler = async (product) => {
    console.log(product)
    // setLoading(true)
    var tempUrl = []
    try {
      if (product.photos) {
        for (let i = 0; i < product.photos.length; i++) {
          let element = product.photos[i]
          if (element !== undefined) {
            console.log(element)
            var fileRef = storageRef.child(`Product/${element.name}`)
            var upload = await fileRef.put(element)
            tempUrl.push(await upload.ref.getDownloadURL())
          }
        }
        product.photos = tempUrl
      }
      product['id'] = id
      console.log(product)
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_LINK}/product/editProduct`,
        { product },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      setLoading(false)
      alert('Product has been added!')
      // history.push('/seller-products')
    } catch (err) {
      console.log(err)
    }
  }
  if (!loading)
    return (
      <div className="bg-gray-300 h-full w-full justify-center">
        <h1 className="pl-8 text-lg pb-2">Products / Add product</h1>
        <form
          onSubmit={formHook.handleSubmit(submitHandler)}
          className="ui form mini rounded-md px-10 flex flex-col text-lg font-normal"
        >
          <ProductInputBox
            form={formHook}
            name="photos"
            label="photos"
            type="photos"
            photos={product.photos}
          />
          <ProductInputBox
            form={formHook}
            name="name"
            label="name"
            defaultValue={product.name}
          />
          <ProductInputBox
            form={formHook}
            name="categories"
            label="categories"
            type="dropdown"
            options={category}
            defaultValue={product.categories}
          />
          <ProductInputBox
            form={formHook}
            name="brand"
            label="brand"
            type="single-drop"
            options={['Adidas', 'Nike', 'Zara', 'Uniqlo', 'H&M', 'Routine']}
            defaultValue={product.brand}
          />
          <ProductInputBox
            form={formHook}
            name="price"
            label="price ($)"
            type="number"
            defaultValue={product.price}
          />
          <ProductInputBox
            form={formHook}
            name="size"
            label="size"
            type="dropdown"
            options={['S', 'M', 'L']}
            defaultValue={product.size}
          />
          <ProductInputBox
            form={formHook}
            name="colors"
            label="colors"
            type="dropdown"
            options={[
              'Blue',
              'Brown',
              'White',
              'Black',
              'Yellow',
              'Green',
              'Red',
            ]}
            defaultValue={product.colors}
          />
          <ProductInputBox
            form={formHook}
            name="quantity"
            label="quantity"
            type="number"
            defaultValue={product.quantity}
          />
          <ProductInputBox
            form={formHook}
            name="description"
            label="description"
            type="textarea"
            defaultValue={product.description}
          />
          <div className="pt-8 flex justify-end space-x-4">
            <Link
              to="/seller-products"
              style={{ color: '#ffa15f' }}
              className="w-32 bg-white p-2 text-white text-center orange"
            >
              Cancel
            </Link>
            <button
              style={{ backgroundColor: '#ffa15f' }}
              className="w-32 p-2 text-white text-center orange"
            >
              Complete
            </button>
          </div>
        </form>
      </div>
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

export default EditProduct
