import { Button, Tooltip } from '@nextui-org/react'
import MapPointIcon from '../../../components/Icons/MapPointIcon'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import PhoneIcon from '../../../components/Icons/PhoneIcon'
import formatDate from '../../../utils/formatDate'
import { PropTypes } from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

export default function PetReportCard ({ petReport }) {
  const navigate = useNavigate()

  const handleReportPage = () => {
    navigate(`/lost-pet-report/${petReport.id}/new-sighting`)
  }

  return (
    <Link to={`/lost-pet-report/${petReport.id}`}>
      <div className='w-[200px] h-[260px] rounded-md shadow-lg'>
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
            <Tooltip placement='top' content='Reportar'>
              <Button
                isIconOnly
                className='rounded-md font-bold bg-[#F87272] hover:bg-[#F87272]'
                onPress={handleReportPage}
              >
                <MapPointIcon width={20} height={20} fill='fill-white' />
              </Button>
            </Tooltip>
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
    </Link>
  )
}

PetReportCard.propTypes = {
  petReport: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    lossDate: PropTypes.string,
    phone: PropTypes.string
  })
}
