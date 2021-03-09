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

function getMapFeatureStyleFunc() {
  return {
    title: 'AAAA'
  }
}

const App = () => {
  const [features, setFeatures] = React.useState<any[]>([])

  const add = () => {
    console.log('here')
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
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <GoogleMap
        gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
        mapPosition={{ lat: -34, lng: 151 }}
        zoom={10}
      >
        <GeoJsonLayer
          features={getGeoJson(features)}
          onFeatureClick={() => {}}
          getMapFeatureStyleFunc={getMapFeatureStyleFunc}
        ></GeoJsonLayer>
      </GoogleMap>
    </div>
  )
}

export default App
