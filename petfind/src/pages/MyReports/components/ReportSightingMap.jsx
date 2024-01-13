import { GoogleMap, HeatmapLayerF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config/config'
import { PropTypes } from 'prop-types'
import React, { useEffect } from 'react'

export default function ReportSightingMap ({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  })

  const [heatMapData, setHeatMapData] = React.useState([])

  console.log(coordinates)

  const defaultLocation = {
    lat: -16.3989200592041,
    lng: -71.5367660522461
  }

  useEffect(() => {
    if (isLoaded && coordinates !== undefined && coordinates.length > 0) {
      const heatMapData = coordinates.map((coordinate) => {
        return new window.google.maps.LatLng(coordinate.lat, coordinate.lng)
      })
      setHeatMapData(heatMapData)
      console.log(heatMapData)
    }
  }, [isLoaded, coordinates])

  if (!isLoaded) {
    return <div className='w-full h-[400px] my-4 animate-pulse' />
  }

  return (
    <div className='w-full h-[400px] my-4'>
      {heatMapData.length > 0 && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          zoom={15}
          center={defaultLocation}
        >
          <HeatmapLayerF data={heatMapData} options={{ radius: 60 }} />
          {coordinates.map((coordinate, index) => (
            <MarkerF key={index} position={coordinate} />
          ))}
        </GoogleMap>
      )}
      {heatMapData.length === 0 && (
        <div className='w-full h-[400px] border-2 border-dashed rounded-md border-neutral-500 flex justify-center items-center my-4'>
          <p>Sin avistamientos</p>
        </div>
      )}
    </div>
  )
}

ReportSightingMap.propTypes = {
  idPetReport: PropTypes.string
}
