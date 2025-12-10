"use client";

import * as React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface MapHotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
}

interface ResultsMapProps {
  hotels: MapHotel[];
  highlightedId?: string;
}

export function ResultsMap({ hotels, highlightedId }: ResultsMapProps) {
  const [ready, setReady] = React.useState(Boolean(MAPBOX_TOKEN));

  React.useEffect(() => {
    if (typeof window !== "undefined" && !MAPBOX_TOKEN) {
      console.warn("Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map.");
    }
    setReady(Boolean(MAPBOX_TOKEN));
  }, []);

  const center = React.useMemo(() => {
    if (!hotels.length) return { latitude: 40.7128, longitude: -74.006 };
    const lat = hotels.reduce((sum, hotel) => sum + hotel.latitude, 0) / hotels.length;
    const lng = hotels.reduce((sum, hotel) => sum + hotel.longitude, 0) / hotels.length;
    return { latitude: lat, longitude: lng };
  }, [hotels]);

  if (!ready) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 text-center text-sm text-muted-foreground">
        Add a NEXT_PUBLIC_MAPBOX_TOKEN to visualize results on an interactive map.
      </div>
    );
  }

  return (
    <Map
      reuseMaps
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      initialViewState={{ ...center, zoom: hotels.length ? 8 : 3 }}
      style={{ width: "100%", height: "100%", borderRadius: "1.5rem" }}
    >
      <div className="absolute left-3 top-3">
        <NavigationControl showCompass={false} showZoom />
      </div>
      {hotels.map((hotel) => (
        <Marker key={hotel.id} latitude={hotel.latitude} longitude={hotel.longitude} anchor="bottom">
          <span
            className={cn(
              "flex flex-col items-center gap-1 text-xs font-semibold",
              highlightedId === hotel.id ? "text-emerald-600" : "text-slate-700"
            )}
          >
            <span
              className={cn(
                "rounded-full bg-white/90 px-3 py-1 shadow-lg",
                highlightedId === hotel.id ? "border border-emerald-500" : "border border-border"
              )}
            >
              ${hotel.price}
            </span>
            <span className="rounded-full bg-emerald-500/90 p-1 shadow" />
          </span>
        </Marker>
      ))}
    </Map>
  );
}
