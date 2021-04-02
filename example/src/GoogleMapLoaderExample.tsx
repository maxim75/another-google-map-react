import * as React from 'react'
import { GoogleApiLoader, PlaceSearch } from 'another-google-map-react'
import { GOOGLE_MAP_LOADER_URL } from './Common'
export default function GoogleMapLoaderExample() {
  return (
    <>
      <GoogleApiLoader gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}>
        {console.log("???", (window as any).google)}
        {(window as any).google == null} 
        <PlaceSearch
          onPlaceSelected={(place) => {
            console.log('place', place)
          }}
          googleMap={null}
          style={{ width: '400px', fontSize: '24px' }}
        />
        
      </GoogleApiLoader>
    </>
  )
}
