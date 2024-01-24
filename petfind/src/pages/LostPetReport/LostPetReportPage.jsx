import { useQuery } from 'react-query'
import { Link, Navigate, useParams } from 'react-router-dom'
import PetReportService from '../../services/PetReportService'
import formatDate from '../../utils/formatDate'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../config/config'
import useAuthStore from '../../store/useAuthStore'
import { Spinner } from '@nextui-org/react'

export default function LostPetReportPage () {
  const { isLoged } = useAuthStore()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  })

  const params = useParams()
  const { id } = params

  const { data, isLoading } = useQuery(['petReportDetail', id], () => PetReportService.getPetReport(id), {
    retry: 2,
    staleTime: Infinity
  })

  if (isLoged === false) {
    return (
      <Navigate to='/' />
    )
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
    <div className='w-screen max-w-full flex flex-col items-center justify-center py-2'>
      <div className='max-w-[700px]'>
        <div className='flex flex-row justify-between pb-4'>
          <h2 className='font-bold text-lg'>{data.data.petReport.name}</h2>
          <Link
            to={`/lost-pet-report/${data.data.petReport.id}/new-sighting`}
            className='rounded-md px-4 py-2 font-bold text-white text-sm bg-[#F87272] hover:bg-[#F87272]'
          >
            Reportar avistamiento
          </Link>
        </div>
        <div className='flex flex-col gap-2 text-neutral-400'>
          <div className='flex flex-col sm:flex-row gap-6 items-center'>
            <img
              className='w-[250px] h-[250px] object-cover rounded-md'
              src={data.data.petReport.photo}
              alt={data.data.petReport.name}
              width={250}
              height={250}
            />
            <div className='flex flex-col flex-1 gap-2 py-4'>
              <div>
                <h3 className='font-semibold text-small'>Descripcion</h3>
                <p className='flex flex-row rounded-lg bg-neutral-100 py-2 px-3 my-1'>{data.data.petReport.description}</p>
              </div>
              <div>
                <h3 className='font-semibold text-small'>Tipo de mascota</h3>
                <p className='capitalize rounded-lg bg-neutral-100 h-10 py-2 px-3 my-1'>{data.data.petReport.petTypeTag}</p>
              </div>
              <div className='flex flex-row gap-2 items-end justify-between'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-small'>Fecha de desaparicion</h3>
                  <p className='rounded-lg bg-neutral-100 h-10 py-2 px-3 my-1'>{formatDate(data.data.petReport.lossDate)}</p>
                </div>
                <div>
                  <h3 className='font-semibold text-small'>Edad</h3>
                  <p className='rounded-lg bg-neutral-100 h-10 py-2 px-3 my-1'>{`${data.data.petReport.ageYears} años ${data.data.petReport.ageMonths} meses`}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-small'>Telefono</h3>
            <p className='flex flex-row rounded-lg bg-neutral-100 py-2 px-3 my-1'>{data.data.petReport.phone}</p>
          </div>
          <div>
            <h3 className='font-semibold text-small'>Recompensa</h3>
            <p className='flex flex-row rounded-lg bg-neutral-100 py-2 px-3 my-1'>{data.data.petReport.reward}</p>
          </div>
          <div>
            <h3 className='font-semibold text-small'>Ubicacion</h3>
            {isLoaded &&
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: data.data.petReport.coordinates.x, lng: data.data.petReport.coordinates.y }}
                zoom={15}
              >
                <MarkerF position={{ lat: data.data.petReport.coordinates.x, lng: data.data.petReport.coordinates.y }} />
              </GoogleMap>}
          </div>
        </div>
      </div>
    </div>
  )
}
