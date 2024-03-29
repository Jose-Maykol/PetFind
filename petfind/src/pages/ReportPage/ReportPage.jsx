import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Textarea } from '@nextui-org/react'
import CalendarIcon from './../../components/Icons/CalendarIcon'
import { useState } from 'react'
import Calendar from 'react-calendar'
import './ReportPage.css'
import PetTypesService from '../../services/PetTypesService'
import { useQuery } from 'react-query'
import UploadPetPhoto from './components/UploadPetPhoto'
import ReportMap from './components/ReportMap'
import PetReportService from '../../services/PetReportService'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { API_URL } from '../../config/config'

export default function ReportPage () {
  const { isLoged } = useAuthStore()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const navigate = useNavigate()

  const petTypesQuery = useQuery('petTypes', PetTypesService.getAll, {
    retry: 2,
    staleTime: Infinity
  })

  const petTypes = petTypesQuery.data?.data.petTypes

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const data = Object.fromEntries(form.entries())
      console.log(data)
      PetReportService.createPetReport(data).then((res) => {
        console.log(res)
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeDate = (date) => {
    setDate(date)
    setIsOpenCalendar(false)
  }

  return (
    <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      {isLoged === false && (
        <Modal isOpen backdrop='blur' onClose={() => navigate('/')}>
          <ModalContent>
            <ModalHeader className='flex justify-center'> ¡Debes iniciar sesion! </ModalHeader>
            <ModalBody>
              <p>
                Para reportar una mascota perdida debes iniciar sesion
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                onClick={() => { window.location.href = `${API_URL}/auth/google` }}
                className='w-full'
              >
                Iniciar sesion
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <div className='max-w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar mascota perdida</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 py-4'>
            <div className='flex flex-col sm:flex-row gap-6 items-center'>
              <UploadPetPhoto />
              <div className='flex flex-col gap-4 py-4'>
                <Input
                  type='text'
                  name='name'
                  label='Nombre de la mascota'
                  labelPlacement='outside'
                  placeholder='Ingrese el nombre de la mascota'
                  classNames={{ label: 'text-neutral-400' }}
                  required
                />
                <Select
                  label='Tipo de mascota'
                  name='pet_type_id'
                  labelPlacement='outside'
                  placeholder='Seleccione el tipo de mascota'
                  classNames={{ label: 'text-neutral-400', value: 'capitalize' }}
                  required
                >
                  {petTypes?.map((petType) => (
                    <SelectItem key={petType.id} value={petType.id} className='capitalize'>
                      {petType.tag}
                    </SelectItem>
                  ))}
                </Select>
                <div className='flex flex-row gap-2 items-end'>
                  <Input
                    type='number'
                    name='age_years'
                    label='Edad de la mascota'
                    labelPlacement='outside'
                    placeholder='Años'
                    classNames={{ label: 'text-neutral-400' }}
                    required
                  />
                  <Input
                    type='number'
                    name='age_months'
                    labelPlacement='outside'
                    placeholder='Meses'
                    classNames={{ label: 'text-neutral-400' }}
                    required
                  />
                </div>
              </div>
            </div>
            <Textarea
              label='Descripcion'
              name='description'
              labelPlacement='outside'
              placeholder='Ingrese una descripcion de la mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            {isLoged === true
              ? (
                <ReportMap />
                )
              : (
                <div className='flex flex-col gap-4 justify-between animate-pulse bg-neutral-200 w-full h-[400px]' />
                )}
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
                name='lossDate'
                label='Fecha de desaparicion'
                labelPlacement='outside'
                value={date.toLocaleDateString()}
                onValueChange={setDate.toString()}
                placeholder='Ingrese la fecha de desaparicion'
                classNames={{ label: 'text-neutral-400', input: 'text-neutral-400' }}
                required
                readOnly
              />
              <Popover placement='left' isOpen={isOpenCalendar} onOpenChange={(open) => setIsOpenCalendar(open)}>
                <PopoverTrigger>
                  <Button
                    color='primary'
                    isIconOnly
                    startContent={<CalendarIcon width={24} height={24} fill='fill-white' />}
                  />
                </PopoverTrigger>
                <PopoverContent className='px-2 pb-4'>
                  <Calendar
                    onChange={onChangeDate}
                    value={date}
                    prev2Label={null}
                    next2Label={null}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Input
              type='text'
              name='phone'
              label='Numero de contacto'
              labelPlacement='outside'
              placeholder='Ingrese el numero de contacto'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <Input
              type='number'
              name='reward'
              label='Recompensa'
              labelPlacement='outside'
              placeholder='Ingrese la recompensa'
              classNames={{ label: 'text-neutral-400' }}
              className='flex-1'
              required
            />
          </div>
          <Button
            type='submit'
            color='primary'
            className='w-full'
          >
            Reportar
          </Button>
        </form>
      </div>
    </div>
  )
}
