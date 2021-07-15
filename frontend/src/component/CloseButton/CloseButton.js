import React from 'react'
import './CloseButton.css'
import X from '../../assets/cross.svg'
const CloseButton = (props) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute close-button text-gray-400 font-extrabold"
    >
      <img src={X} alt="" />
    </button>
  )
}

export default CloseButton
