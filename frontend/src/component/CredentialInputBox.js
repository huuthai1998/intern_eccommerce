import React, { useRef } from 'react'

const CredentialInputBox = (props) => {
  //Toggle function for hide/show password
  const passwordBox = useRef(null)
  const passwordToggle = (e) => {
    e.preventDefault()
    if (passwordBox.current.type === 'text')
      passwordBox.current.type = 'password'
    else passwordBox.current.type = 'text'
  }
  let { form, name, label, type, validator, errorMessage } = props
  const {
    register,
    formState: { errors },
  } = form
  validator = validator === undefined ? {} : validator
  if (type !== 'password')
    return (
      <div className="mt-3 flex flex-col">
        <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
          {label}
        </label>
        <input
          name={name}
          {...register(name, validator)}
          type="text"
          required
          placeholder={`Enter your ${name}...`}
          className={`mb-1 border px-5 py-3 bg-gray-100 text-base ${
            errors[name] ? 'border-red-500 bg-red-200' : 'border-gray-400'
          }`}
        />
        {errors[name] && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
  else
    return (
      <div className="mt-3">
        <label htmlFor="password" className="text-sm font-bold mb-2">
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
            className={`mb-1 w-full border px-5 py-3 bg-gray-100 text-base ${
              errors[name] ? 'border-red-500 bg-red-200' : 'border-gray-400'
            }`}
          />
          <button
            tabIndex="-1"
            className="absolute show-password-button focus:outline-none"
            onClick={passwordToggle}
          >
            <i className="far fa-eye"></i>
          </button>
        </div>
        {errors[name] && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    )
}

export default CredentialInputBox
