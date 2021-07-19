const initState = {
  isLoading: false,
  user: undefined,
  error: '',
  authenticated: false,
}

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const REGISTER_REQUEST = 'REGISTER_REQUEST'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS'
const CHECK_AUTH_FAIL = 'CHECK_AUTH_FAIL'

const authReducer = (state = initState, action) => {
  const { type, data } = action
  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, isLoading: true }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: data,
        authenticated: true,
      }
    case REGISTER_FAIL:
      return { ...state, isLoading: false, error: data }
    case LOGIN_REQUEST:
      return { ...state, isLoading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: data,
        authenticated: true,
      }
    case LOGIN_FAIL:
      var ret = {
        ...state,
        isLoading: false,
        error: data,
      }
      return ret
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: undefined,
        authenticated: false,
      }
    case CHECK_AUTH_SUCCESS:
      return { ...state, isLoading: false, authenticated: true, user: data }
    case CHECK_AUTH_FAIL:
      return { ...state, isLoading: false, authenticated: false }
    default:
      return state
  }
}

export default authReducer
