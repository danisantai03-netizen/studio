
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
    <div className="bg-card rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className="relative h-16 w-16 rounded-full overflow-hidden ring-1 ring-border shrink-0">
        <Image
          src={photoUrl}
          alt={`${name} avatar`}
          fill
          sizes="64px"
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
  );
};
