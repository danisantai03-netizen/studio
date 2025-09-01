
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { rtdb } from '@/lib/firebase';
import { onValue, ref as dbRef } from 'firebase/database';
import { Skeleton } from '@/components/ui/skeleton';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import type { TripPhase, DriverRT, Dropoff } from '@/types/location';
import BottomPane from '@/components/green-earth/BottomPane';

const LiveMap = dynamic(() => import('@/components/green-earth/MapLeaflet'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full bg-muted" />,
});

// Mock user location (in a real app, this would come from geolocation API)
const MOCK_USER_LOCATION = { lat: -6.229728, lng: 106.827148 };

export default function MapsPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId') || 'trip_123'; // Default tripId for demo

  const [phase, setPhase] = React.useState<TripPhase>('ACCEPTED');
  const [driver, setDriver] = React.useState<DriverRT | null>(null);
  const [dropoffs, setDropoffs] = React.useState<Dropoff[]>([]);
  const [showDriverInfo, setShowDriverInfo] = React.useState(true);
  const [isTransitioning, startTransition] = React.useTransition();

  // --- Realtime Data Subscriptions ---
  React.useEffect(() => {
    // Subscribe to trip phase
    const phaseRef = dbRef(rtdb, `trips/${tripId}/phase`);
    const unsubPhase = onValue(phaseRef, (snap) => {
      const nextPhase = (snap.val() || 'ACCEPTED') as TripPhase;
      startTransition(() => {
        setPhase(nextPhase);
        if (nextPhase === 'COMPLETED') {
           // Keep driver info shown for feedback, will be hidden by BottomPane
        } else {
           setShowDriverInfo(true);
        }
      });
    });

    // Subscribe to driver real-time data
    const driverRef = dbRef(rtdb, `trips/${tripId}/driver`);
    const unsubDriver = onValue(driverRef, (snap) => {
      const driverData = snap.val() as DriverRT;
      if (driverData) {
        setDriver(driverData);
      }
    });

    // Subscribe to drop-off points
    const dropoffsRef = dbRef(rtdb, `trips/${tripId}/dropoffs`);
    const unsubDropoffs = onValue(dropoffsRef, (snap) => {
        const dropoffData = snap.val();
        if (dropoffData && typeof dropoffData === 'object') {
            const dropoffList: Dropoff[] = Object.entries(dropoffData).map(([id, data]: [string, any]) => ({
                id,
                label: data.label,
                lat: data.lat,
                lng: data.lng,
                distanceM: data.distanceM
            }));
            setDropoffs(dropoffList);
        }
    });

    return () => {
      unsubPhase();
      unsubDriver();
      unsubDropoffs();
    };
  }, [tripId]);

  // --- Event Handlers ---
  const handleFeedbackSubmit = () => {
    // Logic to submit feedback to backend...
    // After success, hide the driver info pane
    setTimeout(() => {
        setShowDriverInfo(false);
    }, 600); // Wait for animation
  };

  const handleCall = () => console.log('Call driver');
  const handleChat = () => console.log('Chat with driver');
  const handleCancel = () => console.log('Cancel trip');

  return (
    <div className="maps-page">
      <UniversalHeader title="Live Tracking" showBackButton={true} />
      
      <main className="min-h-0 relative">
        <LiveMap
          userLat={MOCK_USER_LOCATION.lat}
          userLng={MOCK_USER_LOCATION.lng}
          tripId={tripId}
          driverLocation={driver}
          isDriverInfoVisible={showDriverInfo}
        />
      </main>

      <footer id="map-bottom-controls" className="bg-background z-[70] relative">
         <BottomPane
            phase={phase}
            driver={driver}
            dropoffs={dropoffs}
            showDriverInfo={showDriverInfo}
            onCall={handleCall}
            onChat={handleChat}
            onCancel={handleCancel}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
      </footer>
      
      <style jsx global>{`
        .maps-page {
            display: grid;
            grid-template-rows: 48px 1fr auto;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            touch-action: pan-y;
            background-color: hsl(var(--muted));
        }
        main {
          background-color: hsl(var(--muted));
        }
      `}</style>
    </div>
  );
}
