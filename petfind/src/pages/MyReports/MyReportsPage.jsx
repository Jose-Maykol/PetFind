import { Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import PetReportService from '../../services/PetReportService'
import { useQuery } from 'react-query'
import PetReportEditor from './components/PetReportEditor'

export default function MyReportsPage () {
  const [petReports, setPetReports] = useState([])
  const [idPetReport, setIdPetReport] = useState(null)

  useQuery(['report'], PetReportService.getOwnPetReports, {
    retry: 2,
    onSuccess: (res) => {
      setPetReports(res.data.petReports)
      setIdPetReport(res.data.petReports[0].id)
    }
  })

  return (
    <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg pb-4'> Mis reportes </h2>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-col gap-4 w-[400px]'>
            <Select
              name='my_pet_reports'
              placeholder='Seleccione un reporte'
              label='Reportes'
              selectionMode='single'
            >
              {petReports.map((petReport) => (
                <SelectItem key={petReport.id} value={petReport.id}>
                  {petReport.name}
                </SelectItem>
              ))}
            </Select>
            <PetReportEditor idPetReport={idPetReport} />
          </div>
          <div>
            mapa
          </div>
        </div>
      </div>
    </div>
  )
}
