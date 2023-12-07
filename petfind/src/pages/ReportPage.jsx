import { Button, Input, Select, Textarea } from '@nextui-org/react'
import CoinBagIcon from '../components/Icons/CoinBagIcon'
import CalendarIcon from '../components/Icons/CalendarIcon'

export default function ReportPage () {
  return (
    <div className='w-screen flex flex-col items-center justify-center pt-6'>
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar mascota perdida</h2>
        <form action=''>
          <div className='flex flex-col gap-4 py-4'>
            <Input
              type='text'
              label='Nombre de la mascota'
              labelPlacement='outside'
              placeholder='Ingrese el nombre de la mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <Select
              label='Tipo de mascota'
              labelPlacement='outside'
              placeholder='Seleccione el tipo de mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <Textarea
              label='Descripcion'
              labelPlacement='outside'
              placeholder='Ingrese una descripcion de la mascota'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
                label='Fecha de desaparicion'
                labelPlacement='outside'
                placeholder='Ingrese la fecha de desaparicion'
                classNames={{ label: 'text-neutral-400' }}
                required
              />
              <Button
                color='primary'
                isIconOnly
                startContent={<CalendarIcon width={24} height={24} fill='fill-white' />}
              />
            </div>
            <Input
              type='text'
              label='Numero de contacto'
              labelPlacement='outside'
              placeholder='Ingrese el numero de contacto'
              classNames={{ label: 'text-neutral-400' }}
              required
            />
            <div className='flex flex-row gap-2 items-end'>
              <Input
                type='text'
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
          <Button color='primary' className='w-full'>
            Reportar
          </Button>
        </form>
      </div>
    </div>
  )
}
