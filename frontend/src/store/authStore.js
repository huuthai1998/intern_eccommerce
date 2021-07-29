const initState = {
  isLoading: true,
  user: undefined,
  error: '',
  authenticated: false,
  filter: {},
  cart: JSON.parse(localStorage.getItem('cart'))
    ? JSON.parse(localStorage.getItem('cart')).cart
    : [],
  cartNumItems: JSON.parse(localStorage.getItem('cart'))
    ? JSON.parse(localStorage.getItem('cart')).cartNumItems
    : 0,
  subTotal: JSON.parse(localStorage.getItem('cart'))
    ? JSON.parse(localStorage.getItem('cart')).subTotal
    : 0,
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
const ADD_FILTER = 'ADD_FILTER'
const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST'
const ADD_CART = 'ADD_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREMENT_ITEM_CART = 'INCREMENT_ITEM_CART'
const DECREMENT_ITEM_CART = 'DECREMENT_ITEM_CART'

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
    case CHECK_AUTH_REQUEST:
      return { ...state, isLoading: true }
    case CHECK_AUTH_SUCCESS:
      return { ...state, isLoading: false, authenticated: true, user: data }
    case CHECK_AUTH_FAIL:
      return { ...state, isLoading: false, authenticated: false }
    case ADD_FILTER:
      return { ...state, filter: { ...state.filter, ...data } }
    case CLEAR_CART:
      localStorage.removeItem('cart')
      return { ...state, cart: [], subTotal: 0, cartNumItems: 0 }
    case INCREMENT_ITEM_CART:
      var temp = [...state.cart]
      var product = temp.findIndex((e) => e.product._id === data)
      temp[product].quantity++
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: temp,
          subTotal:
            state.subTotal + parseInt(state.cart[product].product.price),
          cartNumItems: state.cartNumItems + 1,
        })
      )
      return {
        ...state,
        cart: temp,
        subTotal: state.subTotal + parseInt(state.cart[product].product.price),
        cartNumItems: state.cartNumItems + 1,
      }
    case DECREMENT_ITEM_CART:
      var temp = [...state.cart]
      var product = temp.findIndex((e) => e.product._id === data)
      temp[product].quantity--
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: temp,
          subTotal:
            state.subTotal - parseInt(state.cart[product].product.price),
          cartNumItems: state.cartNumItems - 1,
        })
      )
      return {
        ...state,
        cart: temp,
        subTotal: state.subTotal - parseInt(state.cart[product].product.price),
        cartNumItems: state.cartNumItems - 1,
      }
    case REMOVE_FROM_CART:
      let previousCart = [...state.cart]
      const itemToBeRemoved = previousCart.findIndex(
        (i) => i.product._id === data
      )
      console.log(itemToBeRemoved)
      const newSubTotal =
        state.subTotal -
        previousCart[itemToBeRemoved].product.price *
          previousCart[itemToBeRemoved].quantity
      const newNumItems =
        state.cartNumItems - previousCart[itemToBeRemoved].quantity
      previousCart.splice(itemToBeRemoved, 1)
      console.log(newNumItems, newSubTotal)
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: previousCart,
          subTotal: newSubTotal,
          cartNumItems: newNumItems,
        })
      )
      return {
        ...state,
        cart: previousCart,
        subTotal: newSubTotal,
        cartNumItems: newNumItems,
      }
    case ADD_CART:
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: [...state.cart, data],
          cartNumItems: state.cartNumItems + parseInt(data.quantity),
          subTotal:
            state.subTotal +
            parseInt(data.quantity) * parseInt(data.product.price),
        })
      )

      return {
        ...state,
        cart: [...state.cart, data],
        cartNumItems: state.cartNumItems + parseInt(data.quantity),
        subTotal:
          state.subTotal +
          parseInt(data.quantity) * parseInt(data.product.price),
      }
    default:
      return state
  }
}

export default authReducer
