import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CredentialInputBox from './CredentialInputBox'
import CredentialButton from './CredentialButton'

const ForgotPassword = () => {
  //Create hook states for input fields
  const formHook = useForm()

  const [isSubmitted, setIsSubmitted] = useState(false)
  // Submit the form
  const submitHandler = async (email) => {
    try {
      axios.post('http://localhost:5000/user/forgotPassword', email)
      setIsSubmitted(true)
    } catch (err) {
      console.log(err)
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
  if (!isSubmitted)
    return (
      <div className="bg-gray-400 h-screen flex justify-center pt-24">
        <main className="w-2/3 xl:w-1/3 ">
          <form
            onSubmit={formHook.handleSubmit(submitHandler)}
            className="shadow-2xl bg-white rounded-md px-10 md:px-16 flex flex-col text-lg font-normal"
          >
            <h1 className="text-center pt-8 pb-1 font-semibold text-2xl">
              Forgot Password
            </h1>
            <p className="text-sm text-center text-gray-500">
              Enter your e-mail address below and we’ll get you back on track.{' '}
            </p>
            <CredentialInputBox
              form={formHook}
              name="email"
              label="E-MAIL"
              errorMessage="Invalid Email Format"
              validator={{
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
            />
            <CredentialButton name="Submit" />

            <p className="py-4 border-t-2 border-black text-center">
              I remember my password now.{' '}
              <Link className="text-red-400 underline" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </main>
      </div>
    )
  else return <div className="">Please check your email</div>
}

export default ForgotPassword
