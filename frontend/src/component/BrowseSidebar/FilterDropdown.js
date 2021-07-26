import axios from 'axios'
import ProductInputBox from 'component/ProductInputBox/ProductInputBox'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

const FilterDropdown = ({ name, options, form }) => {
  const { register } = form
  const [drop, setDrop] = useState(false)
  // const sRef = useRef(null)
  // const mRef = useRef(null)
  // const lRef = useRef(null)
  const [checkedState, setCheckedState] = useState([false, false, false])
  const onClickHandler = () => {
    setDrop(!drop)
  }

  // const sizeHandler = (ref, idx) => (e) => {
  //   e.preventDefault()
  //   ref.current.checked = !ref.current.checked
  //   let temp = [...checkedState]
  //   temp[idx] = !temp[idx]
  //   setCheckedState([...temp])
  // }

  const sizeButton = (size, idx) => {
    return (
      <div className="">
        <label className="cursor-pointer" htmlFor={size}>
          {size}
        </label>
        <input
          {...register(name.toLowerCase())}
          type="radio"
          id={size}
          name={name.toLowerCase()}
          value={size}
          className="cursor-pointer"
        />
        {/* <button
          onClick={sizeHandler(ref, idx)}
          className={`cursor-pointer border border-black p-3 hover:bg-red-400 hover:text-white ${
            checkedState[idx] && `bg-red-400 text-white`
          }`}
        > */}

        {/* </button> */}
      </div>
    )
  }
  const sizeRender = () => {
    return (
      <div className="flex justify-between py-4">
        {sizeButton('S', 0)}
        {sizeButton('M', 1)}
        {sizeButton('L', 2)}
      </div>
    )
  }

  const availabilityRender = (field, value) => {
    return (
      <span className="p-1 items-center flex justify-between bg-gray-300">
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
    case 'Size':
      return (
        <div className="relative border-b border-gray-400">
          <span
            className="cursor-pointer flex justify-between"
            onClick={onClickHandler}
          >
            {name} <i className={`fas fa-chevron-${drop ? 'up' : 'down'}`}></i>
          </span>
          {drop && (
            <div className="pt-2 border-t border-gray-400 border-dashed">
              {sizeRender()}
            </div>
          )}
        </div>
      )
    case 'Available':
      return (
        <div className="relative">
          <span
            className="cursor-pointer flex justify-between"
            onClick={onClickHandler}
          >
            {name} <i className={`fas fa-chevron-${drop ? 'up' : 'down'}`}></i>
          </span>
          {drop && (
            <div className="p-2 space-y-2 border-t border-gray-400 border-dashed">
              {availabilityRender('In-store', 'available')}
              {availabilityRender('Out of stock', 'unavailable')}
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
        <div className="relative">
          <span
            className="cursor-pointer flex justify-between"
            onClick={onClickHandler}
          >
            {name} <i className={`fas fa-chevron-${drop ? 'up' : 'down'}`}></i>
          </span>
          {drop && (
            <div className="p-2 space-y-2 border-t border-gray-400 border-dashed">
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
