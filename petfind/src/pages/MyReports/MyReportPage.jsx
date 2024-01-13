import { Navigate, useParams } from 'react-router-dom'
import PetReportService from '../../services/PetReportService'
import { useQuery } from 'react-query'
import useAuthStore from '../../store/useAuthStore'
import { Spinner, User } from '@nextui-org/react'
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
        res.petReports.map(coordinate => ({
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
        <h2 className='font-bold text-lg'>Reportes para {data.pet.name}</h2>
        {data && <ReportSightingMap coordinates={coordinates} />}
        <div className='flex flex-col items-start w-full my-8 gap-4'>
          {data.petReports.map((report, index) => (
            <div key={index} className='w-full'>
              <User
                name={report.userName}
                description={report.userEmail}
                avatarProps={{ src: report.userProfilePicture }}
              />
              <div className='flex flex-col rounded-md bg-neutral-100 p-3'>
                <p className='self-end text-sm text-neutral-500 py-2'>{new Date(report.reportDatetime).toLocaleDateString()}</p>
                <p>{report.reportComment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
