import React from 'react'

import { GoogleMap, GeoJsonLayer } from 'another-google-map-react'

import 'another-google-map-react/dist/index.css'

const GOOGLE_MAP_LOADER_URL = `https://maps.googleapis.com/maps/api/js?v=beta&libraries=places`

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

const App = () => {
  const [features, setFeatures] = React.useState<any[]>([])
  const [boundingBox, setBoundingBox] = React.useState<any>(null)

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
      <div>{JSON.stringify(boundingBox)}</div>
      <GoogleMap
        googleMapOptions={{
          center: { lat: -34, lng: 151 },
          zoom: 10,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          mapId: '953062f907135420'
        }}
        style={{ border: 'solid 1px Black', height: 'calc(100vh - 200px)' }}
        onClick={(latLng) => alert(JSON.stringify(latLng))}
        onBoundsChanged={(boundingBox) => setBoundingBox(boundingBox)}
        gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
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

export default App
