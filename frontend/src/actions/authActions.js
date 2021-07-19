// import axios from 'axios'

// export const logIn = async (email, password, saveCookie) => {
//   dispatch({ type: REGISTER_REQUEST })
//   try {
//     const { data } = await axios.post(
//       'https://api.v2-dev.thuocsi.vn/interview/account',
//       { email, password }
//     )
//     Cookies.set('userInfo', JSON.stringify(data))
//     dispatch({ type: REGISTER_SUCCESS, payload: data })
//   } catch (err) {
//     dispatch({ type: REGISTER_FAIL, payload: err.response.data.message })
//     console.log(err.response.data.message)
//     alert(err.response.data.message)
//     throw err.response.data.message
//   }
// }
