import { BrowserRouter } from 'react-router-dom'
import NavBar from 'component/NavBar/NavBar'
import RoutingSwitch from 'routing/RoutingSwitch'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <RoutingSwitch />
    </BrowserRouter>
  )
}

export default App
