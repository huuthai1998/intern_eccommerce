import React from 'react'

const CredentialButton = (props) => {
  const { name } = props
  return (
    <button
      style={{ backgroundColor: '#ffa15f' }}
      className="my-10 p-2 text-white text-center orange"
    >
      {name}
    </button>
  )
}

export default CredentialButton
