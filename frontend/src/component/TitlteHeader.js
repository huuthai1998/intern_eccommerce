import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TitleHeader = (props) => {
  const { category: name } = useParams()
  const [category, setCategory] = useState({})
  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_LINK}/category/getCategory/${name}`
    )
    setCategory(data)
  }
  useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  return (
    <div
      style={{ margin: '40px 0px' }}
      className="text-center text-regular"
    >{`${category.parent && category.parent.name} / ${name}`}</div>
  )
}

export default TitleHeader
