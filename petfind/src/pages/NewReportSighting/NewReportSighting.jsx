import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Calendar from 'react-calendar'
import CalendarIcon from '../../components/Icons/CalendarIcon'
import { useState } from 'react'
import ReportMap from '../ReportPage/components/ReportMap'
import ReportService from '../../services/ReportService'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthStore from './../../store/useAuthStore'
import { API_URL } from '../../config/config'

export default function NewReportSighting () {
  const { isLoged } = useAuthStore()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const navigate = useNavigate()

  const params = useParams()
  const { id } = params

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const data = Object.fromEntries(form.entries())
      ReportService.createReport(data, id).then((res) => {
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
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar avistamiento</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 py-4'>
            <Textarea
              label='Comentario'
              name='comment'
              labelPlacement='outside'
              placeholder='Ingrese un comentario'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
                name='date'
                label='Fecha de avistamiento'
                labelPlacement='outside'
                value={date.toLocaleDateString()}
                onValueChange={setDate.toString()}
                placeholder='Seleccione una fecha'
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
            <p className='font-semibold text-small text-neutral-400'> Ubicacion </p>
            <ReportMap />
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
