import { Button } from '@nextui-org/react'
import DeleteIcon from '../../../components/Icons/DeleteIcon'
import EditIcon from '../../../components/Icons/EditIcon'

export default function MyPetReportCard ({ petReport }) {
  return (
    <div className='w-[200px] h-[280px] rounded-md shadow-lg'>
      <div className='relative'>
        <img
          className='w-full h-[200px] object-cover rounded-md'
          src={petReport.photo}
          alt={petReport.name}
          width={200}
          height={200}
        />
        <div className='flex flex-row gap-2 absolute bottom-[10px] right-[10px]'>
          <Button
            color='primary'
            isIconOnly
            startContent={<EditIcon width={20} height={20} fill='fill-white' />}
            className='rounded-md bg-[#F87272] hover:bg-[#F87272]'
          />
          <Button
            color='primary'
            isIconOnly
            startContent={<DeleteIcon width={20} height={20} fill='fill-white' />}
            className='rounded-md bg-[#F87272] hover:bg-[#F87272]'
          />
        </div>
      </div>

      <div className='flex flex-row justify-between items-center w-full gap-2 p-2'>
        <h3 className='text-base font-medium text-black'>{petReport.name}</h3>
      </div>
    </div>
  )
}
