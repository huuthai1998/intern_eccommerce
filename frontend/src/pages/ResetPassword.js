import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import '../styles/ResetPassword.css'
import CredentialInputBox from 'component/CredentialInputBox'

const ResetPassword = () => {
  //Create hook states for input fields
  const history = useHistory()
  const formHook = useForm()
  const { token } = useParams()

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
    if (user.password !== user.confirmation)
      alert('Password confirmation does not match')
    else {
      const { data } = await axios.put(
        `http://localhost:5000/user/resetPassword/${token}`,
        user
      )
      alert('You have successfully reset your password')
      history.push('/login')
    }

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
          onSubmit={formHook.handleSubmit(submitHandler)}
          className="shadow-2xl bg-white rounded-md px-10 md:px-16 flex flex-col text-lg font-normal"
        >
          <h1 className="text-center py-8  font-semibold text-2xl">
            Reset Password
          </h1>
          <CredentialInputBox
            form={formHook}
            name="password"
            label="password"
            type="password"
          />
          <CredentialInputBox
            form={formHook}
            name="confirmation"
            label="confirmation"
            type="password"
          />
          <button className="my-10 bg-yellow-600  p-2 rounded-md text-gray-200 text-center">
            Reset My Password
          </button>
        </form>
      </main>
    </div>
  )
}

export default ResetPassword
