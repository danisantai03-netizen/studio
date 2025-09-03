
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Props = {
  name: string;
  id: string;
  photoUrl: string;
  onEdit?: () => void;
  isLoading?: boolean;
};

export const ProfileHeader: React.FC<Props> = ({ name, id, photoUrl, onEdit, isLoading }) => {
  if (isLoading) {
      return (
          <div className="flex items-center gap-4 py-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-9 w-16" />
          </div>
      )
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
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
        <h1 className="text-xl font-bold text-foreground truncate">{name}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">ID: {id}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        aria-label="Edit profile"
        onClick={onEdit}
        className="ml-3 shrink-0"
      >
        Edit
      </Button>
    </div>
  );
};
