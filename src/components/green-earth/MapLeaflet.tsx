
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { rtdb } from '@/lib/firebase';
import { ref as dbRef, onChildAdded, onChildChanged, onChildRemoved, set, onDisconnect } from 'firebase/database';
import { fixLeafletDefaultIcon } from '@/lib/leafletFix';
import throttle from 'lodash.throttle';
import type { DriverLocation } from '@/types/location';
import { Skeleton } from '@/components/ui/skeleton';

// ensure leaflet icons fixed
if (typeof window !== 'undefined') fixLeafletDefaultIcon();

type Props = {
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (loc: DriverLocation) => void;
};

// This component will contain all the map logic that uses the map instance
function MapEvents({ onMarkerClick }: { onMarkerClick?: (loc: DriverLocation) => void }) {
  const map = useMap();
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const watchIdRef = useRef<number | null>(null);

  const clientIdRef = useRef<string>(
    (() => {
      if (typeof window !== 'undefined') {
        let id = localStorage.getItem('client_id');
        if (!id) {
          id = 'c_' + Math.random().toString(36).slice(2, 9);
          localStorage.setItem('client_id', id);
        }
        return id;
      }
      return 'c_anonymous';
    })()
  );

  const animateMarker = useCallback((marker: L.Marker, toLatLng: L.LatLngExpression, ms = 2000) => {
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

  useEffect(() => {
    const locationsRef = dbRef(rtdb, 'locations/drivers');
    
    const handleAdded = (snap: any) => {
      const val: DriverLocation = snap.val();
      const id = snap.key!;
      if (!val || !val.lat || !val.lng) return;
      if (markersRef.current.has(id)) return;
      const marker = L.marker([val.lat, val.lng]);
      marker.addTo(map);
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

    const addedListener = onChildAdded(locationsRef, handleAdded);
    const changedListener = onChildChanged(locationsRef, handleChanged);
    const removedListener = onChildRemoved(locationsRef, handleRemoved);

    return () => {
      // Detach listeners - crucial for preventing memory leaks
      addedListener.unsubscribe();
      changedListener.unsubscribe();
      removedListener.unsubscribe();
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current.clear();
    };
  }, [map, onMarkerClick, animateMarker]);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
        console.log("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const latlng: [number, number] = [p.coords.latitude, p.coords.longitude];
        map.setView(latlng, map.getZoom(), { animate: true });
      },
      (err) => {
        console.warn('getCurrentPosition error', err);
        // Fallback to Jakarta is handled by the initial center prop of MapContainer
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
        map.setView([lat, lng]);
        writeLocationThrottled(lat, lng);
      },
      (err) => {
        console.warn('watchPosition error', err);
      },
      { enableHighAccuracy: true }
    );

    watchIdRef.current = watchId;

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      writeLocationThrottled.cancel();
      const myId = clientIdRef.current;
      const path = `locations/drivers/${myId}`;
      const dbPathRef = dbRef(rtdb, path);
      set(dbPathRef, null);
    };
  }, [map]);

  return null; // This component does not render anything itself
}

export function MapLeaflet({ center = [-6.2088, 106.8456], zoom = 15, onMarkerClick }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
        console.log("Geolocation not supported, using default center.");
        setPosition(center);
        return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPosition([p.coords.latitude, p.coords.longitude]);
      },
      (err) => {
        console.warn('Could not get position, using default.', err);
        setPosition(center);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  }, [center]);


  return (
    <div className="w-full h-[calc(100vh-150px)] rounded-lg overflow-hidden shadow-md">
      {position ? (
        <MapContainer
          center={position}
          zoom={zoom}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
          />
          <MapEvents onMarkerClick={onMarkerClick} />
        </MapContainer>
      ) : (
        <Skeleton className="w-full h-full bg-muted" />
      )}
    </div>
  );
}
