import { useEffect, useRef, useState, createContext, useContext } from 'react'
import * as React from 'react'

export interface LatLng {
  lat: number
  lng: number
}

export const GoogleMapInstance = createContext(null)
const isOnClient = typeof window !== 'undefined'

export function useGoogleMap() {
  return useContext(GoogleMapInstance)
}

export interface GoogleMapProps {
  mapPosition: LatLng
  zoom: number
  gooleMapLoaderUrl: string
  children: any
}

function loadScript(url: string) {
  if (isOnClient && typeof (window as any).google !== 'undefined') {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = resolve
    document.head.appendChild(script)
  })
}

export const GoogleMap = (props: GoogleMapProps) => {
  const mapEl = useRef(null)
  var [googleMapInstance, setGoogleMapInstance] = useState(null)

  useEffect(() => {
    if (!isOnClient) return
    async function load() {
      await loadScript(props.gooleMapLoaderUrl)

      const google = (window as any).google

      const map = new google.maps.Map(mapEl.current, {
        center: { lat: props.mapPosition.lat, lng: props.mapPosition.lng },
        zoom: props.zoom,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        mapId: '953062f907135420'
      })
      setGoogleMapInstance(map)
    }
    load()
  }, [])

  return <div>
    <div
      style={{ top: '0', height: '100vh', border: 'solid 1px Black' }}
      ref={mapEl}
    ></div>
    <GoogleMapInstance.Provider value={googleMapInstance}>
      {isOnClient && props.children}
    </GoogleMapInstance.Provider>
  </div>
}
