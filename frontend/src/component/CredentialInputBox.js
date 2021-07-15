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
  const { form, name, label, type } = props
  console.log(form)
  if (type !== 'password')
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="uppercase text-sm font-bold mb-2">
          {label}
        </label>
        <input
          name={name}
          {...form.register(name)}
          type="text"
          required
          placeholder={`Enter your ${name}...`}
          className="mb-4 border border-gray-400 px-5 py-3 bg-gray-100 text-base"
        />
      </div>
    )
  else
    return (
      <div className="">
        <label htmlFor="password" className="text-sm font-bold mb-2">
          PASSWORD
        </label>
        <div className="flex relative">
          <input
            {...form.register('password')}
            ref={passwordBox}
            name="password"
            required
            type="password"
            placeholder="Enter your password..."
            className="mb-4 w-full border border-gray-400 px-5 py-3 bg-gray-100 text-base"
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
    )
}

export default CredentialInputBox
