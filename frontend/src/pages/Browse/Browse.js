import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Dimmer,
  Loader,
  Segment,
  Dropdown,
  Header,
  Icon,
} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import './Browse.css'

const sorOptions = [
  {
    key: 'popularity',
    text: 'Popularity',
    value: 'popularity',
    content: 'Popularity',
  },
  {
    key: 'Name: A-Z',
    text: 'Name: A-Z',
    value: 'nameAsc',
    content: 'Name: A-Z',
  },
  {
    key: 'Price: lowest to highest',
    text: 'Price: lowest to highest',
    value: 'priceAsc',
    content: 'Price: lowest to highest',
  },
  {
    key: 'Price: highest to lowest',
    text: 'Price: highest to lowest',
    value: 'priceDesc',
    content: 'Price: highest to lowest',
  },
]

const productsRender = (products) => {
  return products.map((e, i) => {
    return (
      <Link
        to={`/product/${e._id}`}
        className="flex flex-col w-64 product"
        key={i}
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
    setCurrentPage(0)
    fetchData(filter.skip, filter.limit)
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

  const sortOnChangeHandler = (e, { value }) => {
    dispatch({
      type: 'ADD_FILTER',
      data: { sort: value },
    })
  }

  const SortByDropDown = () => (
    <div
      style={{ backgroundColor: '#b7b7b7' }}
      className="ui form small border border-gray-400 w-72 p-1 px-3"
    >
      <Header as="h4" size="small" className="border border-gray-400">
        <Header.Content>
          Sort By:
          <Dropdown
            inline
            onChange={sortOnChangeHandler}
            options={sorOptions}
            defaultValue={sorOptions[0].value}
            className="ml-2"
          />
        </Header.Content>
      </Header>
    </div>
  )

  return (
    <section className="w-full px-4">
      <h2 className="text-center"> {category}</h2>
      <div className="flex justify-between">
        {SortByDropDown()}
        <span className="span text-right flex justify-end items-center">
          <button
            onClick={backHandler}
            className="font-extrabold items-center text-center"
            disabled={currentPage === 0}
          >
            {' '}
            {'<'}{' '}
          </button>{' '}
          <p className="px-4 items-center text-center">{` ${
            currentPage + 1
          } / ${totalPage} `}</p>
          <button
            onClick={nextHandler}
            className="font-extrabold"
            disabled={currentPage === totalPage - 1}
          >
            {' '}
            {'>'}{' '}
          </button>
        </span>
      </div>
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
