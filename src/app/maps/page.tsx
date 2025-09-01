
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
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

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

    // Mock driver appearance and phase changes for demo
    const timers: NodeJS.Timeout[] = [];
    if (phase === 'REQUESTED') {
      timers.push(setTimeout(() => {
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
      }, 4000));
    }
    if (phase === 'ACCEPTED') timers.push(setTimeout(() => setPhase('ON_THE_WAY'), 3000));
    if (phase === 'ON_THE_WAY') timers.push(setTimeout(() => setPhase('ARRIVED'), 5000));
    if (phase === 'ARRIVED') timers.push(setTimeout(() => setPhase('IN_PROGRESS'), 4000));
    if (phase === 'IN_PROGRESS') timers.push(setTimeout(() => setPhase('COMPLETED'), 5000));


    return () => {
      timers.forEach(clearTimeout);
      unsubDriver();
      unsubPhase();
    };
  }, [tripId, phase]);

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
      <UniversalHeader title="Live Tracking" />
      <div className="relative flex-1 w-full -mt-12 pt-12">
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
