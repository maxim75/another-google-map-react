import React from 'react'
import { GoogleMap, GeoJsonLayer, BoundingBox } from 'another-google-map-react'
import { GOOGLE_MAP_LOADER_URL } from './Common'

const boundingBox: BoundingBox = {
  south: -34.1,
  north: -34,
  east: 151.1,
  west: 151
}

export default function Example3() {
  const [showMap, setShowMap] = React.useState(true)
  return (
    <div>
      <button onClick={() => setShowMap((x) => !x)}>Toggle</button>
      {showMap && (
        <GoogleMap
          googleMapOptions={{
            coordinates: [0, 0],
            boundingBox: boundingBox,
            zoom: 15,
            mapTypeId: 'roadmap',
            streetViewControl: false
          }}
          style={{ border: 'solid 1px Black', height: '400px', width: '400px' }}
          onClick={(latLng) => alert(JSON.stringify(latLng))}
          onBoundsChanged={() => {}}
          gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
          googleMapRef={() => {}}
        >
          <GeoJsonLayer
            features={[
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [151, -34]
                },
                properties: {
                  key: 'point',
                  id: 'point'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [151, -34.1],
                      [151.1, -34.1],
                      [151.1, -34],
                      [151, -34],
                      [151, -34.1]
                    ]
                  ]
                },
                properties: {
                  key: 'polygon',
                  id: 'polygon'
                }
              }
            ]}
            onFeatureClick={(feature) => {
              console.log(`Feature ID=${feature.getProperty('id')} clicked`)
            }}
            getMapFeatureStyleFunc={() => ({ title: 'test' })}
          ></GeoJsonLayer>
        </GoogleMap>
      )}
    </div>
  )
}
