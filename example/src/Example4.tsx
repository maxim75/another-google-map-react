import React, { useState } from 'react'
import { GoogleMap, PlaceSearch } from 'another-google-map-react'
import { GOOGLE_MAP_LOADER_URL } from './Common'

export default function Example4() {
  const [googleMap, setGoogleMap] = useState(null)

  return (
    <>
      <PlaceSearch
        useGoogleMap={true}
        onPlaceSelected={(place) => {
          console.log('place', place)
        }}
        googleMap={googleMap}
        style={{ width: '400px', fontSize: '24px' }}
      />
      <GoogleMap
        googleMapOptions={{
          center: { lat: -34, lng: 151, key: '1' },
          zoom: 15,
          mapTypeId: 'roadmap',
          streetViewControl: false
        }}
        style={{ border: 'solid 1px Black', height: '400px', width: '400px' }}
        onClick={(latLng) => alert(JSON.stringify(latLng))}
        onBoundsChanged={() => {}}
        gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
        googleMapRef={(map) => setGoogleMap(map)}
      ></GoogleMap>
    </>
  )
}
