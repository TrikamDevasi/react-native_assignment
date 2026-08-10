import React from "react";
import { View } from "react-native";

export default function MapComponent({ style, region, markerTitle }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    region.longitude - region.longitudeDelta
  }%2C${region.latitude - region.latitudeDelta}%2C${
    region.longitude + region.longitudeDelta
  }%2C${region.latitude + region.latitudeDelta}&layer=mapnik&marker=${
    region.latitude
  }%2C${region.longitude}`;

  // key forces iframe to reload when coordinates change
  const iframeKey = `${region.latitude}-${region.longitude}`;

  return (
    <View style={style}>
      <iframe
        key={iframeKey}
        src={mapUrl}
        style={{ width: "100%", height: "100%", border: "none", borderRadius: 10 }}
        title={markerTitle || "Map"}
      />
    </View>
  );
}
