import ForgotPassword from 'component/ForgotPassword'
import Register from 'component/Register'
import ResetPassword from 'pages/ResetPassword'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/reset/:token" children={<ResetPassword />}></Route>
        <Route path="/" children={<ForgotPassword />}></Route>
      </Switch>
    </Router>
  )
}

export default App
