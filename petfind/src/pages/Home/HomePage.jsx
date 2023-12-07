import { useQuery } from 'react-query'
import PetReportService from '../../services/PetReportService'
import PetReportCard from './components/PetReportCard'
import ReportFilters from './components/ReportFilters'

export default function HomePage () {
  const query = useQuery('report', PetReportService.getPetReports, {
    retry: 2
  })

  const petReports = query.data?.data.petReports

  return (
    <section className='w-screen flex flex-col items-center justify-center pt-6'>
      <div className='flex flew-row w-[1200px]'>
        <ReportFilters />
        <div className='w-2/3 pl-6 flex flex-row flex-wrap gap-10'>
          {petReports?.map((petReport) => (
            <PetReportCard key={petReport.id} petReport={petReport} />
          ))}
        </div>
      </div>
    </section>
  )
}
