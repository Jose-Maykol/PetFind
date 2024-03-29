import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import './index.css'
import { injectSpeedInsights } from '@vercel/speed-insights'
import NavBar from './components/NavBar'
import ReportPage from './pages/ReportPage/ReportPage'
import HomePage from './pages/Home/HomePage'
import MyReportsPage from './pages/MyReports/MyReportsPage'
import LostPetReportPage from './pages/LostPetReport/LostPetReportPage'
import NewReportSighting from './pages/NewReportSighting/NewReportSighting'
import MyReportPage from './pages/MyReports/MyReportPage'
import EditMyReportPage from './pages/MyReports/EditMyReportPage'

const queryClient = new QueryClient()
injectSpeedInsights()

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
        path: '/my-reports/:id',
        element: <MyReportPage />
      },
      {
        path: '/my-reports/:id/edit',
        element: <EditMyReportPage />
      },
      {
        path: '/lost-pet-report/:id',
        element: <LostPetReportPage />
      },
      {
        path: 'lost-pet-report/:id/new-sighting',
        element: <NewReportSighting />
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
