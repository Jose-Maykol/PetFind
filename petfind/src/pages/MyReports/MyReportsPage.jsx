import { useState } from 'react'
import PetReportService from '../../services/PetReportService'
import { useQuery } from 'react-query'
import useAuthStore from '../../store/useAuthStore'
import { Link, Navigate } from 'react-router-dom'
import MyPetReportCard from './components/MyPetReportCard'

export default function MyReportsPage () {
  const { isLoged } = useAuthStore()
  const [petReports, setPetReports] = useState([])

  useQuery(['report'], PetReportService.getOwnPetReports, {
    retry: 2,
    staleTime: Infinity,
    onSuccess: (res) => {
      setPetReports(res.data.petReports)
    }
  })

  if (isLoged === false) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg pb-4'> Mis reportes </h2>
        <div className='flex-1 w-full flex flex-row flex-wrap items-center justify-center gap-6 pl-0 flex-shrink-0 sm:gap-10 sm:justify-start'>
          {petReports?.map((petReport) => (
            <MyPetReportCard key={petReport.id} petReport={petReport} />
          ))}
          <div className='border border-[#F87272] border-dashed rounded-md w-[200px] h-[280px] text-[#F87272] hover:border-[#fa3c3c] hover:text-[#fa3c3c]'>
            <Link to='/report'>
              <div className='flex flex-col items-center justify-center w-full h-full p-12 gap-2'>
                <p className='text-sm font-semibold text-center'> Reportar otra mascota perdida</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
