'use client';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';

/**
 * Development-only Live Tracking page with dummy driver simulation.
 * Hook points:
 *  - Replace dummy simulation with real-time backend updates later.
 *  - Use env NEXT_PUBLIC_MAPBOX_TOKEN for Mapbox tiles (optional).
 */

const USER_POS = { lat: -6.2088, lng: 106.8456 }; // Jakarta sample
const INITIAL_ZOOM = 15;

export default function LiveTrackingPage() {
  const router = useRouter();
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const [tab, setTab] = useState<'pickup'|'dropoff'>('pickup');
  const [showCard, setShowCard] = useState(true);
  const [driverConfirmed, setDriverConfirmed] = useState(false);
  const [driverInfo, setDriverInfo] = useState<any>(null);
  const [driverPos, setDriverPos] = useState<{lat:number,lng:number}>({ lat: USER_POS.lat + 0.0025, lng: USER_POS.lng + 0.0025 });

  useEffect(() => {
    // init leaflet map once
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      center: [USER_POS.lat, USER_POS.lng],
      zoom: INITIAL_ZOOM,
      minZoom: INITIAL_ZOOM,           // prevents zoom-out
      maxZoom: INITIAL_ZOOM + 3,
      zoomControl: false, // Use true if you want default +/- controls
      doubleClickZoom: false,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    // tiles - Mapbox if token provided, else OSM fallback
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const tileUrl = token
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${token}`
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20,
    }).addTo(map);

    // user marker
    L.circleMarker([USER_POS.lat, USER_POS.lng], {
      radius: 8,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 1,
    }).addTo(map);

    // ensure map fits area initially
    map.setView([USER_POS.lat, USER_POS.lng], INITIAL_ZOOM);

    // disable page horizontal pan
    document.documentElement.style.overflowX = 'hidden';

    // cleanup
    return () => {
      map.remove();
      mapRef.current = null;
      document.documentElement.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    // TODO: Replace with real-time backend subscription
    // simulate driver confirmation after 5 seconds (dev only)
    const timer = setTimeout(() => {
      const info = {
        id: 'drv_001',
        name: 'Budi Santoso',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        vehicle: 'Honda Vario',
        plate: 'B 1234 XYZ',
      };
      setDriverInfo(info);
      setDriverConfirmed(true);
      
      const map = mapRef.current;
      if (map) {
        if (!driverMarkerRef.current) {
          driverMarkerRef.current = L.marker([driverPos.lat, driverPos.lng], {
            icon: L.divIcon({
              className: 'driver-icon',
              html: `<div style="width:32px;height:32px;border-radius:9999px;background:#10b981;border:2px solid white;"></div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            }),
          }).addTo(map);
        }
        // fit bounds to user & driver
        fitBetween(userAndDriverBounds(USER_POS, driverPos), map);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [driverPos]);

  useEffect(() => {
    // TODO: Replace with real-time backend subscription
    // simulate driver movement every 2s after confirmed
    let iv: number | null = null;
    if (driverConfirmed) {
      iv = window.setInterval(() => {
        setDriverPos(prev => {
          const next = { lat: prev.lat + (Math.random()-0.5)*0.0006, lng: prev.lng + (Math.random()-0.5)*0.0006 };
          const marker = driverMarkerRef.current;
          if (marker) animateMarker(marker, [next.lat, next.lng], 1900);
          
          const map = mapRef.current;
          if (map && marker) {
            fitBetween(userAndDriverBounds(USER_POS, next), map);
          }
          return next;
        });
      }, 2000);
    }
    return () => { if (iv) clearInterval(iv); };
  }, [driverConfirmed]);

  // utility: compute bounds, fit
  function userAndDriverBounds(user:{lat:number,lng:number}, driver:{lat:number,lng:number}) {
    const swlat = Math.min(user.lat, driver.lat);
    const swlng = Math.min(user.lng, driver.lng);
    const nelat = Math.max(user.lat, driver.lat);
    const nelng = Math.max(user.lng, driver.lng);
    return [[swlat, swlng], [nelat, nelng]];
  }

  function fitBetween(bounds:any, map:L.Map) {
    try {
      const leafletBounds = L.latLngBounds(bounds);
      map.setMaxBounds(leafletBounds.pad(0.5));
      map.fitBounds(leafletBounds, { padding: [30,30], animate: true, duration: 0.8 });
    } catch(e) { console.error("Fit bounds failed:", e); }
  }

  // small helper to animate marker (linear)
  function animateMarker(marker:L.Marker, to:[number,number], duration=1900) {
    const from = marker.getLatLng();
    const start = performance.now();
    const step = (now:number) => {
      const t = Math.min(1, (now - start) / duration);
      const lat = from.lat + (to[0] - from.lat) * t;
      const lng = from.lng + (to[1] - from.lng) * t;
      marker.setLatLng([lat, lng]);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // UI handlers
  const handleBack = () => router.push('/'); // go back to Home
  const onPickupTab = () => { setTab('pickup'); setShowCard(true); };
  const onDropoffTab = () => { setTab('dropoff'); setShowCard(true); };

  return (
    <div className="min-h-screen flex flex-col bg-[#07110E] text-white">
      {/* header */}
      <header className="h-12 flex items-center justify-start px-3 bg-[#111827] shadow-md z-10">
        <button aria-label="back" onClick={handleBack} className="text-2xl pr-3 text-gray-300 hover:text-white">←</button>
        <div className="flex-1 text-center font-semibold">Live Tracking</div>
        <div style={{ width: 36 }} />{/* spacer */}
      </header>

      {/* map */}
      <div className="flex-1 w-full relative">
        <div ref={mapEl} id="leaflet-map" className="w-full h-full" />
      </div>

      {/* segmented toggle */}
      <div className="flex justify-center gap-3 p-3 bg-[#07110E] shadow-t-lg z-10">
        <button
          className={`px-5 py-2 rounded-full font-medium transition-colors ${tab==='pickup' ? 'bg-emerald-500 text-black' : 'bg-[#1f2937] text-white/80'}`}
          onClick={onPickupTab}
        >Pickup</button>
        <button
          className={`px-5 py-2 rounded-full font-medium transition-colors ${tab==='dropoff' ? 'bg-emerald-500 text-black' : 'bg-[#1f2937] text-white/80'}`}
          onClick={onDropoffTab}
        >Drop-off</button>
      </div>

      {/* bottom sheet area */}
      <div className="relative bg-[#07110E] z-10">
        {(tab === 'pickup' && showCard) && (
          <div className="mx-4 mb-6 bg-[#111827] rounded-2xl p-4 shadow-2xl relative">
            <button
              aria-label="close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1f2937] text-white/70 text-sm flex items-center justify-center shadow-sm hover:bg-gray-600"
              onClick={() => setShowCard(false)}
            >✕</button>

            {!driverConfirmed ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center"></div>
                <div>
                  <div className="text-base font-medium">Preparing driver...</div>
                  <div className="mt-2">
                    <LoadingDots />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img src={driverInfo.avatar} alt={driverInfo.name} className="w-14 h-14 rounded-full bg-zinc-700 object-cover border-2 border-emerald-500" />
                <div className="flex-1">
                  <div className="text-base font-semibold">{driverInfo.name}</div>
                  <div className="text-sm text-zinc-400">{driverInfo.vehicle} • {driverInfo.plate}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-700">📞</button>
                  <button className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-700">💬</button>
                </div>
              </div>
            )}
          </div>
        )}

        {(tab === 'dropoff' && showCard) && (
          <div className="mx-4 mb-6 bg-[#111827] rounded-2xl p-4 shadow-2xl relative">
            <button
              aria-label="close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1f2937] text-white/70 text-sm flex items-center justify-center shadow-sm hover:bg-gray-600"
              onClick={() => setShowCard(false)}
            >✕</button>
            <div>
              <div className="text-lg font-semibold mb-3">Select Drop-off Location</div>
              <div className="flex flex-col gap-2">
                <button className="text-left p-3 bg-[#1f2937] rounded-lg hover:bg-gray-700">GreenEarth Center - South Jakarta</button>
                <button className="text-left p-3 bg-[#1f2937] rounded-lg hover:bg-gray-700">Recycle Point - Central Park</button>
              </div>
            </div>
          </div>
        )}

        {(!showCard) && (
          <div className="h-4" />
        )}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="dot animate-dot" />
      <span className="dot animate-dot delay-75" />
      <span className="dot animate-dot delay-150" />
      <style jsx>{`
        .dot { width:8px; height:8px; background:#10b981; border-radius:9999px; }
        .animate-dot { animation: dot-bounce 1.2s infinite ease-in-out; }
        .delay-75 { animation-delay: -0.24s; }
        .delay-150 { animation-delay: -0.12s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
}
