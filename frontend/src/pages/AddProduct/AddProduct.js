import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import CredentialButton from 'component/CredentialButton'
import * as firebase from 'firebase'

const AddProduct = () => {
  const { user } = useSelector((i) => i)
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const storageRef = firebase.storage().ref()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/category/getAll')
      setCategory(data)
    }
    fetchData()
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
        'http://localhost:5000/product/createProduct',
        { product },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )

      alert('Product has been added!')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-400 h-screen  justify-center pt-2">
      <h1 className="font-semibold text-2xl">ADD PRODUCT</h1>
      <form
        onSubmit={formHook.handleSubmit(submitHandler)}
        className="shadow-2xl rounded-md px-10 md:px-16 flex flex-col text-lg font-normal"
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
          options={['S', 'M', 'L', 'XL']}
        />
        <ProductInputBox
          form={formHook}
          name="colors"
          label="colors"
          type="dropdown"
          options={['Blue', 'Brown', 'White', 'Black']}
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
        <CredentialButton name="Complete" />
      </form>
    </div>
  )
}

export default AddProduct
