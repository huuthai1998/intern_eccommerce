import { BrowserRouter } from 'react-router-dom'
import RoutingSwitch from 'routing/RoutingSwitch'
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <BrowserRouter>
      <RoutingSwitch />
    </BrowserRouter>
  )
}

export default App
