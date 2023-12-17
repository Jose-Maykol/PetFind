import { Button, Checkbox, CheckboxGroup, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import SearchIcon from '../../../components/Icons/SearchIcon'
import { useQuery } from 'react-query'
import PetTypesService from '../../../services/PetTypesService'
import Calendar from 'react-calendar'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

export default function ReportFilters ({ onSearchChange }) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  // const [dates, setDates] = useState([new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()])
  const [dates, setDates] = useState([null, null]) // [startDate, endDate

  const [search, setSearch] = useState('')

  const petTypesQuery = useQuery('petTypes', PetTypesService.getAll, {
    retry: 2,
    staleTime: Infinity
  })

  const petTypes = petTypesQuery.data?.data.petTypes

  const handleSearch = () => {
    onSearchChange(search)
  }

  const onChangeDate = (dates) => {
    setDates(dates)
  }

  return (
    <div className='w-full min-w-[250px] lg:w-1/3'>
      <div className='flex flex-row items-end gap-2 p-4'>
        <Input
          label='Buscar por nombre'
          labelPlacement='outside'
          value={search}
          onValueChange={(value) => setSearch(value)}
          onClear={() => onSearchChange('')}
          isClearable
          radius='sm'
          placeholder='Buscar'
        />
        <Button isIconOnly color='primary' aria-label='search' onClick={handleSearch}>
          <SearchIcon width={24} height={24} fill='fill-white' />
        </Button>
      </div>
      <div className='mt-6 border border-neutral-200 rounded-md p-4'>
        <div className='flex flex-row items-end gap-2'>
          <Input
            label='Fecha de desaparicion'
            type='text'
            disabled
            labelPlacement='outside'
            value={dates[0] ? `${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}` : ''}
            onValueChange={(value) => setDates(value)}
            isClearable
            radius='sm'
            placeholder='Desde - Hasta'
            classNames={{ label: 'text-neutral-400', input: 'text-neutral-400' }}
          />
          <Popover placement='right' isOpen={isOpenCalendar} onOpenChange={(open) => setIsOpenCalendar(open)}>
            <PopoverTrigger>
              <Button isIconOnly color='primary' aria-label='search-date'>
                <CalendarIcon width={24} height={24} fill='fill-white' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='px-2 pb-4'>
              <Calendar
                onChange={onChangeDate}
                selectRange
                value={dates}
                prev2Label={null}
                next2Label={null}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='py-4'>
          <CheckboxGroup
            label='Tipo de mascota'
            classNames={{
              label: 'text-small font-medium text-black'
            }}
          >
            {petTypes?.map((petType) => (
              <Checkbox
                key={petType.id}
                classNames={{ label: 'text-small' }}
                value={petType.id}
                className='capitalize'
              >
                {petType.tag}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div>
          <Button
            color='primary'
            className='w-full'
          >
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  )
}

ReportFilters.propTypes = {
  onSearchChange: PropTypes.func
}
