import React from "react"
import { GoogleMap, GeoJsonLayer } from 'another-google-map-react'
import { GOOGLE_MAP_LOADER_URL } from "./Common"

export default function Example1() {
    return <GoogleMap
        googleMapOptions={{
          center: { lat: -34, lng: 151, key: "1" },
          zoom: 15,
          mapTypeId: 'roadmap',
          streetViewControl: false,
        }}
        style={{ border: 'solid 1px Black', height: '400px', width: '400px' }}
        onClick={(latLng) => alert(JSON.stringify(latLng))}
        onBoundsChanged={() => {}}
        gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
        googleMapRef={() => {}}
      >
        <GeoJsonLayer
          features={[{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [151, -34]
            },
            properties: {
              id: 'test',
            }
          }]}
          onFeatureClick={(feature) => {
            alert(`Feature ID=${feature.getProperty('id')} clicked`)
          }}
          getMapFeatureStyleFunc={() => ({ title: "test" })}
        ></GeoJsonLayer>
      </GoogleMap>
}
