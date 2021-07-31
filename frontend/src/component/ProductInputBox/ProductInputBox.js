import React, { useEffect, useRef, useState } from 'react'
import './ProductInputBox.css'
import { Button, Dropdown, Input, TextArea } from 'semantic-ui-react'
import CloseButton from 'component/CloseButton/CloseButton'

const ProductInputBox = (props) => {
  const [imageSrc, setImageSrc] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
  ])
  const [image, setImage] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
  ])
  const [loading, setLoading] = useState(false)
  const photo1 = useRef(null)
  const photo2 = useRef(null)
  const photo3 = useRef(null)
  const photo4 = useRef(null)

  let {
    form,
    name,
    label,
    type,
    validator,
    errorMessage,
    err,
    options,
    defaultValue,
    photos,
  } = props

  useEffect(() => {
    if (photos) {
      var temp = [...imageSrc]
      photos.forEach((e, i) => {
        temp[i] = e
      })
      setImageSrc(temp)
    }
  }, [])

  const {
    register,
    formState: { errors },
  } = form
  validator = validator === undefined ? {} : validator
  const onChangeHandler = (e, { name, value }) => {
    form.setValue(name, value)
  }

  const selectFileHandler = (idx) => (e) => {
    let temp = [...image]
    let tempSrc = [...imageSrc]
    temp[idx] = e.target.files[0]
    tempSrc[idx] = URL.createObjectURL(e.target.files[0])
    setImage(temp)
    setImageSrc(tempSrc)
    form.setValue(`photos`, temp)
  }

  const removeImage = (idx) => (e) => {
    e.preventDefault()
    let temp = [...image]
    let tempSrc = [...imageSrc]
    temp[idx] = undefined
    tempSrc[idx] = undefined
    setImage(temp)
    setImageSrc(tempSrc)
  }

  const InputFileHandler = (ref) => (e) => {
    e.preventDefault()
    ref.current.click()
  }

  const photoCard = (ref, idx) => {
    return (
      <div className="bg-gray-100 h-64 relative">
        {imageSrc[idx] !== undefined ? (
          <div className="flex justify-center relative">
            <img
              src={imageSrc[idx]}
              alt="previewUpload"
              className="h-64 w-full object-cover"
            />
            <CloseButton onClick={removeImage(idx)} />
          </div>
        ) : (
          <div className="text-center absolute add-photo-button text-gray-400">
            <Button
              variant="contained"
              component="label"
              onClick={InputFileHandler(ref)}
            >
              <div className="font-sm mx-auto flex justify-center text-center rounded-full w-6 h-6 text-xl font-bold text-white bg-gray-400">
                <h2 className="">+</h2>
              </div>
              <p className="">Add photo</p>
            </Button>
            <input
              onChange={selectFileHandler(idx)}
              type="file"
              hidden
              ref={ref}
            />
          </div>
        )}
      </div>
    )
  }

  const photosHandler = () => {
    return (
      <div className="space-x-4 mt-2 grid product-box-wrap text-right items-center">
        <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
          {label}
        </label>
        <div className="grid photos-grid">
          {photoCard(photo1, 0)}
          {photoCard(photo2, 1)}
          {photoCard(photo3, 2)}
          {photoCard(photo4, 3)}
        </div>
        {errors[name] && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  }

  const singleDropDown = () => {
    let opt = []
    options.forEach((item) => {
      var result = {}
      if (typeof item !== 'object') {
        result['key'] = item.toLowerCase()
        result['text'] = item
        result['value'] = item.toLowerCase()
      } else {
        result['key'] = item.name.toLowerCase()
        result['text'] = item.name
        result['value'] = item.name
      }
      opt.push(result)
    })
    return (
      <div className="pr-4 space-x-4 mt-2 grid product-box-wrap text-right items-center w-full">
        <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
          {label}
        </label>
        <Dropdown
          onChange={onChangeHandler}
          className="w-full"
          fluid
          size="small"
          name={name}
          selection
          options={opt}
          defaultValue={defaultValue}
        />

        {errors[name] && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  }

  const dropDownRender = () => {
    let opt = []
    if (typeof options[0] !== 'string')
      options.forEach((item) => {
        var result = {}
        result['key'] = item.name.toLowerCase()
        result['text'] = item.name
        result['value'] = item.name
        opt.push(result)
      })
    else
      options.forEach((item) => {
        var result = {}
        result['key'] = item.toLowerCase()
        result['text'] = item
        result['value'] = item
        opt.push(result)
      })
    return (
      <div className="pr-4  space-x-4 mt-2 grid product-box-wrap text-right items-center w-full">
        <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
          {label}
        </label>
        <Dropdown
          onChange={onChangeHandler}
          className=" w-full"
          fluid
          size="mini"
          name={name}
          multiple
          selection
          options={opt}
          defaultValue={defaultValue}
        />

        {errors[name] && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  }

  switch (type) {
    case 'photos':
      return photosHandler()
    case 'single-drop':
      return singleDropDown()
    case 'dropdown':
      return dropDownRender()
    case 'textarea':
      return (
        <div className="space-x-4 mt-2 grid product-box-wrap text-right items-center">
          <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
            {label}
          </label>
          <TextArea
            name={name}
            {...register(name, validator)}
            type={type ? type : 'text'}
            required
            placeholder={`Enter your ${name}...`}
            defaultValue={defaultValue}
          />
          {errors[name] && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )
    default:
      return (
        <div className="space-x-4 mt-2 grid product-box-wrap text-right items-center">
          <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
            {label}
          </label>
          <Input
            name={name}
            {...register(name, validator)}
            type={type ? type : 'text'}
            required
            placeholder={`Enter your ${name}...`}
            defaultValue={defaultValue}
          />
          {errors[name] && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )
  }
}

export default ProductInputBox
