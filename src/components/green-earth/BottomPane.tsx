
'use client';

import React, { useState } from 'react';
import type { Dropoff, TripPhase, DriverRT } from '@/types/location';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Helper Functions & Components ---

function phaseLabel(p: TripPhase) {
  switch (p) {
    case 'ACCEPTED': return 'Driver has accepted your request';
    case 'ON_THE_WAY': return 'Driver is on the way to your location';
    case 'ARRIVED': return 'Driver has arrived at the pickup point';
    case 'IN_PROGRESS': return 'Pickup is currently in progress';
    case 'COMPLETED': return 'Pickup successfully completed!';
    default: return 'Waiting for driver...';
  }
}

const FeedbackSection = ({ onSubmit }: { onSubmit: () => void }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit();
    }
  };

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
      <Button onClick={handleSubmit} disabled={rating === 0} className="w-full">
        Submit Feedback
      </Button>
    </motion.div>
  );
};


// --- Main Component ---

type BottomPaneProps = {
  phase: TripPhase;
  driver: DriverRT | null;
  dropoffs: Dropoff[];
  showDriverInfo: boolean;
  onCall: () => void;
  onChat: () => void;
  onCancel: () => void;
  onFeedbackSubmit: () => void;
};

export default function BottomPane({
  phase, driver, dropoffs, showDriverInfo, onCall, onChat, onCancel, onFeedbackSubmit
}: BottomPaneProps) {
  const [tab, setTab] = useState<'pickup' | 'dropoff'>('pickup');
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  
  const isTripActive = phase !== 'COMPLETED' && phase !== 'CANCELED' && showDriverInfo;
  
  const toggleSheet = () => setIsSheetExpanded(!isSheetExpanded);

  return (
    <div className="flex flex-col items-center">
      {/* --- Segmented Control --- */}
      <div className="mb-2 p-1 flex w-fit max-w-md items-center justify-center gap-1 rounded-full bg-background shadow-md border">
        <Button
          onClick={() => setTab('pickup')}
          variant={tab === 'pickup' ? 'default' : 'ghost'}
          className="rounded-full h-9 px-6 text-sm"
        >
          Pickup
        </Button>
        <Button
          onClick={() => setTab('dropoff')}
          variant={tab === 'dropoff' ? 'default' : 'ghost'}
          className="rounded-full h-9 px-6 text-sm"
        >
          Drop-off
        </Button>
      </div>

      {/* --- Sliding Bottom Sheet --- */}
      <motion.div
        className="w-full rounded-t-2xl bg-card/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]"
        animate={{ height: isSheetExpanded ? '60vh' : 'auto' }}
        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
      >
        <div role="button" onClick={toggleSheet} className="cursor-pointer">
            <div className="mx-auto my-3 h-1.5 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        <AnimatePresence mode="wait">
          {tab === 'pickup' ? (
            <motion.div key="pickup">
              {isTripActive ? (
                <div className="p-4 pt-0 grid gap-4">
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
                  <div className="text-primary font-semibold text-center bg-primary/10 py-2 rounded-lg text-sm">{phaseLabel(phase)}</div>
                  <Button onClick={onCancel} variant="outline" className="w-full">Cancel Pickup</Button>
                </div>
              ) : phase === 'COMPLETED' ? (
                 <FeedbackSection onSubmit={onFeedbackSubmit} />
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No active pickup.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="dropoff" className="p-4 pt-0 grid gap-2 max-h-[50vh] overflow-y-auto">
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
      </motion.div>
    </div>
  );
}
