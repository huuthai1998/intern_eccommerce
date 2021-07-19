import React from 'react'

const TitleForm = (props) => {
  const { name } = props
  return (
    <h1
      style={{ color: '#ffa15f' }}
      className="text-center pt-8 pb-1  font-bold text-3xl"
    >
      {name}
    </h1>
  )
}

export default TitleForm
