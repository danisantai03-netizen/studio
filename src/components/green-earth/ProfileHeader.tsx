
import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  id: string;
  photoUrl: string; // stable server URL
  onEdit?: () => void;
};

export const ProfileHeader: React.FC<Props> = ({ name, id, photoUrl, onEdit }) => {
  return (
    <div className="relative px-3 pt-4">
      {/* Decorative background curve */}
      <div className="absolute inset-x-0 -top-4 h-28 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="fill-background"
            d="M0,96L60,96C120,96,240,96,360,101.3C480,107,600,117,720,160C840,203,960,277,1080,266.7C1200,256,1320,160,1380,112L1440,64L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="bg-card rounded-xl shadow-sm p-4 flex items-center gap-4 relative z-10">
        <div className="h-16 w-16 rounded-full overflow-hidden ring-1 ring-border">
          <Image
            src={photoUrl}
            alt={`${name} avatar`}
            width={64}
            height={64}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-foreground truncate">{name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">ID: {id}</div>
            </div>
            <button
              aria-label="Edit profile"
              onClick={onEdit}
              className="ml-3 inline-flex items-center px-3 py-1.5 rounded-md text-xs bg-primary text-primary-foreground hover:brightness-95 active:scale-95 transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
