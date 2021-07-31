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
    <div className="text-center py-4 text-base">{`${
      category.parent && category.parent.name
    } / ${name}`}</div>
  )
}

export default TitleHeader
