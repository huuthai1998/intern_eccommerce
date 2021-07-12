import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
  //Create hook states for input fields
  const { register, handleSubmit } = useForm()

  // Create ref for password input and confirmation input
  const passwordBox = useRef(null)
  //Toggle function for hide/show password
  const passwordToggle = (e) => {
    e.preventDefault()
    if (passwordBox.current.type === 'text')
      passwordBox.current.type = 'password'
    else passwordBox.current.type = 'text'
  }

  // Submit the form
  const submitHandler = async (d) => {
    console.log(d)
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
          <h1 className="text-center py-8  font-semibold text-2xl">Register</h1>
          <label htmlFor="username" className="text-lg font-normal">
            NAME
          </label>
          <input
            {...register('username')}
            name="username"
            type="text"
            required
            placeholder="Enter your name..."
            className="mb-4 border border-gray-400 px-4 py-2 rounded-md"
          />
          {/* {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )} */}
          <label htmlFor="username" className="text-lg font-normal">
            E-MAIL
          </label>
          <input
            {...register('name')}
            type="text"
            required
            placeholder="Enter your email..."
            className="mb-4 border border-gray-400 px-4 py-2 rounded-md"
          />
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
          <button className="my-10 bg-green-400 p-2 rounded-md text-gray-200 text-center">
            Đăng ký
          </button>
        </form>
      </main>
    </div>
  )
}

export default Register
