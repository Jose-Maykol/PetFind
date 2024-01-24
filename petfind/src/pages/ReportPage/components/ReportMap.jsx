import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config/config'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

export default function ReportMap ({ initialPosition }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  })

  const defaultLocation = initialPosition || {
    lat: -16.3989200592041,
    lng: -71.5367660522461
  }

  const [markerPosition, setMarkerPosition] = useState(defaultLocation)

  const handleMapClick = (event) => {
    console.log(event)
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setMarkerPosition({ lat, lng })
  }

  return (
    <div className='w-full h-[400px]'>
      {isLoaded &&
        <GoogleMap
          onClick={(event) => handleMapClick(event)}
          mapContainerStyle={{ width: '100%', height: '400px' }}
          zoom={15}
          center={defaultLocation}
        >
          {markerPosition && <MarkerF position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />}
        </GoogleMap>}
      <input type='hidden' name='lat' value={markerPosition.lat} />
      <input type='hidden' name='lng' value={markerPosition.lng} />
    </div>
  )
}

ReportMap.propTypes = {
  initialPosition: PropTypes.object
}
