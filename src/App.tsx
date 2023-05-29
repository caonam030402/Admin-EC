import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div>{routeElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
