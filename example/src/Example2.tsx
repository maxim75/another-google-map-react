import React from 'react'

import { GoogleMap, GeoJsonLayer } from 'another-google-map-react'

import 'another-google-map-react/dist/index.css'
import { GOOGLE_MAP_LOADER_URL } from './Common'

function getGeoJson(features: any[]) {
  return features.map((f) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [f.lng, f.lat]
      },
      properties: {
        name: 'test',
        id: f.id,
        key: f.id
      }
    }
  })
}

function getMapFeatureStyleFunc(feature: any) {
  return {
    title: feature.getProperty('id')
  }
}

const Example2 = () => {
  const [features, setFeatures] = React.useState<any[]>([])
  const [boundingBox, setBoundingBox] = React.useState<any>(null)
  const [googleMap, setGoogleMap] = React.useState<any>(null)
  const [mapCenter, setMapCenter] = React.useState<any>({ lat: -34, lng: 151 })
  const [mapZoom, setMapZoom] = React.useState<number>(10)

  const add = () => {
    setFeatures((prevFeatures) => [
      ...prevFeatures,
      {
        lat: -34 + Math.random() - 0.5,
        lng: 151 + Math.random() - 0.5,
        id: Math.floor(Math.random() * 100000000)
      }
    ])

    setFeatures((prevFeatures) =>
      prevFeatures.length > 100 ? prevFeatures.slice(1) : prevFeatures
    )
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      add()
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          setMapCenter({ lat: -34, lng: 151 })
          setMapZoom(10)
        }}
      >
        Sydney
      </button>
      <button
        onClick={() => {
          setMapCenter({ lat: 50.4, lng: 30.4 })
          setMapZoom(12)
        }}
      >
        Kyiv
      </button>
      <div>
        {JSON.stringify(boundingBox)} Google Map ref:{' '}
        {(googleMap !== null).toString()}
      </div>
      <GoogleMap
        googleMapOptions={{
          center: mapCenter,
          zoom: mapZoom,
          mapTypeId: 'roadmap',
          streetViewControl: false
        }}
        style={{ border: 'solid 1px Black', height: 'calc(100vh - 200px)' }}
        onClick={(latLng) => alert(JSON.stringify(latLng))}
        onBoundsChanged={(boundingBox) => setBoundingBox(boundingBox)}
        gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
        googleMapRef={(map) => setGoogleMap(map)}
      >
        <GeoJsonLayer
          features={getGeoJson(features)}
          onFeatureClick={(feature) => {
            alert(`Feature ID=${feature.getProperty('id')} clicked`)
          }}
          getMapFeatureStyleFunc={getMapFeatureStyleFunc}
        ></GeoJsonLayer>
      </GoogleMap>
    </div>
  )
}


export default Example2
