import { useGoogleMap } from "./GoogleMap";
import { useEffect, useState } from "react";

interface GeoJsonLayerProps {
  getMapFeatureStyleFunc: any;
  features: any[];
  onFeatureClick: (feature: any) => void;
}

function getKeyFromGeoJson(feature: any) {
  return feature.properties.key;
}

function getKeyFromFeature(feature: any) {
  return feature.getProperty("key");
}

function getFeaturesToUpdate(mapFeatures: any[], newFeatures: any[]) {
  const idsToRemove: any[] = [];
  const existingIds: any[] = [];
  const newIds: string[] = newFeatures.map((f: any) => getKeyFromGeoJson(f));

  mapFeatures.forEach((feature: any) => {
    const id = getKeyFromFeature(feature);
    if (newIds.includes(id)) {
      existingIds.push(id);
    } else {
      idsToRemove.push(id);
    }
  });

  const featuresToAdd = newFeatures.filter(
    (x: any) => !existingIds.includes(getKeyFromGeoJson(x))
  );

  return { featuresToAdd, idsToRemove };
}

export function GeoJsonLayer(props: GeoJsonLayerProps) {
  var googleMap = useGoogleMap();

  let [mapData, setMapData] = useState<any>(null);

  if ((window as any).google && mapData == null) {
    mapData = new (window as any).google.maps.Data();

    mapData.addListener("click", function (event: any) {
      if (props.onFeatureClick) {
        props.onFeatureClick(event.feature);
      }
    });

    setMapData(mapData);
    mapData.setMap(googleMap);
    mapData.setStyle(props.getMapFeatureStyleFunc);
  }

  const showFeatures = () => {
    if (!(window as any).google) return;

    const mapFeatures: any[] = [];
    mapData.forEach((feature: any) => {
      mapFeatures.push(feature);
    });

    const { featuresToAdd, idsToRemove } = getFeaturesToUpdate(
      mapFeatures,
      props.features
    );

    mapData.forEach((feature: any) => {
      const key = getKeyFromFeature(feature);
      if (idsToRemove.includes(key)) {
        mapData.remove(feature);
      }
    });

    mapData.addGeoJson({
      type: "FeatureCollection",
      features: featuresToAdd,
    });
  }

  useEffect(() => {
    showFeatures();
  }, [JSON.stringify(props.features)]);

  useEffect(() => {
    showFeatures();
  }, []);

  return null;
}
