import { useQuery } from 'react-query'
import PetReportService from '../../services/PetReportService'
import PetReportCard from './components/PetReportCard'
import ReportFilters from './components/ReportFilters'
import { Pagination } from '@nextui-org/react'
import { useState } from 'react'

export default function HomePage () {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const query = useQuery(['report', page, search], () => PetReportService.getPetReports({ page, name: search }), {
    retry: 2
  })

  const petReports = query.data?.data.petReports
  const totalPages = query.data?.data.totalPages

  const handlePageChange = (page) => {
    setPage(page)
    query.refetch()
  }

  const handleSearchChange = (search) => {
    setSearch(search)
    setPage(1)
    query.refetch()
  }

  return (
    <section className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='flex max-w-[1200px] mx-10 flex-col gap-4 sm:gap-10 lg:flex-row'>
        <ReportFilters onSearchChange={handleSearchChange} />
        <div className='w-full flex flex-col gap-10 max-w-[680px] md:min-w-[680px]'>
          <div className='flex-1 w-full flex flex-row flex-wrap items-center justify-center gap-6 pl-0 flex-shrink-0 sm:gap-10 sm:justify-start'>
            {petReports?.map((petReport) => (
              <PetReportCard key={petReport.id} petReport={petReport} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className='mx-auto' total={totalPages} initialPage={1} onChange={handlePageChange} />
          )}
        </div>
        {/* <div className='flex-1 max-w-[754px] flex flex-row flex-wrap items-center justify-center gap-6 pl-0 flex-shrink-0 sm:gap-10 lg:w-2/3 sm:justify-start'>
          {petReports?.map((petReport) => (
            <PetReportCard key={petReport.id} petReport={petReport} />
          ))}
        </div> */}
      </div>
    </section>
  )
}
