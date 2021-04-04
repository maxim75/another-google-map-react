import { useEffect, useRef, useState, createContext, useContext } from 'react'
import * as React from 'react'
import CSS from 'csstype'
import { BoundingBox, LatLng } from './Models'
import { isOnClient, loadScript, waitForCondition } from './Common'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const GoogleMapInstance = createContext(null)

function getGoogleLatLngBounds(boundingBox: BoundingBox) {
  return new (window as any).google.maps.LatLngBounds(
    { lat: boundingBox.south, lng: boundingBox.west },
    { lat: boundingBox.north, lng: boundingBox.east }
  );
}

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
  children?: any
}

export const GoogleMap = (props: GoogleMapProps) => {
  const mapEl = useRef(null)

  var [googleMapInstance, setGoogleMapInstance] = useState<any>(null)

  useEffect(() => {
    if (!googleMapInstance) return
    const google = (window as any).google

    const center = new google.maps.LatLng(
      props.googleMapOptions.center.lat,
      props.googleMapOptions.center.lng
    )
    googleMapInstance.panTo(center)
  }, [props.googleMapOptions.center])

  useDeepCompareEffect(() => { 
    if (!googleMapInstance) return
    const bounds = getGoogleLatLngBounds(props.googleMapOptions.boundingBox)
    googleMapInstance.fitBounds(bounds);
  }, [props.googleMapOptions.boundingBox || {}])

  useEffect(() => {
    if (!googleMapInstance) return
    googleMapInstance.setZoom(props.googleMapOptions.zoom)
  }, [props.googleMapOptions.zoom])

  useEffect(() => {
    if (!isOnClient) return

    async function load() {
      if ((window as any).__LOADING_GOOGLEMAP__) {
        await waitForCondition(() => (window as any).google, 100)
      } else {
        (window as any).__LOADING_GOOGLEMAP__ = true
        await loadScript(props.gooleMapLoaderUrl)
      }

      const google = (window as any).google
      const map = new google.maps.Map(mapEl.current, props.googleMapOptions)
      setGoogleMapInstance(map)

      if(props.googleMapOptions.boundingBox) {
        const bounds = getGoogleLatLngBounds(props.googleMapOptions.boundingBox);
        map.fitBounds(bounds);
      }


      if (props.googleMapRef) {
        props.googleMapRef(map)
      }

      map.addListener('bounds_changed', () => {
        const mapBounds = map.getBounds()
        if(!mapBounds) return;
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
    <div style={props.style} ref={mapEl}>
      <GoogleMapInstance.Provider value={googleMapInstance}>
        {isOnClient && props.children}
      </GoogleMapInstance.Provider>
    </div>
  )
}
