import { useGoogleMap } from './GoogleMap'
import { useEffect } from 'react'
import { waitForCondition } from './Common'
import React from "react";

interface GeoJsonLayerProps {
  getMapFeatureStyleFunc: any
  features: any[]
  onFeatureClick: (feature: any) => void
}

function getKeyFromGeoJson(feature: any) {
  return feature.properties.key
}

function getKeyFromFeature(feature: any) {
  return feature.getProperty('key')
}

function getFeaturesToUpdate(mapFeatures: any[], newFeatures: any[]) {
  const idsToRemove: any[] = []
  const existingIds: any[] = []
  const newIds: string[] = newFeatures.map((f: any) => getKeyFromGeoJson(f))

  mapFeatures.forEach((feature: any) => {
    const id = getKeyFromFeature(feature)
    if (newIds.includes(id)) {
      existingIds.push(id)
    } else {
      idsToRemove.push(id)
    }
  })

  const featuresToAdd = newFeatures.filter(
    (x: any) => !existingIds.includes(getKeyFromGeoJson(x))
  )

  return { featuresToAdd, idsToRemove }
}

export function GeoJsonLayer(props: GeoJsonLayerProps) {
  var googleMap: any = useGoogleMap()

  const getMapData = () => {
    const mapData = googleMap.data //new (window as any).google.maps.Data()
    if (!mapData.__IS_INITIALIZED__) {
      mapData.addListener('click', function (event: any) {
        if (props.onFeatureClick) {
          props.onFeatureClick(event.feature)
        }
      })
      mapData.setStyle(props.getMapFeatureStyleFunc)
      mapData.__IS_INITIALIZED__ = true
    }

    return mapData
  }

  const showFeatures = () => {
    if (!(window as any).google) return

    const mapData = getMapData()
    const mapFeatures: any[] = []
    mapData.forEach((feature: any) => {
      mapFeatures.push(feature)
    })

    const { featuresToAdd, idsToRemove } = getFeaturesToUpdate(
      mapFeatures,
      props.features
    )

    mapData.forEach((feature: any) => {
      const key = getKeyFromFeature(feature)
      if (idsToRemove.includes(key)) {
        mapData.remove(feature)
      }
    })

    mapData.addGeoJson({
      type: 'FeatureCollection',
      features: featuresToAdd
    })
  }

  useEffect(() => {
    if (!googleMap) return
    ;(async () => {
      await waitForCondition(() => (window as any).google, 200)
      showFeatures()
    })()

  }, [googleMap])

  useEffect(() => {
    if (!googleMap) return
    showFeatures()

  }, [JSON.stringify(props.features)])

  return <div>here</div>
}
