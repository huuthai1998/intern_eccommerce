import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CredentialButton from './CredentialButton'
import CloseButton from './CloseButton/CloseButton'
import CredentialInputBox from './CredentialInputBox'

const Register = () => {
  //Create hook states for input fields
  const formHook = useForm()

  const closeHandler = (e) => {
    e.preventDefault()
    alert('Closed')
  }
  // Submit the form
  const submitHandler = async (user) => {
    console.log(user)
    // const { data } = await axios.post('http://localhost:5000/user/signUp', user)
    // console.log(data)
    // alert(data)

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
          className="relative shadow-2xl bg-white "
        >
          <CloseButton onClick={closeHandler} />
          <div className="px-10 md:px-16 flex flex-col text-lg font-normal">
            <h1 className="text-center py-8  font-bold text-3xl">Register</h1>
            {/* <label htmlFor="name" className="text-sm font-bold mb-2">
              Name
            </label>
            <input
              {...formHook.register('name')}
              type="text"
              required
              placeholder="Enter your name..."
              className="mb-4 border border-gray-400 px-5 py-3 bg-gray-100 text-base"
            /> */}
            <CredentialInputBox form={formHook} name="name" label="Name" />
            <CredentialInputBox form={formHook} name="email" label="E-MAIL" />
            <CredentialInputBox
              form={formHook}
              name="password"
              label="password"
              type="password"
            />

            <div className="text-center text-base">
              By creating an account you agree to the <br></br>
              <span className="text-red-400 underline cursor-pointer font-bold">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-red-400 underline cursor-pointer font-bold">
                Privacy Policy
              </span>
            </div>
            <CredentialButton name="Register" />
          </div>
          <p className="py-4 border-t-2 border-gray-300 text-center">
            Do you have an account?{' '}
            <Link className="text-red-400 underline" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Register
