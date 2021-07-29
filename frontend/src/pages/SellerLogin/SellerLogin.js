import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import CredentialButton from '../../component/CredentialButton'
import CredentialInputBox from '../../component/CredentialInputBox'
import backgroundImg from '../../assets/rectangle-5@2x.png'
import logo from '../../assets/logo-white.svg'
import './SellerLogin.css'
import TitleForm from 'component/TitleForm'

const SellerLogin = () => {
  const [error, setError] = useState('')
  const history = useHistory()
  //Redux hooks
  const dispatch = useDispatch()
  //Create hook states for input fields
  const formHook = useForm()

  // Submit the form
  const submitHandler = async (user) => {
    try {
      console.log(user)
      dispatch({ type: 'LOGIN_REQUEST' })
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/user/signIn`,
        user
      )
      Cookies.set('authInfo', JSON.stringify(data.token))
      dispatch({ type: 'LOGIN_SUCCESS', data })
      console.log(data)
      history.push('/')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' })
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  return (
    <div className="relative">
      <img src={backgroundImg} alt="" className="w-screen h-screen" />
      <img src={logo} alt="" className="absolute top-10 left-10" />
      logo
      <main className="seller-login absolute w-1/2 xl:w-1/4">
        <form
          onSubmit={formHook.handleSubmit(submitHandler)}
          className="relative shadow-2xl bg-gray-600 charcoal-gray"
        >
          <div className="px-10 md:px-16 flex flex-col text-lg font-normal">
            <TitleForm name="Log in" />
            {error && (
              <p className="text-center text-sm pb-5 text-red-500">{error}</p>
            )}
            <CredentialInputBox
              form={formHook}
              name="email"
              label="E-MAIL"
              err={error}
            />
            <CredentialInputBox
              form={formHook}
              name="password"
              label="password"
              type="password"
              err={error !== '' ? error : undefined}
            />

            <CredentialButton name="Log In" />
          </div>
          <div className="text-center pb-6">
            <Link className="text-white" to="/forgot-password">
              Forgot password
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default SellerLogin
