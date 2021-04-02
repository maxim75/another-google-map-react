import * as React from 'react'
import { GoogleApiLoader, PlaceSearch } from 'another-google-map-react'
import { GOOGLE_MAP_LOADER_URL } from './Common'
export default function GoogleMapLoaderExample() {
  return (
    <>
      <GoogleApiLoader gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}>
        <PlaceSearch
          useGoogleMap={false}
          onPlaceSelected={(place) => {
            console.log('place', place)
          }}
          googleMap={null}
          style={{ width: '400px', fontSize: '24px' }}
          placeholder="Enter location"
        />
      </GoogleApiLoader>
    </>
  )
}
