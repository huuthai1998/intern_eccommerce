import axios from 'axios'
import React, { useState } from 'react'

const ActionsDropdown = ({ _id, deleteHandler }) => {
  const [drop, setDrop] = useState(false)
  const onClickHandler = (e) => {
    e.preventDefault()
    setDrop(!drop)
  }
  return (
    <td className="p-1 px-5 relative text-right">
      <button className="ml-1" onClick={onClickHandler}>
        Actions <i className="text-gray-400 fas fa-caret-down"></i>
      </button>
      {drop && (
        <div className="right-0 space-y-4 z-50 absolute flex flex-col text-left items-start bg-white p-2">
          <button className="ml-1">
            <i className="text-gray-400 fas fa-pen mr-2"></i> Edit
          </button>
          <button className="ml-1" onClick={deleteHandler(_id)}>
            <i className="text-gray-400 fas fa-trash mr-2"></i> Remove
          </button>
        </div>
      )}
    </td>
  )
}

export default ActionsDropdown
