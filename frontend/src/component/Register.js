import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import CredentialButton from './CredentialButton'
import CloseButton from './CloseButton/CloseButton'
import CredentialInputBox from './CredentialInputBox'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

const Register = () => {
  //Create hook states for input fields
  const formHook = useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const closeHandler = (e) => {
    e.preventDefault()
    alert('Closed')
  }
  // Submit the form
  const submitHandler = async (user) => {
    try {
      console.log(user)
      dispatch({ type: 'REGISTER_REQUEST' })
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/user/signUp`,
        user
      )
      dispatch({ type: 'REGISTER_SUCCESS' })
      alert('Register successfully. Please verify your email')
      history.push('/login')
    } catch (err) {
      dispatch({ type: 'REGISTER_FAIL' })
      console.log(err.response.data)
    }
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
            <CredentialInputBox
              form={formHook}
              name="name"
              label="Name"
              validator={{
                required: true,
              }}
              errorMessage="Name cannot be blank"
            />
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
