import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, Textarea } from '@nextui-org/react'
import CoinBagIcon from '../components/Icons/CoinBagIcon'
import CalendarIcon from '../components/Icons/CalendarIcon'
import { useState } from 'react'
import Calendar from 'react-calendar'
import './ReportPage/ReportPage.css'

export default function ReportPage () {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [date, setDate] = useState(new Date())

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const form = new FormData(e.target)
      const data = Object.fromEntries(form.entries())
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeDate = (date) => {
    setDate(date)
    setIsOpenCalendar(false)
  }

  return (
    <div className='w-screen flex flex-col items-center justify-center pt-6'>
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar mascota perdida</h2>
        <form onSubmit={handleSubmit}>
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
              name='petTypeId'
              labelPlacement='outside'
              placeholder='Seleccione el tipo de mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <Textarea
              label='Descripcion'
              name='description'
              labelPlacement='outside'
              placeholder='Ingrese una descripcion de la mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
                name='lossDate'
                label='Fecha de desaparicion'
                labelPlacement='outside'
                value={date.toLocaleDateString()}
                onValueChange={setDate.toString()}
                placeholder='Ingrese la fecha de desaparicion'
                classNames={{ label: 'text-neutral-400' }}
                required
                disabled
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
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
                name='reward'
                label='Recompensa'
                labelPlacement='outside'
                placeholder='Ingrese la recompensa'
                classNames={{ label: 'text-neutral-400' }}
                className='flex-1'
                required
              />
              <Button
                color='primary'
                isIconOnly
                startContent={<CoinBagIcon width={24} height={24} fill='fill-white' />}
              />
            </div>
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
