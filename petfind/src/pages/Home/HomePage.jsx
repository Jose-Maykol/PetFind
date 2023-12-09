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
      <div className='flex max-w-[1200px] mx-10 flex-col gap-4 sm:gap-10 lg:flex-row'>
        <ReportFilters />
        <div className='w-full flex flex-row flex-wrap justify-center gap-6 pl-0 flex-shrink-0 sm:gap-10 sm:pl-6 lg:w-2/3 sm:justify-start'>
          {petReports?.map((petReport) => (
            <PetReportCard key={petReport.id} petReport={petReport} />
          ))}
        </div>
      </div>
    </section>
  )
}
