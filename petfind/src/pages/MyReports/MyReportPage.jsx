import { Navigate, useParams } from 'react-router-dom'
import PetReportService from '../../services/PetReportService'
import { useQuery } from 'react-query'
import useAuthStore from '../../store/useAuthStore'
import { Button, Chip, Spinner, User } from '@nextui-org/react'
import { useState } from 'react'
import ReportSightingMap from './components/ReportSightingMap'
import CheckIcon from '../../components/Icons/CheckIcon'
import CloseIcon from '../../components/Icons/CloseIcon'

export default function MyReportPage () {
  const { isLoged } = useAuthStore()
  const [coordinates, setCoordinates] = useState(null)
  const params = useParams()
  const { id } = params

  const { data, isLoading, refetch } = useQuery(['myPetReport', id], async () => {
    const res = await PetReportService.getReportsSightings(id)
    return res.data
  }, {
    retry: 2,
    onSuccess: (res) => {
      setCoordinates(
        res.petReports.map(coordinate => ({
          lat: coordinate.reportCoordinates.x,
          lng: coordinate.reportCoordinates.y
        }))
      )
    }
  })

  console.log(data)

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

  const handleChangePetStatus = () => {
    if (data.pet.reportStatusId === 1) {
      PetReportService.updatePetStatus(id, { status_id: 2 }).then((res) => {
        refetch()
      })
    } else {
      PetReportService.updatePetStatus(id, { status_id: 1 }).then((res) => {
        refetch()
      })
    }
  }

  return (
    <section className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='w-[700px]'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='font-bold text-lg'>Reportes para {data.pet.name}</h2>
          <div className='flex flex-row gap-2 items-center'>
            <Chip color='primary' size='small' className='text-sm' variant='flat'>
              {data.pet.reportStatusId === 1 ? 'No encontrado' : 'Encontrado'}
            </Chip>
            <Button
              isIconOnly
              color='primary'
              // variant='ghost'
              onPress={handleChangePetStatus}
              startContent={
              data.pet.reportStatusId === 1
                ? (
                  <CheckIcon width={20} height={20} fill='fill-white' />
                  )
                : (
                  <CloseIcon width={20} height={20} fill='fill-white' />
                  )
            }
            />
          </div>
        </div>
        {data && coordinates !== null && <ReportSightingMap coordinates={coordinates} />}
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
