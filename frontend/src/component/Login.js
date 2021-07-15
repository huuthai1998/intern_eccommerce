import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import CredentialButton from './CredentialButton'
import CloseButton from './CloseButton/CloseButton'
import CredentialInputBox from './CredentialInputBox'

const Login = () => {
  const history = useHistory()
  //Redux hooks
  const state = useSelector((i) => i)
  const dispatch = useDispatch()
  //Create hook states for input fields
  const formHook = useForm()

  // Create ref for password input and confirmation input
  const passwordBox = useRef(null)
  //Toggle function for hide/show password
  const passwordToggle = (e) => {
    e.preventDefault()
    if (passwordBox.current.type === 'text')
      passwordBox.current.type = 'password'
    else passwordBox.current.type = 'text'
  }

  const closeHandler = (e) => {
    e.preventDefault()
    alert('Closed')
  }
  // Submit the form
  const submitHandler = async (user) => {
    try {
      console.log(user)
      dispatch({ type: 'LOGIN_REQUEST' })
      const { data } = await axios.post(
        'http://localhost:5000/user/signIn',
        user
      )
      Cookies.set('authInfo', JSON.stringify(data))
      dispatch({ type: 'LOGIN_SUCCESS', payload: data })
      console.log(data)
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
      alert(err.response.data)
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
          className="relative shadow-2xl bg-white "
        >
          <CloseButton onClick={closeHandler} />
          <div className="px-10 md:px-16 flex flex-col text-lg font-normal">
            <h1 className="text-center py-8  font-bold text-3xl">Log In</h1>
            <CredentialInputBox form={formHook} name="email" label="E-MAIL" />
            <CredentialInputBox
              form={formHook}
              name="password"
              label="password"
              type="password"
            />
            <div className="flex md:flex-row flex-col mb-5 justify-between">
              <label className="check-container cursor-pointer">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  name="keep-login"
                />
                <span className="checkmark"></span>
                <span className="ml-2">Remember Password</span>
              </label>
              <Link to="/forgot-password" className="font-bold">
                Forgot your password?
              </Link>
            </div>
            <CredentialButton name="Log In" />
          </div>
          <p className="py-4 border-t-2 border-gray-300 text-center">
            Don't have an account?{' '}
            <Link className="text-red-400 underline" to="/register">
              Register
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Login