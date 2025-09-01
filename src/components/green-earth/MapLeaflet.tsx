
'use client';

import L, { LatLngBounds } from 'leaflet';
import React, { useEffect, useRef, useTransition } from 'react';
import { fixLeafletDefaultIcon } from '@/lib/leafletFix';
import { padBoundsAround } from '@/types/location';

// Fix Leaflet's default icon path
fixLeafletDefaultIcon();

const initialZoom = 15; // City-level zoom

const motorIcon = (deg = 0) => L.divIcon({
  className: 'driver-icon',
  html: `<div class="w-8 h-8 rounded-full shadow-lg bg-primary border-2 border-white grid place-items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Smoothly animates a marker from its current position to a new one
function animateMarker(marker: L.Marker, to: [number, number], duration = 1200) {
  const from = marker.getLatLng();
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const lat = from.lat + (to[0] - from.lat) * t;
    const lng = from.lng + (to[1] - from.lng) * t;
    marker.setLatLng([lat, lng]);
    if (t < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

type LiveMapProps = {
  userLat: number;
  userLng: number;
  tripId: string;
  driverLocation: { lat: number; lng: number; bearing?: number } | null;
  isDriverInfoVisible: boolean;
};

export default function LiveMap({ userLat, userLng, tripId, driverLocation, isDriverInfoVisible }: LiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // --- Map Initialization ---
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [userLat, userLng],
      zoom: initialZoom,
      minZoom: 13, // Allow some zoom-out
      maxZoom: initialZoom + 3,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      zoomControl: false
    });
    mapRef.current = map;

    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 20, attribution: '© OpenStreetMap, © CartoDB' }
    ).addTo(map);

    // Add user marker
    userMarkerRef.current = L.marker([userLat, userLng]).addTo(map);
    
    // Resize handler
    const invalidate = () => requestAnimationFrame(() => setTimeout(() => map.invalidateSize(), 50));
    window.addEventListener('resize', invalidate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', invalidate);
      map.remove();
      mapRef.current = null;
    };
  }, [userLat, userLng]);
  
  // --- Driver Marker and Map Bounds Update ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !driverLocation) return;
    
    const { lat, lng, bearing } = driverLocation;

    // Create or animate driver marker
    if (!driverMarkerRef.current) {
      driverMarkerRef.current = L.marker([lat, lng], { icon: motorIcon(bearing || 0), zIndexOffset: 1000 }).addTo(map);
    } else {
      animateMarker(driverMarkerRef.current, [lat, lng], 1200);
      const el = driverMarkerRef.current.getElement();
      if (el) {
        // Rotate marker icon based on bearing
        const iconDiv = el.querySelector('svg');
        if (iconDiv) {
            iconDiv.style.transform = `rotate(${bearing || 0}deg)`;
            iconDiv.style.transition = 'transform 0.5s ease-out';
        }
      }
    }

    // Fit map to user and driver, and constrain panning
    if (isDriverInfoVisible) {
        const userLatLng: [number, number] = [userLat, userLng];
        const driverLatLng: [number, number] = [lat, lng];
        const [[sLat, sLng], [nLat, nLng]] = padBoundsAround(userLatLng, driverLatLng, 1000);
        const bounds = L.latLngBounds([[sLat, sLng], [nLat, nLng]]);
        
        map.setMaxBounds(bounds.pad(0.3)); // Constrain panning
        map.fitBounds(bounds, { animate: true, padding: [30, 30] }); // Zoom to fit
    } else {
        // After trip completion, reset view
        map.setMaxBounds(null); // Remove panning constraint
        map.setView([userLat, userLng], initialZoom, { animate: true });
    }

  }, [driverLocation, userLat, userLng, isDriverInfoVisible]);
  
  // Invalidate map size when driver info panel is toggled
  useEffect(() => {
     requestAnimationFrame(() => setTimeout(() => mapRef.current?.invalidateSize(), 250));
  }, [isDriverInfoVisible]);


  return <div ref={containerRef} id="leaflet-map" className="w-full h-full" style={{ touchAction: 'none' }} />;
}
