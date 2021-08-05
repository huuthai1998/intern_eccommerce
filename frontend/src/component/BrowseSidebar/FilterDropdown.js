import axios from 'axios'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import './FilterDropdown.css'

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

const FilterDropdown = ({
  name,
  options,
  form,
  sizeOpt,
  colorClickHandler,
}) => {
  const { register } = form
  const [drop, setDrop] = useState(false)
  const sRef = useRef(null)
  const mRef = useRef(null)
  const lRef = useRef(null)
  const [refArr, setRefArr] = useState([sRef, mRef, lRef])
  const [checkedState, setCheckedState] = useState([false, false, false])
  const onClickHandler = () => {
    setDrop(!drop)
  }

  const colorRender = (colors, colorClickHandler) => {
    return colors.map((item) => {
      const color = colorHandler(item)
      return (
        <div
          key={item}
          style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
          className={`w-8 cursor-pointer ${color}`}
          onClick={colorClickHandler(item)}
        >
          <i className="fas fa-circle fa-2x"></i>
        </div>
      )
    })
  }

  const sizeHandler = (ref, idx, value) => (e) => {
    e.preventDefault()
    form.setValue(name.toLowerCase(), value)
    ref.current.checked = !ref.current.checked
    if (!ref.current.checked) form.setValue(name.toLowerCase(), undefined)
    let temp = [...checkedState]
    temp.forEach((ele, i) => {
      if (i !== idx) temp[i] = false
      else temp[i] = !temp[i]
    })
    setCheckedState([...temp])
  }

  const sizeButton = (size, idx, ref) => {
    return (
      <div className="" key={size}>
        <input
          {...register(name.toLowerCase())}
          type="radio"
          id={size}
          name={name.toLowerCase()}
          value={size}
          className="cursor-pointer"
          ref={ref}
          hidden
        />
        <button
          onClick={sizeHandler(ref, idx, size)}
          className={`text-regular text-center items-center cursor-pointer border border-black orangeHover hover:text-white ${
            checkedState[idx] && `orange text-white`
          }`}
        >
          {size}
        </button>
      </div>
    )
  }
  const sizeRender = (sizes) => {
    return (
      <div className="flex justify-between items-center mb-2">
        {sizes.map((e, i) => {
          return sizeButton(e, i, refArr[i])
        })}
      </div>
    )
  }

  const availabilityRender = (field, value) => {
    return (
      <span
        style={{
          backgroundColor: '#fafafa',
          padding: '6px 5px 5px 10px',
          color: '#ffa15f',
        }}
        className="p-1 flex justify-between items-center"
      >
        <label className="cursor-pointer" htmlFor={name.toLowerCase()}>
          {field}
        </label>
        <input
          {...register(name.toLowerCase())}
          type="radio"
          id={value}
          name={name.toLowerCase()}
          value={value}
          className="cursor-pointer"
        />
      </span>
    )
  }

  const onChangeHandler = (e, { name, value }) => {
    form.setValue(name.toLowerCase(), value)
  }

  switch (name) {
    //Product size
    case 'size':
      return <div className="">{sizeRender(sizeOpt)}</div>
    case 'Size':
      return (
        <div className="relative border-b  pb-2 mb-2 borderLight">
          <span
            className="cursor-pointer flex justify-between items-center text-regular"
            onClick={onClickHandler}
          >
            {name}
            <i
              className={`text-gray-500 text-sm fas fa-chevron-${
                drop ? 'up' : 'down'
              }`}
            ></i>
          </span>
          {drop && (
            <div className="border-t mt-3 borderLight border-dashed dashed">
              {sizeRender(sizeOpt)}
            </div>
          )}
        </div>
      )
    case 'Available':
      return (
        <div className="relative  border-b pb-2 mb-2 borderLight">
          <span
            className="cursor-pointer flex justify-between items-center text-regular"
            onClick={onClickHandler}
          >
            {name}
            <i
              className={`text-gray-500 text-sm fas fa-chevron-${
                drop ? 'up' : 'down'
              }`}
            ></i>
          </span>
          {drop && (
            <div className="space-y-2 border-t mt-3 borderLight border-dashed dashed">
              {availabilityRender('In-store', 'available')}
              {availabilityRender('Out of stock', 'unavailable')}
            </div>
          )}
        </div>
      )
    case 'Color':
      return (
        <div className="relative  border-b pb-2 mb-2 borderLight">
          <span
            className="cursor-pointer flex justify-between items-center text-regular"
            onClick={onClickHandler}
          >
            {name}
            <i
              className={`text-gray-500 text-sm fas fa-chevron-${
                drop ? 'up' : 'down'
              }`}
            ></i>
          </span>
          {drop && (
            <div className="flex flex-wrap border-t mt-3 borderLight border-dashed dashed">
              {colorRender(options, colorClickHandler)}
            </div>
          )}
        </div>
      )
    default:
      let opt = []
      options.forEach((item) => {
        var result = {}
        result['key'] = item.toLowerCase()
        result['text'] = item
        if (name === 'Color') result['value'] = item
        else result['value'] = item.toLowerCase()
        if (item === 'All') result['value'] = undefined
        opt.push(result)
      })
      return (
        <div className="relative  border-b pb-2 mb-2 borderLight">
          <span
            className="cursor-pointer flex justify-between items-center text-regular"
            onClick={onClickHandler}
          >
            {name}
            <i
              className={`text-gray-500 text-sm fas fa-chevron-${
                drop ? 'up' : 'down'
              }`}
            ></i>
          </span>
          {drop && (
            <div className="p-2 space-y-2 border-t mt-3 borderLight border-dashed dashed">
              <Dropdown
                onChange={onChangeHandler}
                className="w-full"
                fluid
                size="small"
                name={name}
                selection
                options={opt}
              />
            </div>
          )}
        </div>
      )
  }
}

export default FilterDropdown
