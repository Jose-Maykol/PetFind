import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '../../../config/config'

export default function ReportMap () {
  const defaultLocation = {
    lat: -16.3989200592041,
    lng: -71.5367660522461
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={15}
        center={defaultLocation}
      >
        <Marker position={defaultLocation} />
      </GoogleMap>
    </LoadScript>
  )
}
