import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const ForgotPassword = () => {
  //Create hook states for input fields
  const { register, handleSubmit } = useForm()

  // Submit the form
  const submitHandler = async (email) => {
    axios.post('http://localhost:5000/user/forgotPassword', email)
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

          <label htmlFor="email" className="text-lg font-normal">
            E-MAIL
          </label>
          <input
            {...register('email')}
            type="text"
            required
            placeholder="Enter your email..."
            className="mb-4 border border-gray-400 px-4 py-2 rounded-md"
          />

          <button className="my-10 bg-green-400 p-2 rounded-md text-gray-200 text-center">
            Send Email
          </button>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
