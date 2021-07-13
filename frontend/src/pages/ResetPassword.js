import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const ResetPassword = () => {
  //Create hook states for input fields
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const { token } = useParams()
  // Create ref for password input and confirmation input
  const passwordBox = useRef(null)
  const confirmationBox = useRef(null)
  //Toggle function for hide/show password
  const passwordToggle = (e) => {
    e.preventDefault()
    if (passwordBox.current.type === 'text')
      passwordBox.current.type = 'password'
    else passwordBox.current.type = 'text'
  }

  const confirmationToggle = (e) => {
    e.preventDefault()
    if (confirmationBox.current.type === 'text')
      confirmationBox.current.type = 'password'
    else confirmationBox.current.type = 'text'
  }

  useEffect(() => {
    //Verify token with the server. If token is invalid, redirect to the main page
    axios
      .get(`http://localhost:5000/user/verifyToken/${token}`)
      .then((res) => console.log(res))
      .catch((err) => history.push('/'))
  }, [])

  // Submit the form
  const submitHandler = async (user) => {
    console.log(user)
    axios.post(`http://localhost:5000/user/verifyToken/${token}`, user)
    // try {
    //   handleSubmit()
    // } catch (err) {
    //   console.log(err)
    // } finally {
    // }
  }

  //   // Catch event button enter is pressed to submit
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') handleSubmit(submitHandler)
  //   }

  return (
    <div className="bg-gray-400 h-screen flex justify-center pt-24">
      <main className="w-2/3 xl:w-1/3 ">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="shadow-2xl bg-white rounded-md px-10 md:px-16 flex flex-col text-lg font-normal"
        >
          <h1 className="text-center py-8  font-semibold text-2xl">
            Reset Password
          </h1>
          <div className="">
            <label htmlFor="password" className="text-lg font-normal">
              PASSWORD
            </label>
            <div className="flex relative">
              <input
                {...register('password')}
                ref={passwordBox}
                name="password"
                required
                type="password"
                placeholder="Enter your password..."
                className="mb-4 w-full border border-gray-400 px-4 py-2 rounded-md"
              />
              <button
                tabIndex="-1"
                className="absolute show-password-button focus:outline-none"
                onClick={passwordToggle}
              >
                <i className="far fa-eye"></i>
              </button>
            </div>
            {/* {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )} */}
          </div>
          <div className="">
            <label htmlFor="password" className="text-lg font-normal">
              PASSWORD
            </label>
            <div className="flex relative">
              <input
                {...register('confirmation')}
                ref={confirmationBox}
                name="confirmation"
                required
                type="password"
                placeholder="Enter your password again..."
                className="mb-4 w-full border border-gray-400 px-4 py-2 rounded-md"
              />
              <button
                tabIndex="-1"
                className="absolute show-password-button focus:outline-none"
                onClick={confirmationToggle}
              >
                <i className="far fa-eye"></i>
              </button>
            </div>
            {/* {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )} */}
          </div>
          <button className="my-10 bg-green-400 p-2 rounded-md text-gray-200 text-center">
            Reset My Password
          </button>
        </form>
      </main>
    </div>
  )
}

export default ResetPassword
