import { Button } from '@nextui-org/react'
import MapPointIcon from '../../../components/Icons/MapPointIcon'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import PhoneIcon from '../../../components/Icons/PhoneIcon'
import formatDate from '../../../utils/formatDate'
import { PropTypes } from 'prop-types'

export default function PetReportCard ({ petReport }) {
  return (
    <div>
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
            <Button
              isIconOnly
              color='primary'
              aria-label='map-point'
              className='w-[30px] h-[30px] max-w-[30px] min-w-unit-1 rounded-md p-0'
            >
              <MapPointIcon width={20} height={20} fill='fill-white' />
            </Button>
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
    </div>
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
