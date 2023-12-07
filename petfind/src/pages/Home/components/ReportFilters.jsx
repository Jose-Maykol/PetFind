import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import SearchIcon from '../../../components/Icons/SearchIcon'

export default function ReportFilters () {
  return (
    <div className='w-1/3'>
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
            <Checkbox classNames={{ label: 'text-small' }} value='gato'>Gato</Checkbox>
            <Checkbox classNames={{ label: 'text-small' }} value='perro'>Perro</Checkbox>
            <Checkbox classNames={{ label: 'text-small' }} value='ave'>Ave</Checkbox>
            <Checkbox classNames={{ label: 'text-small' }} value='reptil'>Reptil</Checkbox>
            <Checkbox classNames={{ label: 'text-small' }} value='roedor'>Roedor</Checkbox>
            <Checkbox classNames={{ label: 'text-small' }} value='otro'>Otro</Checkbox>
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
