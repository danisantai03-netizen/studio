
'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { rtdb } from '@/lib/firebase';
import { ref as dbRef, onChildAdded, onChildChanged, onChildRemoved, set, onDisconnect, Unsubscribe } from 'firebase/database';
import { fixLeafletDefaultIcon } from '@/lib/leafletFix';
import throttle from 'lodash.throttle';
import type { DriverLocation } from '@/types/location';
import { cn } from '@/lib/utils';

// Call the icon fix immediately
fixLeafletDefaultIcon();

// This is the definitive fix for the "Map container is already initialized" error.
// The component is rewritten from scratch to manage the Leaflet instance manually
// and ensure a robust cleanup, which is critical for React Strict Mode.
export default function MapLeaflet() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const clientIdRef = useRef<string | null>(null);

  // Helper function to smoothly animate marker movement
  const animateMarker = (marker: L.Marker, toLatLng: L.LatLngExpression) => {
    const from = marker.getLatLng();
    const to = L.latLng(toLatLng as any);
    const duration = 2000; // 2 seconds for smooth transition
    const start = performance.now();
    
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const lat = from.lat + (to.lat - from.lat) * t;
      const lng = from.lng + (to.lng - from.lng) * t;
      marker.setLatLng([lat, lng]);
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };
  
  // The main useEffect hook that manages the entire lifecycle of the map
  useEffect(() => {
    // 1. --- INITIALIZATION ---
    // Only run if the container ref exists and the map isn't already initialized.
    if (mapContainerRef.current && !mapRef.current) {
        // Initialize the map on the container
        const map = L.map(mapContainerRef.current, {
            center: [-6.2088, 106.8456], // Default to Jakarta
            zoom: 13,
            scrollWheelZoom: true,
            touchZoom: true, // This is crucial for pinch-to-zoom on touch devices
            zoomControl: false // Disable default zoom control
        });
        mapRef.current = map;

        // Add the OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Ensure map resizes correctly after initial render. This is critical.
        requestAnimationFrame(() => {
            setTimeout(() => {
                map.invalidateSize();
            }, 10);
        });

        // Set a stable client ID for this session
        if (!clientIdRef.current) {
          clientIdRef.current = 'c_' + Math.random().toString(36).slice(2, 9);
        }
        const myId = clientIdRef.current;
        
        // 2. --- REALTIME DATABASE LISTENERS ---
        const locationsRef = dbRef(rtdb, 'locations/drivers');
        const listeners: Unsubscribe[] = [];
        
        listeners.push(onChildAdded(locationsRef, (snap) => {
            const val: DriverLocation = snap.val();
            const id = snap.key!;
            if (mapRef.current && val?.lat && val.lng && !markersRef.current.has(id)) {
                const marker = L.marker([val.lat, val.lng]).addTo(mapRef.current);
                markersRef.current.set(id, marker);
            }
        }));

        listeners.push(onChildChanged(locationsRef, (snap) => {
            const val: DriverLocation = snap.val();
            const id = snap.key!;
            const marker = markersRef.current.get(id);
            if (marker && val?.lat && val.lng) {
                animateMarker(marker, [val.lat, val.lng]);
            }
        }));
        
        listeners.push(onChildRemoved(locationsRef, (snap) => {
            const id = snap.key!;
            const marker = markersRef.current.get(id);
            if (marker) {
                marker.remove();
                markersRef.current.delete(id);
            }
        }));

        // 3. --- GEOLOCATION AND USER POSITION ---
        let watchId: number | null = null;
        if ('geolocation' in navigator) {
            // Write user's location to Firebase, throttled to every 3 seconds
            const writeLocationThrottled = throttle((lat: number, lng: number) => {
                const path = `locations/drivers/${myId}`;
                const dbPathRef = dbRef(rtdb, path);
                const locationData: DriverLocation = { id: myId, lat, lng, updatedAt: Date.now() };
                set(dbPathRef, locationData);
                onDisconnect(dbPathRef).remove();
            }, 3000, { leading: true, trailing: true });

            // Get current position once to center the map
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    mapRef.current?.setView([latitude, longitude], 15, { animate: true });
                },
                () => {}, // Error handler
                { enableHighAccuracy: true }
            );

            // Watch for position changes
            watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    writeLocationThrottled(latitude, longitude);
                },
                () => {}, // Error handler
                { enableHighAccuracy: true }
            );
        }
        
        // 4. --- CLEANUP FUNCTION ---
        // This is the most critical part. It runs when the component unmounts.
        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
            listeners.forEach(unsubscribe => unsubscribe());
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current.clear();
            if (mapRef.current) {
                mapRef.current.remove(); // This destroys the map instance and cleans up the DOM
                mapRef.current = null;  // Set the ref to null
            }
        };
    }
  }, []); // The empty dependency array ensures this runs only once on mount and cleanup runs on unmount.

  // The component renders a simple div that will be used as the map container.
  // The 'map-interactive' class prevents page-level zoom on touch devices.
  return <div ref={mapContainerRef} className={cn('w-full h-full map-interactive')} />;
}
