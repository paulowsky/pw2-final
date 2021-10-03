import { BrowserRouter } from 'react-router-dom'

import { GlobalProvider } from './contexts/GlobalContext'
import Routes from 'src/routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Routes />
        </GlobalProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
