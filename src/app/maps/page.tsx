
'use client';

import * as React from 'react';
import {
  MapPin,
  Star,
  Phone,
  MessageCircle,
  LocateFixed,
  ChevronUp,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the map component with SSR disabled.
const Map = dynamic(() => import('@/components/green-earth/MapLeaflet'), {
  loading: () => <Skeleton className="absolute inset-0 bg-muted z-0" />,
  ssr: false,
});

// Trip status definitions
const tripStatuses = {
  CONFIRMATION: 'Driver has been assigned',
  ON_THE_WAY: 'Driver is heading to your location',
  ARRIVED: 'Driver has arrived at your location',
  COMPLETED: 'Trip successfully completed',
  FEEDBACK: 'Please rate your experience',
};

type TripStatus = keyof typeof tripStatuses;
type SheetMode = 'pickup' | 'dropoff' | 'closed';

export default function MapsPage() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(true);
  const [sheetMode, setSheetMode] = React.useState<SheetMode>('pickup');
  const [status, setStatus] = React.useState<TripStatus>('ON_THE_WAY');
  const [showDriverInfo, setShowDriverInfo] = React.useState(true);

  React.useEffect(() => {
    // Simulate trip progress for demonstration
    const sequence: TripStatus[] = [
      'ON_THE_WAY',
      'ARRIVED',
      'COMPLETED',
      'FEEDBACK',
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1);
      if (currentIndex < sequence.length) {
         setStatus(sequence[currentIndex]);
      } else {
         clearInterval(interval);
      }
    }, 8000); // Change status every 8 seconds

    return () => clearInterval(interval);
  }, []);
  
  const handleToggleSheet = (mode: SheetMode) => {
    if (sheetMode === mode) {
      setSheetMode('closed');
      setIsSheetOpen(false);
    } else {
      setSheetMode(mode);
      setIsSheetOpen(true);
    }
  }

  const handleFeedbackSubmit = () => {
    // Hide the driver info after feedback is submitted
    setShowDriverInfo(false);
    setIsSheetOpen(false);
    setSheetMode('closed');
  };
  
  const isPickupActive = isSheetOpen && sheetMode === 'pickup';

  return (
    <div className="maps-page grid h-screen w-screen grid-rows-[auto_1fr_auto] overflow-x-hidden" style={{touchAction: 'pan-y'}}>
      <UniversalHeader title="Live Tracking" showBackButton={false} />

      <main className="relative flex-1 overflow-hidden">
        {/* Map Container */}
        <div className="absolute inset-0 z-10 h-full w-full">
          <Map />
        </div>

        {/* Top Status Banner */}
         {showDriverInfo && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              className="absolute top-2 left-1/2 z-30 w-[90%] -translate-x-1/2"
            >
              <div className="flex items-center gap-3 rounded-full bg-background p-2 pr-4 text-sm font-medium shadow-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=driver"
                    alt="Driver"
                  />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={status}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {status === 'ON_THE_WAY' && 'Arriving in 5 mins...'}
                      {status === 'ARRIVED' && 'Driver is waiting.'}
                      {status === 'COMPLETED' && 'Pickup complete!'}
                      {status === 'FEEDBACK' && 'How was the service?'}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
         )}

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 z-30 space-y-2">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-background text-foreground shadow-lg hover:bg-muted"
          >
            <LocateFixed className="h-5 w-5" />
          </Button>
        </div>
      </main>
      
      {/* Bottom Sheet Area */}
      <div className="relative z-40">
        <AnimatePresence>
          {isSheetOpen && showDriverInfo && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="w-full rounded-t-2xl bg-background shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]"
            >
              <div className="p-4 pt-3">
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-muted" />

                <AnimatePresence mode="out-in">
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status !== 'FEEDBACK' ? (
                      <DriverInfo status={status} />
                    ) : (
                      <FeedbackSection onSubmit={handleFeedbackSubmit} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

       {/* Bottom Control Bar */}
      <div className="bottom-controls flex gap-3 justify-center p-3 bg-background border-t">
          <Button
            className={cn("w-full h-12 rounded-full text-sm font-semibold", isPickupActive ? '' : 'bg-muted text-muted-foreground')}
            aria-label="Show pickup details"
            onClick={() => handleToggleSheet('pickup')}
          >
            Pickup Details
          </Button>
      </div>
    </div>
  );
}


// Sub-components for better organization

const DriverInfo = ({ status }: { status: TripStatus }) => (
  <>
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 border-2 border-primary/20">
        <AvatarImage
          src="https://i.pravatar.cc/150?u=driver"
          alt="Budi Santoso"
        />
        <AvatarFallback>BS</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-lg font-bold">Budi Santoso</h2>
        <p className="text-sm text-muted-foreground">
          Honda Vario • B 1234 XYZ
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="outline" className="h-11 w-11 rounded-full">
          <Phone className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="outline" className="h-11 w-11 rounded-full">
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>

    <div className="my-4 h-px w-full bg-border" />

    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">
        STATUS
      </h3>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'grid h-8 w-8 place-items-center rounded-full',
            status === 'ON_THE_WAY' || status === 'ARRIVED'
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <MapPin className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold">{tripStatuses[status]}</p>
          <p className="text-xs text-muted-foreground">
            {status === 'ON_THE_WAY' && 'Estimated arrival: 5 minutes'}
            {status === 'ARRIVED' && 'Pickup location reached'}
          </p>
        </div>
      </div>
      <Progress
        value={
          status === 'ON_THE_WAY'
            ? 50
            : status === 'ARRIVED'
            ? 100
            : status === 'COMPLETED'
            ? 100
            : 0
        }
        className="h-2"
      />
    </div>

    <Button variant="outline" className="mt-4 w-full">
      Cancel Pickup
    </Button>
  </>
);

const FeedbackSection = ({ onSubmit }: { onSubmit: () => void }) => {
  const [rating, setRating] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    // Simulate API call and animation
    setTimeout(() => {
        onSubmit();
    }, 1200);
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold">Rate Your Pickup</h2>
      <p className="text-sm text-muted-foreground">
        Your feedback helps us improve our service.
      </p>
      <motion.div 
        className="my-4 flex justify-center gap-2"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        }}
        initial="hidden"
        animate="visible"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button 
            key={star} 
            onClick={() => setRating(star)}
            variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star
              className={cn(
                'h-8 w-8 text-yellow-300 transition-all',
                rating >= star ? 'fill-yellow-400' : 'fill-muted'
              )}
            />
          </motion.button>
        ))}
      </motion.div>
      <Button onClick={handleSubmit} disabled={rating === 0 || submitted} className="w-full">
        {submitted ? "Submitting..." : "Submit Feedback"}
      </Button>
    </div>
  );
};
