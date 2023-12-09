import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import SearchIcon from '../../../components/Icons/SearchIcon'
import { useQuery } from 'react-query'
import PetTypesService from '../../../services/PetTypesService'

export default function ReportFilters () {
  const petTypesQuery = useQuery('petTypes', PetTypesService.getAll, {
    retry: 2,
    staleTime: Infinity
  })

  const petTypes = petTypesQuery.data?.data.petTypes

  return (
    <div className='w-full min-w-[250px] lg:w-1/3'>
      <div className='flex flex-row items-end gap-2 p-4'>
        <Input
          label='Buscar por nombre'
          labelPlacement='outside'
          isClearable
          radius='sm'
          placeholder='Buscar'
        />
        <Button isIconOnly color='primary' aria-label='search'>
          <SearchIcon width={24} height={24} fill='fill-white' />
        </Button>
      </div>
      <div className='mt-6 border border-neutral-200 rounded-md p-4'>
        <div className='flex flex-row items-end gap-2'>
          <Input
            label='Fecha de desaparicion'
            labelPlacement='outside'
            isClearable
            radius='sm'
            placeholder='Desde - Hasta'
          />
          <Button isIconOnly color='primary' aria-label='search-date'>
            <CalendarIcon width={24} height={24} fill='fill-white' />
          </Button>
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
