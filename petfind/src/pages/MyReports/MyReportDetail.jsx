import { Navigate, useParams } from 'react-router-dom'
import PetReportService from '../../services/PetReportService'
import { useQuery } from 'react-query'
import useAuthStore from '../../store/useAuthStore'
import { Spinner } from '@nextui-org/react'
import { useState } from 'react'
import ReportSightingMap from './components/ReportSightingMap'

export default function MyReportPage () {
  const { isLoged } = useAuthStore()
  const [coordinates, setCoordinates] = useState([])
  const params = useParams()
  const { id } = params

  const { data, isLoading } = useQuery(['myPetReport', id], async () => {
    const res = await PetReportService.getReportsSightings(id)
    console.log(res)
    return res.data
  }, {
    retry: 2,
    staleTime: Infinity,
    onSuccess: (res) => {
      console.log(res)
      setCoordinates(
        res.map(coordinate => ({
          lat: coordinate.reportCoordinates.x,
          lng: coordinate.reportCoordinates.y
        }))
      )
    }
  })

  if (isLoged === false) {
    return (
      <Navigate to='/' />
    )
  }

  if (isLoading) {
    return (
      <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
        <div className='w-[700px]'>
          <h2 className='font-bold text-lg pb-4'> Mis reportes </h2>
          <div className='w-full h-[100px] flex flex-row flex-wrap items-center justify-center'>
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='w-[700px]'>
        <h2>Reportes para </h2>
        {data && <ReportSightingMap coordinates={coordinates} />}
      </div>
    </section>
  )
}
