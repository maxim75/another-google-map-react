# another-google-map-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/another-google-map-react.svg)](https://www.npmjs.com/package/another-google-map-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save another-google-map-react
```

## Usage

```tsx
import React from 'react'
import { GoogleMap, GeoJsonLayer } from 'another-google-map-react'

const GOOGLE_MAP_LOADER_URL = `https://maps.googleapis.com/maps/api/js?v=beta&libraries=places`

<GoogleMap
  googleMapOptions={{
    center: { lat: -34, lng: 151 },
    zoom: 10,
    mapTypeId: 'roadmap',
    streetViewControl: false
  }}
  style={{}}
  onClick={(latLng) => alert(JSON.stringify(latLng))}
  onBoundsChanged={(boundingBox) => {}}
  gooleMapLoaderUrl={GOOGLE_MAP_LOADER_URL}
  googleMapRef={(map) => {}}
></GoogleMap>
```

## License

MIT © [maxim75](https://github.com/maxim75)
