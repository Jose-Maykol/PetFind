import { Button } from '@nextui-org/react'
import DeleteIcon from '../../../components/Icons/DeleteIcon'
import EditIcon from '../../../components/Icons/EditIcon'
import { Link, useNavigate } from 'react-router-dom'

export default function MyPetReportCard ({ petReport }) {
  const navigate = useNavigate()

  const handleEditPage = () => {
    navigate(`/my-reports/${petReport.id}/edit`)
  }

  return (
    <Link to={`/my-reports/${petReport.id}`}>
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
              onPress={handleEditPage}
            />
            <Button
              color='primary'
              isIconOnly
              startContent={<DeleteIcon width={20} height={20} fill='fill-white' />}
              className='rounded-md bg-[#F87272] hover:bg-[#F87272]'
            />
          </div>
        </div>

        <div className='flex flex-col justify-between items-start w-full gap-2 p-2'>
          <h3 className='text-base font-medium text-black'>{petReport.name}</h3>
          <p className='text-sm'>Reportes totales: {petReport.reportCount}</p>
        </div>
      </div>
    </Link>
  )
}
