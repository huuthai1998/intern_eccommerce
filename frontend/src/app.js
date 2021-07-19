import { BrowserRouter } from 'react-router-dom'
import NavBar from 'component/NavBar/NavBar'
import RoutingSwitch from 'routing/RoutingSwitch'
import AddProduct from 'pages/AddProduct/AddProduct'
import 'semantic-ui-css/semantic.min.css'
import Login from 'component/Login'
import SellerLogin from 'pages/SellerLogin/SellerLogin'
import SellerBar from 'component/SellerBar/SellerBar'

const App = () => {
  return (
    <BrowserRouter>
      <SellerBar />
      <RoutingSwitch />
    </BrowserRouter>
  )
}

export default App
