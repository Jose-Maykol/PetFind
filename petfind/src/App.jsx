import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/report',
        element: <ReportPage />
      }
    ]
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
