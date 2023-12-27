import { PropTypes } from 'prop-types'
import { useQuery } from 'react-query'
import PetReportService from '../../../services/PetReportService'
import { useState } from 'react'
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Textarea } from '@nextui-org/react'
import Calendar from 'react-calendar'
import PetTypesService from '../../../services/PetTypesService'
import CalendarIcon from '../../../components/Icons/CalendarIcon'

export default function PetReportEditor ({ idPetReport }) {
  const [petTypes, setPetTypes] = useState(null)
  const [petReport, setPetReport] = useState(null)

  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [date, setDate] = useState(new Date())

  useQuery(['petReport', idPetReport], () => {
    if (idPetReport !== null) {
      return PetReportService.getPetReport(idPetReport)
    }
    return null
  }, {
    retry: 2,
    enabled: !!idPetReport,
    onSuccess: (res) => {
      setPetReport(res.data.petReport)
    }
  })

  useQuery(['petTypes'], PetTypesService.getAll, {
    retry: 2,
    staleTime: Infinity,
    onSuccess: (res) => {
      setPetTypes(res.data.petTypes)
    }
  })

  const onChangeDate = (date) => {
    setDate(date)
    setIsOpenCalendar(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const data = Object.fromEntries(form.entries())
      console.log(data)
      /* PetReportService.updatePetReport(idPetReport, data).then((res) => {
        console.log(res)
      }) */
    } catch (error) {
      console.log(error)
    }
  }

  if (!petReport) {
    return null
  }

  return (
    <div>
      soy el editor {petReport.name}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-row gap-6'>
            {/* <UploadPetPhoto /> */}
            <div className='flex flex-col gap-4 py-4'>
              <Input
                // value={petReport.name}
                type='text'
                name='name'
                label='Nombre de la mascota'
                labelPlacement='outside'
                placeholder='Ingrese el nombre de la mascota'
                classNames={{ label: 'text-neutral-400' }}
                defaultValue={petReport.name}
                required
              />
              <Select
                label='Tipo de mascota'
                name='pet_type_id'
                labelPlacement='outside'
                placeholder='Seleccione el tipo de mascota'
                classNames={{ label: 'text-neutral-400', value: 'capitalize' }}
                defaultValue={petReport.pet_type_id}
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
                  defaultValue={petReport.age_years}
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
            defaultValue={petReport.description}
            required
          />
          {/* <ReportMap /> */}
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
              defaultValue={petReport.lossDate}
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
            defaultValue={petReport.phone}
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
            defaultValue={petReport.reward}
            required
          />
        </div>
        {/* <Button
            type='submit'
            color='primary'
            className='w-full'
          >
            Reportar
          </Button> */}
      </form>
    </div>
  )
}

PetReportEditor.propTypes = {
  idPetReport: PropTypes.string
}
