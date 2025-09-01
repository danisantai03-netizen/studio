
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { rtdb } from '@/lib/firebase';
import { onValue, ref as dbRef } from 'firebase/database';
import useUserStore from '@/hooks/useUserStore';
import BottomPane from '@/components/green-earth/BottomPane';
import { Skeleton } from '@/components/ui/skeleton';
import type { DriverRT, TripPhase } from '@/types/location';

// Dynamically import the map component to prevent SSR issues
const MapLeaflet = dynamic(() => import('@/components/green-earth/MapLeaflet'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const dropoffLocations = [
    { id: 'dp1', label: 'GreenEarth Center - South Jakarta', lat: -6.2288, lng: 106.8456, distanceM: 2200 },
    { id: 'dp2', label: 'Recycle Point - Central Park', lat: -6.177, lng: 106.79, distanceM: 5300 },
];

export default function MapsPage() {
  const router = useRouter();
  const { name } = useUserStore();

  const [tripId] = React.useState('trip_123'); // Assume this is the active trip ID
  const [driver, setDriver] = React.useState<DriverRT | null>(null);
  const [phase, setPhase] = React.useState<TripPhase>('REQUESTED');
  const [showDriverInfo, setShowDriverInfo] = React.useState(true);
  
  // Mock user location
  const userLocation = { lat: -6.2088, lng: 106.8456 };

  // Subscribe to real-time updates from Firebase
  React.useEffect(() => {
    if (!tripId) return;

    const driverRef = dbRef(rtdb, `trips/${tripId}/driver`);
    const phaseRef = dbRef(rtdb, `trips/${tripId}/phase`);

    const unsubDriver = onValue(driverRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDriver(data);
      }
    });

    const unsubPhase = onValue(phaseRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setPhase(data);
        }
    });

    // Mock driver appearance after 3 seconds for demo
    const timer = setTimeout(() => {
        if (!driver) {
             setDriver({
                id: 'drv_001',
                lat: -6.2110,
                lng: 106.8490,
                bearing: 145,
                name: 'Budi Santoso',
                vehicle: 'Honda Vario',
                plate: 'B 1234 XYZ',
                avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
            });
            setPhase('ACCEPTED');
        }
    }, 3000);


    return () => {
      clearTimeout(timer);
      unsubDriver();
      unsubPhase();
    };
  }, [tripId, driver]);

  const handleFeedbackSubmit = () => {
      // Logic to submit feedback to backend
      console.log('Feedback submitted!');
      // After submitting, hide the driver info pane
      setShowDriverInfo(false);
      // Optionally, navigate away or show a summary
      setTimeout(() => router.push('/'), 2000);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      <div className="relative flex-1 w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 bg-card/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-card/95"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>

        <MapLeaflet
          userLat={userLocation.lat}
          userLng={userLocation.lng}
          tripId={tripId}
          driverLocation={driver}
          isDriverInfoVisible={showDriverInfo}
        />
      </div>

      <div className="relative z-10">
         <BottomPane
            phase={phase}
            driver={driver}
            dropoffs={dropoffLocations}
            showDriverInfo={showDriverInfo}
            onCall={() => console.log('Calling driver...')}
            onChat={() => console.log('Opening chat...')}
            onCancel={() => { console.log('Cancelling...'); router.push('/'); }}
            onFeedbackSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
}

const MapSkeleton = () => (
    <div className="w-full h-full bg-muted animate-pulse" />
)
