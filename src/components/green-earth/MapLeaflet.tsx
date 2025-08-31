// components/green-earth/MapLeaflet.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { rtdb } from '@/lib/firebase';
import { ref as dbRef, onChildAdded, onChildChanged, onChildRemoved, set, onDisconnect } from 'firebase/database';
import { fixLeafletDefaultIcon } from '@/lib/leafletFix';
import throttle from 'lodash.throttle';
import type { DriverLocation } from '@/types/location';

// ensure leaflet icons fixed
if (typeof window !== 'undefined') fixLeafletDefaultIcon();

type Props = {
  center?: [number, number] | null;
  zoom?: number;
  // optionally pass a function for when a location is clicked
  onMarkerClick?: (loc: DriverLocation) => void;
};

function Recenter({ latlng }: { latlng: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!latlng) return;
    map.setView(latlng, map.getZoom(), { animate: true });
  }, [latlng, map]);
  return null;
}

export function MapLeaflet({ center = null, zoom = 15, onMarkerClick }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(center);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const mapRef = useRef<L.Map | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // keep a stable client id for non-auth flows
  const clientIdRef = useRef<string>(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('client_id');
      if (!id) {
        id = 'c_' + Math.random().toString(36).slice(2, 9);
        localStorage.setItem('client_id', id);
      }
      return id;
    }
    return 'c_anonymous';
  }) as React.MutableRefObject<string>;

  // helper: animate marker
  const animateMarker = useCallback((marker: L.Marker, toLatLng: L.LatLngExpression, ms = 400) => {
    try {
      const from = marker.getLatLng();
      const to = L.latLng(toLatLng as any);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const lat = from.lat + (to.lat - from.lat) * t;
        const lng = from.lng + (to.lng - from.lng) * t;
        marker.setLatLng([lat, lng]);
        if (t < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    } catch (e) {
        console.error("Animation failed", e);
      marker.setLatLng(toLatLng);
    }
  }, []);

  // subscribe to Realtime DB: drivers locations
  useEffect(() => {
    const locationsRef = dbRef(rtdb, 'locations/drivers');
    
    const handleAdded = (snap: any) => {
      const val: DriverLocation = snap.val();
      const id = snap.key!;
      if (!val || !val.lat || !val.lng || !mapRef.current) return;
      if (markersRef.current.has(id)) return; // already exists
      const marker = L.marker([val.lat, val.lng]);
      marker.addTo(mapRef.current!);
      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(val));
      }
      markersRef.current.set(id, marker);
    };

    const handleChanged = (snap: any) => {
      const val: DriverLocation = snap.val();
      const id = snap.key!;
      if (!markersRef.current.has(id)) return;
      const marker = markersRef.current.get(id)!;
      animateMarker(marker, [val.lat, val.lng], 2000);
    };

    const handleRemoved = (snap: any) => {
      const id = snap.key!;
      const marker = markersRef.current.get(id);
      if (marker) {
        marker.remove();
        markersRef.current.delete(id);
      }
    };

    onChildAdded(locationsRef, handleAdded);
    onChildChanged(locationsRef, handleChanged);
    onChildRemoved(locationsRef, handleRemoved);

    // In a real app with auth, you'd manage listener cleanup more granularly.
    // For this dev component, listeners are cleaned up on component unmount.
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current.clear();
    };
  }, [onMarkerClick, animateMarker]);

  // geolocation: center map on user and optionally write location as "driver"
  useEffect(() => {
    if (!('geolocation' in navigator)) {
        console.log("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const latlng: [number, number] = [p.coords.latitude, p.coords.longitude];
        setPosition(latlng);
      },
      (err) => {
        console.warn('getCurrentPosition error', err);
        // Fallback to a default location if permission is denied
        setPosition([-6.2088, 106.8456]); // Jakarta
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    const writeLocationThrottled = throttle((lat: number, lng: number) => {
      const myId = clientIdRef.current;
      const path = `locations/drivers/${myId}`;
      const locationData: DriverLocation = {
        id: myId,
        lat,
        lng,
        updatedAt: Date.now(),
      };
      
      const dbPathRef = dbRef(rtdb, path);

      set(dbPathRef, locationData).catch(e => console.error("Write failed", e));
      onDisconnect(dbPathRef).remove().catch(e => console.error("onDisconnect failed", e));
    }, 3000, { leading: true, trailing: true });

    const watchId = navigator.geolocation.watchPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lng = p.coords.longitude;
        setPosition([lat, lng]);
        writeLocationThrottled(lat, lng);
      },
      (err) => {
        console.warn('watchPosition error', err);
      },
      { enableHighAccuracy: true }
    );

    watchIdRef.current = watchId;
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      writeLocationThrottled.cancel();
      // Also remove my marker on unmount
       const myId = clientIdRef.current;
       const marker = markersRef.current.get(myId);
        if (marker) {
            marker.remove();
            markersRef.current.delete(myId);
        }
    };
  }, []);

  return (
    <div className="w-full h-[calc(100vh-150px)] rounded-lg overflow-hidden shadow-md">
      {position ? (
        <MapContainer
          center={position}
          zoom={zoom}
          ref={mapRef}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          />
          <Recenter latlng={position} />
        </MapContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            <p>Locating you...</p>
        </div>
      )}
    </div>
  );
}
