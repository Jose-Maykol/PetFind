import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import './index.css'
import NavBar from './components/NavBar'
import ReportPage from './pages/ReportPage/ReportPage'
import HomePage from './pages/Home/HomePage'
import MyReportsPage from './pages/MyReports/MyReportsPage'
import LostPetReportPage from './pages/LostPetReport/LostPetReportPage'

const queryClient = new QueryClient()

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
      },
      {
        path: '/my-reports',
        element: <MyReportsPage />
      },
      {
        path: '/Lost-pet-report/:id',
        element: <LostPetReportPage />
      }
    ]
  }
])

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
