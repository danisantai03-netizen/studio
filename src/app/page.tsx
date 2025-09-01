'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSchedule = async () => {
    // simulate schedule success animation
    setShowSuccess(true);
    // keep animation for 1.1s then navigate
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/maps'); // auto navigate to maps
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[#07110E] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6">GreenEarth</h1>
      <p className="text-center text-muted-foreground mb-8">Your companion for a sustainable lifestyle.</p>

      <button
        onClick={handleSchedule}
        className="px-6 py-3 rounded-lg bg-emerald-600 font-medium shadow-lg hover:bg-emerald-500 transition-colors"
      >
        Schedule Pickup
      </button>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40">
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 animate-check shadow-2xl">
            <div className="w-12 h-12 text-3xl font-bold flex items-center justify-center rounded-full bg-emerald-500">
              ✓
            </div>
            <div className="text-white font-medium">Schedule confirmed</div>
          </div>
        </div>
      )}
    </div>
  );
}
