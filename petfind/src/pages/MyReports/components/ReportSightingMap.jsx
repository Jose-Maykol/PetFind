import { useEffect, useState } from 'react'
import PetReportService from '../../../services/PetReportService'
import { useQuery } from 'react-query'
import { GoogleMap, HeatmapLayer, HeatmapLayerF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config/config'
import { PropTypes } from 'prop-types'

export default function ReportSightingMap ({ idPetReport }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  })

  const [petReportSighting, setPetReportSighting] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [markers, setMarkers] = useState([])
  useQuery(['petReportSighting', idPetReport], () => {
    if (idPetReport !== null) {
      return PetReportService.getReportsSightings(idPetReport)
    }
    return null
  }, {
    retry: 2,
    // staleTime: Infinity,
    enabled: !!idPetReport,
    onSuccess: (res) => {
      setPetReportSighting(res.data)
    }
  })

  useEffect(() => {
    if (petReportSighting !== null) {
      setCoordinates(
        petReportSighting.map((report) => {
          return new window.google.maps.LatLng(report.reportCoordinates.x, report.reportCoordinates.y)
        })
      )
      setMarkers(
        petReportSighting.map((report) => {
          return {
            position: new window.google.maps.LatLng(report.reportCoordinates.x, report.reportCoordinates.y),
            title: report.userName
          }
        })
      )
    }
  }, [petReportSighting])

  const defaultLocation = {
    lat: -16.3989200592041,
    lng: -71.5367660522461
  }

  if (!petReportSighting) {
    return null
  }

  if (petReportSighting.length === 0) {
    return (
      <div className='w-full h-[400px] border-2 border-dashed rounded-md border-neutral-500 flex justify-center items-center'>
        <p>Sin avistamientos</p>
      </div>
    )
  }

  return (
    <div className='w-full h-[400px]'>
      {isLoaded && petReportSighting &&
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          zoom={15}
          center={defaultLocation}
        >
          <HeatmapLayerF data={coordinates} />
          {markers.map((markers, index) => (
            <MarkerF
              key={index}
              position={markers.position}
              title={markers.title}
            />
          ))}
        </GoogleMap>}
    </div>
  )
}

ReportSightingMap.propTypes = {
  idPetReport: PropTypes.string
}
