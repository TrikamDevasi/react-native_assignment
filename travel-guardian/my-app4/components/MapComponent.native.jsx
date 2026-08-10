import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapComponent({ style, region, markerTitle }) {
  return (
    <MapView style={style} region={region}>
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title={markerTitle}
      />
    </MapView>
  );
}
