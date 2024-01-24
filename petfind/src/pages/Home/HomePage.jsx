import { useQuery } from 'react-query'
import PetReportService from '../../services/PetReportService'
import PetReportCard from './components/PetReportCard'
import ReportFilters from './components/ReportFilters'
import { Pagination, Spinner } from '@nextui-org/react'
import { useState } from 'react'

export default function HomePage () {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    dates: []
  })
  const { data, refetch, isLoading } = useQuery(['report', page, search, filters], () => PetReportService.getPetReports({
    page,
    name: search,
    lossDateStart: filters.dates[0],
    lossDateEnd: filters.dates[1],
    petTypeIds: filters.selectedPetTypes ? filters.selectedPetTypes.join(',') : ''
  }), {
    retry: 2,
    staleTime: Infinity
  })

  const handlePageChange = (page) => {
    setPage(page)
    refetch()
  }

  const handleSearchChange = (search) => {
    setSearch(search)
    setPage(1)
    refetch()
  }

  const handleFiltersChange = (filters) => {
    setFilters(filters)
    setPage(1)
    refetch()
  }

  if (isLoading) {
    return (
      <section className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
        <div className='flex max-w-[1200px] mx-10 flex-col gap-4 sm:gap-10 lg:flex-row'>
          <ReportFilters onSearchChange={handleSearchChange} onFiltersChange={handleFiltersChange} />
          <div className='w-full flex flex-col gap-10 max-w-[680px] md:min-w-[680px]'>
            <div className='flex flex-row flex-wrap items-center justify-center max-w-[680px]'>
              <Spinner />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='flex max-w-[1200px] mx-10 flex-col gap-4 sm:gap-10 lg:flex-row'>
        <ReportFilters onSearchChange={handleSearchChange} onFiltersChange={handleFiltersChange} />
        <div className='w-full flex flex-col gap-10 max-w-[680px] md:min-w-[680px]'>
          <div className='flex-1 w-full flex flex-row flex-wrap items-center justify-center gap-6 pl-0 flex-shrink-0 sm:gap-10 sm:justify-start'>
            {data.data.petReports.map((petReport) => (
              <PetReportCard key={petReport.id} petReport={petReport} />
            ))}
          </div>
          {data.data.totalPages > 1 && (
            <Pagination className='mx-auto' total={data.data.totalPages} initialPage={1} onChange={handlePageChange} />
          )}
        </div>
      </div>
    </section>
  )
}
