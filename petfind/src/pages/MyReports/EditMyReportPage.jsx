import UploadPetPhoto from '../ReportPage/components/UploadPetPhoto'
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Spinner, Textarea } from '@nextui-org/react'
import PetTypesService from '../../services/PetTypesService'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReportMap from '../ReportPage/components/ReportMap'
import CalendarIcon from '../../components/Icons/CalendarIcon'
import Calendar from 'react-calendar'
import useAuthStore from '../../store/useAuthStore'
import PetReportService from '../../services/PetReportService'
import CloseIcon from '../../components/Icons/CloseIcon'

export default function EditMyReportPage () {
  const navigate = useNavigate()
  const { isLoged } = useAuthStore()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const [photo, setPhoto] = useState(null)
  const params = useParams()
  const { id } = params

  const { data: dataPetType } = useQuery('petTypes', PetTypesService.getAll, {
    retry: 2,
    staleTime: Infinity
  })

  const { data, isLoading } = useQuery(['myOwnPetReport', id], async () => {
    const res = await PetReportService.getReportsSightings(id)
    return res.data
  }, {
    retry: 2,
    staleTime: Infinity,
    onSuccess: (res) => {
      setDate(new Date(res.pet.lossDate))
      setPhoto(res.pet.photo)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const data = Object.fromEntries(form.entries())
      console.log(data)
      PetReportService.updatePetReport(id, data).then((res) => {
        console.log(res)
      })
      navigate('/my-reports')
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeDate = (date) => {
    setDate(date)
    setIsOpenCalendar(false)
  }

  if (isLoading) {
    return (
      <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
        <div className='w-[700px]'>
          <div className='w-full h-[100px] flex flex-row flex-wrap items-center justify-center'>
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen max-w-full flex flex-col items-center justify-center py-6'>
      <div className='max-w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar mascota perdida</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 py-4'>
            <div className='flex flex-col sm:flex-row gap-6 items-center'>
              {photo
                ? (
                  <div className='w-[300px] h-64 relative'>
                    <img
                      src={photo}
                      alt='pet'
                      className='object-cover w-[300px] h-64 rounded-lg'
                    />
                    <Button
                      isIconOnly
                      className='absolute bottom-[10px] right-[10px] w-10 h-10 rounded-full bg-red-500'
                      onClick={() => setPhoto(null)}
                    >
                      <CloseIcon width={20} height={20} fill='fill-white' />
                    </Button>
                  </div>
                  )
                : (
                  <UploadPetPhoto />
                  )}
              <div className='flex flex-col gap-4 py-4'>
                <Input
                  defaultValue={data.pet.name}
                  type='text'
                  name='name'
                  label='Nombre de la mascota'
                  labelPlacement='outside'
                  placeholder='Ingrese el nombre de la mascota'
                  selectionMode='single'
                  classNames={{ label: 'text-neutral-400' }}
                  required
                />
                <Select
                  defaultSelectedKeys={[`${data.pet.petTypeId}`]}
                  label='Tipo de mascota'
                  name='pet_type_id'
                  labelPlacement='outside'
                  placeholder='Seleccione el tipo de mascota'
                  selectionMode='single'
                  classNames={{ label: 'text-neutral-400', value: 'capitalize' }}
                  // onValueChange={(value) => setPetReport({ ...petReport, pet_type_id: value })}
                  disallowEmptySelection
                  required
                >
                  {dataPetType?.data.petTypes.map((petType) => (
                    <SelectItem key={petType.id} value={petType.id} className='capitalize'>
                      {petType.tag}
                    </SelectItem>
                  ))}
                </Select>
                <div className='flex flex-row gap-2 items-end'>
                  <Input
                    defaultValue={data.pet.ageYears}
                    type='number'
                    name='age_years'
                    label='Edad de la mascota'
                    labelPlacement='outside'
                    placeholder='Años'
                    classNames={{ label: 'text-neutral-400' }}
                    required
                  />
                  <Input
                    defaultValue={data.pet.ageMonths}
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
              defaultValue={data.pet.description}
              label='Descripcion'
              name='description'
              labelPlacement='outside'
              placeholder='Ingrese una descripcion de la mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            {isLoged === true
              ? (
                  (data.pet.coordinates?.x && data.pet.coordinates?.y) && (
                    <ReportMap
                      initialPosition={{
                        lat: parseFloat(data.pet.coordinates?.x),
                        lng: parseFloat(data.pet.coordinates?.y)
                      }}
                    />
                  )
                )
              : (
                <div className='flex flex-col gap-4 justify-between animate-pulse bg-neutral-200 w-full h-[400px]' />
                )}
            <div className='flex flex-row gap-2 items-end'>
              <Input
                defaultValue={data.pet.location}
                type='text'
                name='lossDate'
                label='Fecha de desaparicion'
                labelPlacement='outside'
                placeholder='Ingrese la fecha de desaparicion'
                classNames={{ label: 'text-neutral-400', input: 'text-neutral-400' }}
                required
                readOnly
                onValueChange={setDate.toString()}
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
              defaultValue={data.pet.location}
              type='text'
              name='phone'
              label='Numero de contacto'
              labelPlacement='outside'
              placeholder='Ingrese el numero de contacto'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <Input
              defaultValue={data.pet.location}
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
          <div className='flex flex-row gap-4'>
            <Button
              color='primary'
              variant='flat'
              className='w-full'
              onPress={() => navigate('/my-reports')}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              color='primary'
              className='w-full'
            >
              Editar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
