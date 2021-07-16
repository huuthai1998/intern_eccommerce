import ForgotPassword from 'component/ForgotPassword'
import Login from 'component/Login'
import Register from 'component/Register'
import Home from 'pages/Home'
import ResetPassword from 'pages/ResetPassword'
import routePaths from 'routing/paths'

const config = [
  { path: routePaths.HOME, exact: true, component: Home },
  {
    path: routePaths.LOGIN,
    component: Login,
    unAuthOnly: true,
    redirect: routePaths.HOME,
  },
  {
    path: routePaths.REGISTER,
    component: Register,
    redirect: routePaths.HOME,
    unAuthOnly: true,
  },
  { path: routePaths.RESET_PASSWORD, component: ResetPassword },
  { path: routePaths.FORGOT_PASSWORD, component: ForgotPassword },
]

export default config
