import { useEffect, useRef, useState, createContext, useContext } from 'react'
import * as React from 'react'
import CSS from 'csstype'
import { BoundingBox, LatLng } from './Models'

export const GoogleMapInstance = createContext(null)
const isOnClient = typeof window !== 'undefined'

export function useGoogleMap() {
  return useContext(GoogleMapInstance)
}

export interface GoogleMapProps {
  style: CSS.Properties
  googleMapOptions: any
  gooleMapLoaderUrl: string
  onBoundsChanged?: (boundingBox: BoundingBox) => void
  onClick?: (latLng: LatLng, event: any) => void
  googleMapRef?: (map: any) => void
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

  var [googleMapInstance, setGoogleMapInstance] = useState<any>(null)

  useEffect(() => {
    if (!googleMapInstance) return;

    const google = (window as any).google;
    const center = new google.maps.LatLng(
      props.googleMapOptions.center.lat,
      props.googleMapOptions.center.lng
    )
    googleMapInstance.panTo(center)
  }, [props.googleMapOptions.center])

  useEffect(() => {
    if (!googleMapInstance) return;
    googleMapInstance.setZoom(props.googleMapOptions.zoom)
  }, [props.googleMapOptions.zoom])

  useEffect(() => {
    if (!isOnClient) return

    async function load() {
      await loadScript(props.gooleMapLoaderUrl)
      const google = (window as any).google
      const map = new google.maps.Map(mapEl.current, props.googleMapOptions)
      setGoogleMapInstance(map)
      if (props.googleMapRef) {
        props.googleMapRef(map)
      }

      map.addListener('bounds_changed', () => {
        const mapBounds = map.getBounds()
        const boundingBox = {
          east: mapBounds.getNorthEast().lng(),
          west: mapBounds.getSouthWest().lng(),
          south: mapBounds.getSouthWest().lat(),
          north: mapBounds.getNorthEast().lat()
        }

        props.onBoundsChanged && props.onBoundsChanged(boundingBox)
      })
      map.addListener('click', (e: any) => {
        const latLng: LatLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
        props.onClick && props.onClick(latLng, e)
      })
    }
    load()
  }, [])

  return (
    <div>
      <div style={props.style} ref={mapEl}></div>
      <GoogleMapInstance.Provider value={googleMapInstance}>
        {isOnClient && props.children}
      </GoogleMapInstance.Provider>
    </div>
  )
}
