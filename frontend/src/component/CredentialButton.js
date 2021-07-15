import React from 'react'

const CredentialButton = (props) => {
  const { name } = props
  return (
    <button className="my-10 bg-gray-400 p-2 text-white text-center">
      {name}
    </button>
  )
}

export default CredentialButton
