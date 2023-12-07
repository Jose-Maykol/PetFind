import { Input, Select } from '@nextui-org/react'

export default function ReportPage () {
  return (
    <div className='w-screen flex flex-col items-center justify-center pt-6'>
      <div className='w-[700px]'>
        <h2 className='font-bold text-lg'>Reportar mascota perdida</h2>
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
          <Input
            type='text'
            label='Numero de contacto'
            labelPlacement='outside'
            placeholder='Ingrese el numero de contacto'
            classNames={{ label: 'text-neutral-400' }}
            required
          />
        </div>
      </div>
    </div>
  )
}
