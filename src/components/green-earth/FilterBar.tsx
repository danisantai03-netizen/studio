"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const filters = ["All", "Bottles", "Cardboard", "Paper", "Glass", "Cans", "Iron", "Aluminum", "Copper", "Organic", "Non-Organic"];

export function FilterBar() {
  const [activeFilter, setFilter] = useUIState(state => [state.activeFilter, state.setActiveFilter]);

  return (
    <div className="mb-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 px-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={cn(
                "rounded-full h-8 px-4 text-sm transition-colors",
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground" 
                  : "active:bg-secondary/80"
              )}
              onClick={() => setFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
