import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import * as firebase from 'firebase'
import { Link, useHistory } from 'react-router-dom'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const EditProduct = () => {
  const { user } = useSelector((i) => i)
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const storageRef = firebase.storage().ref()
  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getSub`
    )
    setCategory(data)
  }
  useEffect(() => {
    fetchData()
    return () => {
      setCategory([])
    }
  }, [])
  const formHook = useForm()

  // Submit the form
  const submitHandler = async (product) => {
    console.log(product)
    setLoading(true)
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
      console.log(product)
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/product/createProduct`,
        { product },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      setLoading(false)
      alert('Product has been added!')
      history.push('/seller-products')
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
          />
          <ProductInputBox form={formHook} name="name" label="name" />
          <ProductInputBox
            form={formHook}
            name="categories"
            label="categories"
            type="dropdown"
            options={category}
          />
          <ProductInputBox
            form={formHook}
            name="brand"
            label="brand"
            type="single-drop"
            options={['Adidas', 'Nike', 'Zara', 'Uniqlo', 'H&M', 'Routine']}
          />
          <ProductInputBox
            form={formHook}
            name="price"
            label="price ($)"
            type="number"
          />
          <ProductInputBox
            form={formHook}
            name="size"
            label="size"
            type="dropdown"
            options={['S', 'M', 'L']}
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
          />
          <ProductInputBox
            form={formHook}
            name="quantity"
            label="quantity"
            type="number"
          />
          <ProductInputBox
            form={formHook}
            name="description"
            label="description"
            type="textarea"
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
