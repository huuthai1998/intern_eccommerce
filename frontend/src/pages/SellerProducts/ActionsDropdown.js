import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './SellerProducts.css'

const ActionsDropdown = ({
  name,
  _id,
  deleteHandler,
  markCancel,
  markComplete,
}) => {
  const history = useHistory()
  const [drop, setDrop] = useState(false)
  const onClickHandler = (e) => {
    e.preventDefault()
    setDrop(!drop)
  }

  const editHandler = () => {
    history.push(`/edit-product/${_id}`)
  }

  if (name)
    return (
      <td className="p-1 px-5 relative text-right">
        <button className="ml-1" onClick={onClickHandler}>
          Actions <i className="text-gray-400 fas fa-caret-down"></i>
        </button>
        {drop && (
          <div className="right-0 space-y-2 z-50 absolute flex flex-col text-left items-start bg-white p-1">
            <button
              className="prod-name ml-1 items-center text-sm"
              onClick={markComplete(_id)}
            >
              <span className="text-green-400 font-bold text-2xl items-center mr-2">
                &bull;
              </span>
              Mark as Completed
            </button>
            <button
              className="ml-1 items-center text-sm"
              onClick={markCancel(_id)}
            >
              <span className="text-red-400 font-bold text-2xl items-center mr-2">
                &bull;
              </span>
              Mark as Canceled
            </button>
          </div>
        )}
      </td>
    )
  else
    return (
      <td className="p-1 px-5 relative text-right">
        <button className="ml-1  prod-name" onClick={onClickHandler}>
          Actions <i className="text-gray-400 fas fa-caret-down"></i>
        </button>
        {drop && (
          <div className="right-0 space-y-4 z-50 absolute flex flex-col text-left items-start bg-white p-2">
            <button className="ml-1" onClick={editHandler}>
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
