import { Input, Button, CheckboxGroup, Checkbox } from '@nextui-org/react'
import SearchIcon from '../components/Icons/SearchIcon'
import CalendarIcon from './../components/Icons/CalendarIcon'
import { useQuery } from 'react-query'
import PetReportService from '../services/PetReportService'
import formatDate from '../utils/formatDate'
import MapPointIcon from '../components/Icons/MapPointIcon'
import PhoneIcon from '../components/Icons/PhoneIcon'

export default function HomePage () {
  const query = useQuery('report', PetReportService.getPetReports, {
    retry: 2
  })

  const petReports = query.data?.data.petReports

  return (
    <section className='w-screen flex flex-col items-center justify-center pt-6'>
      <div className='flex flew-row w-[1200px]'>
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
        <div className='w-2/3 pl-6 flex flex-row flex-wrap gap-10'>
          {petReports?.map((petReport) => (
            <div key={petReport.id}>
              <div className='w-[200px] h-[250px] rounded-md shadow-md'>
                <img
                  className='w-full h-[150px] object-cover rounded-md'
                  src={petReport.photo}
                  alt={petReport.name}
                  width={200}
                  height={150}
                />
                <div className='p-2 flex flex-col justify-between gap-2'>
                  <div className='flex flex-row justify-between items-center'>
                    <h3 className='text-base font-medium text-black'>{petReport.name}</h3>
                    <Button
                      isIconOnly
                      color='primary'
                      aria-label='map-point'
                      className='w-[30px] h-[30px] max-w-[30px] min-w-unit-1 rounded-md p-0'
                    >
                      <MapPointIcon width={20} height={20} fill='fill-white' />
                    </Button>
                  </div>
                  <div className='flex flex-row gap-2 max-h-[20px]'>
                    <CalendarIcon width={20} height={20} fill='fill-neutral-400' />
                    <p className='text-sm text-gray-400'>{formatDate(petReport.lossDate)}</p>
                  </div>
                  <div className='flex flex-row gap-2 max-h-[20px]'>
                    <PhoneIcon width={20} height={20} fill='fill-neutral-400' />
                    <p className='text-sm text-gray-400'>{petReport.phone}</p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
