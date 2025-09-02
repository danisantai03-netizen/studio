
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Dropoff, TripPhase, DriverRT } from '@/types/location';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, MessageSquare, Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Helper Components ---

const LoadingDots = () => (
    <div className="flex space-x-1">
        <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        />
        <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
    </div>
);


const statusConfig: Record<TripPhase, string> = {
  REQUESTED: 'Searching for a nearby driver...',
  ACCEPTED: 'Driver has accepted your request',
  ON_THE_WAY: 'Driver is on the way to your location',
  ARRIVED: 'Driver has arrived at the pickup point',
  IN_PROGRESS: 'Pickup is currently in progress',
  COMPLETED: 'Pickup successfully completed!',
  CANCELED: 'Pickup has been canceled.',
};

const FeedbackSection = ({ onSubmit }: { onSubmit: () => void }) => {
  const [rating, setRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center p-4 space-y-3"
    >
      <h3 className="font-semibold">Rate Your Pickup</h3>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => setRating(star)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star
              className={cn(
                'h-8 w-8 transition-colors',
                rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
              )}
            />
          </motion.button>
        ))}
      </div>
      <Button onClick={onSubmit} disabled={rating === 0} className="w-full">
        Submit Feedback
      </Button>
    </motion.div>
  );
};

// --- Main Component ---

type BottomPaneProps = {
  tripId?: string;
  phase: TripPhase;
  driver: DriverRT | null;
  dropoffs: Dropoff[];
  showDriverInfo: boolean;
  setShowDriverInfo: (visible: boolean) => void;
  onCall: () => void;
  onChat: () => void;
  onCancel: () => void;
  onFeedbackSubmit: () => void;
};

export default function BottomPane({
  tripId, phase, driver, dropoffs, showDriverInfo, setShowDriverInfo, onCall, onChat, onCancel, onFeedbackSubmit
}: BottomPaneProps) {
  const [tab, setTab] = useState<'pickup' | 'dropoff'>('pickup');
  const router = useRouter();
  
  const isTripActive = phase !== 'COMPLETED' && phase !== 'CANCELED' && phase !== 'REQUESTED';

  const renderPickupContent = () => {
    if (phase === 'REQUESTED') {
      return (
         <div className="flex items-center gap-3 p-4">
           <div className="w-14 h-14 rounded-full bg-muted grid place-items-center"><LoadingDots /></div>
           <p className="font-semibold text-muted-foreground">Searching for drivers...</p>
         </div>
      );
    }
    if (phase === 'COMPLETED') {
      return <FeedbackSection onSubmit={onFeedbackSubmit} />;
    }
    if (driver) {
      return (
         <div className="p-4 pt-4 grid gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 border-2 border-primary/20">
                <AvatarImage src={driver?.avatar} alt={driver?.name} />
                <AvatarFallback>{driver?.name?.charAt(0) || 'D'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-bold">{driver?.name}</div>
                <div className="text-sm text-muted-foreground">{driver?.vehicle} • {driver?.plate}</div>
              </div>
              <div className="flex gap-2">
                  <Button onClick={onCall} size="icon" variant="outline" className="rounded-full w-11 h-11"><Phone className="w-5 h-5"/></Button>
                  <Button onClick={onChat} size="icon" variant="outline" className="rounded-full w-11 h-11"><MessageSquare className="w-5 h-5"/></Button>
              </div>
            </div>
             <motion.div
                key={phase}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary font-semibold text-center bg-primary/10 py-2 rounded-lg text-sm"
              >
                  {statusConfig[phase]}
             </motion.div>
             <Button onClick={() => router.push(`/maps/${tripId}`)} variant="default" className="w-full">View Details</Button>
            <Button onClick={onCancel} variant="outline" className="w-full">Cancel Pickup</Button>
          </div>
      );
    }
    return null; // Should not happen in normal flow
  }


  return (
    <div className="flex flex-col items-center">
      {/* --- Segmented Control --- */}
      <div className="mb-2 p-1 flex w-fit max-w-md items-center justify-center gap-1 rounded-full bg-card shadow-md border">
        <Button
          onClick={() => { setTab('pickup'); setShowDriverInfo(true); }}
          variant={tab === 'pickup' ? 'secondary' : 'ghost'}
          className="rounded-full h-9 px-6 text-sm"
        >
          Pickup
        </Button>
        <Button
          onClick={() => { setTab('dropoff'); setShowDriverInfo(true); }}
          variant={tab === 'dropoff' ? 'secondary' : 'ghost'}
          className="rounded-full h-9 px-6 text-sm"
        >
          Drop-off
        </Button>
      </div>

      {/* --- Sliding Content Sheet --- */}
      <AnimatePresence>
      {showDriverInfo && (
        <motion.div
            className="w-full rounded-t-2xl bg-card/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          >
          <div className="relative">
             {isTripActive && (
              <button 
                onClick={() => setShowDriverInfo(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/50 hover:bg-muted"
                aria-label="Close panel"
              >
                <X className="w-4 h-4 text-muted-foreground"/>
              </button>
             )}

            <AnimatePresence mode="wait">
              {tab === 'pickup' ? (
                <motion.div key="pickup">
                  {renderPickupContent()}
                </motion.div>
              ) : (
                <motion.div key="dropoff" className="p-4 pt-4 grid gap-2 max-h-[40vh] overflow-y-auto">
                    <h3 className="font-semibold text-center pb-2">Drop-off Locations</h3>
                    {dropoffs.length > 0 ? dropoffs.map(d => (
                    <div key={d.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div>
                            <p className="text-sm font-semibold">{d.label}</p>
                            <p className="text-xs text-muted-foreground">Drop-off Point</p>
                        </div>
                        {d.distanceM != null && <div className="text-sm font-medium text-primary">{(d.distanceM / 1000).toFixed(1)} km</div>}
                    </div>
                    )) : (
                        <p className="text-center text-muted-foreground py-4">No drop-off locations found.</p>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
