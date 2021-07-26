import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import './Browse.css'

const productsRender = (products) => {
  return products.map((e, i) => {
    return (
      <Link
        to={`/product/${e._id}`}
        className="flex flex-col w-64 product"
        key={e._idx}
      >
        <img src={e.photos[0]} alt="product" className="h-full object-cover	" />
        <h6 className="">{e.name}</h6>
        <p className="cursor-pointer text-gray-400 text-sm">${e.price}</p>
      </Link>
    )
  })
}

const Browse = (props) => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [limitPage, setLimitPage] = useState(2)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const { filter } = useSelector((i) => i)
  const dispatch = useDispatch()

  const fetchData = async (current, limit) => {
    limit = limit ? limit : 2
    setLoading(true)
    console.log(filter)
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_LINK}/product/getByCategory`,
      { ...filter, category, limit, skip: current }
    )
    console.log(data)
    setProducts(data.products)
    setTotal(data.count)
    const dataPage = isNaN(data.count / limit)
      ? 1
      : Math.ceil(data.count / limit)
    setTotalPage(dataPage)
    setLoading(false)
  }

  const backHandler = () => {
    setCurrentPage(currentPage - 1)
    dispatch({
      type: 'ADD_FILTER',
      data: { skip: currentPage - 1, limit: limitPage, category },
    })
  }

  const nextHandler = () => {
    setCurrentPage(currentPage + 1)
    dispatch({
      type: 'ADD_FILTER',
      data: { skip: currentPage + 1, limit: limitPage, category },
    })
  }
  useEffect(() => {
    fetchData(filter.skip, filter.limit)
    console.log('AYYY')
    return () => {}
  }, [category, filter])

  const setLimitHandler = (i) => (e) => {
    setLimitPage(i)
    setCurrentPage(0)
    setTotalPage(Math.ceil(total / i))
    dispatch({
      type: 'ADD_FILTER',
      data: { skip: 0, limit: i, category },
    })
  }
  return (
    <section className="w-full px-4">
      <h2 className="text-center"> {category}</h2>
      <span className="span text-right flex justify-end">
        <button
          onClick={backHandler}
          className="font-extrabold"
          disabled={currentPage === 0}
        >
          {' '}
          {'<'}{' '}
        </button>{' '}
        <p className="px-4">{` ${currentPage + 1} / ${totalPage} `}</p>
        <button
          onClick={nextHandler}
          className="font-extrabold"
          disabled={currentPage === totalPage - 1}
        >
          {' '}
          {'>'}{' '}
        </button>
      </span>
      {loading ? (
        <Segment>
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        </Segment>
      ) : (
        <div className="flex-wrap	flex space-x-4">
          {productsRender(products)}
        </div>
      )}
      <div className="mt-10 flex space-x-4">
        <p className="">Products per page:</p>
        <p className="cursor-pointer" onClick={setLimitHandler(2)}>
          2
        </p>
        <p className="cursor-pointer" onClick={setLimitHandler(5)}>
          5
        </p>
        <p className="cursor-pointer" onClick={setLimitHandler(10)}>
          10
        </p>
      </div>
    </section>
  )
}
export default Browse
