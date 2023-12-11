import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config/config'
import { useState } from 'react'

export default function ReportMap () {
  const defaultLocation = {
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
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          onClick={(event) => handleMapClick(event)}
          mapContainerStyle={{ width: '100%', height: '400px' }}
          zoom={15}
          center={defaultLocation}
        >
          {markerPosition && <MarkerF position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />}
        </GoogleMap>
      </LoadScript>
      <input type='hidden' name='lat' value={markerPosition.lat} />
      <input type='hidden' name='lng' value={markerPosition.lng} />
    </div>
  )
}
