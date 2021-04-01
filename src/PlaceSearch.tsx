import * as React from 'react'
import { LatLng } from './Models'

export interface PlaceSearchProps {
  googleMap: any
  style?: React.CSSProperties
  onPlaceSelected: (placeDetails: PlaceDetails) => void
}

export interface PlaceDetails {
  latLng: LatLng,
  place: any
}

export function PlaceSearch(props: PlaceSearchProps) {
  const [searchtext, setSearchtext] = React.useState('')

  const onInputRef = (ref: any) => {
    if (ref == null || props.googleMap == null) return

    if ((window as any).google && (window as any).google.maps) {
      const searchBox = new (window as any).google.maps.places.SearchBox(ref)
      searchBox.bindTo('bounds', props.googleMap)
      searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]

        const latLng: LatLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        props.onPlaceSelected({ latLng, place })

        props.googleMap.fitBounds(place.geometry.viewport)
        setTimeout(() => {
          setSearchtext('')
        }, 500)
      })
    }
  }

  return (
    <input
      style={props.style}
      type='text'
      ref={onInputRef}
      value={searchtext}
      onChange={(e) => setSearchtext(e.target.value)}
    ></input>
  )
}
