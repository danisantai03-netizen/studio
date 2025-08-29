"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const filters = ["All", "Bottles", "Cardboard", "Paper", "Glass", "Cans", "Iron", "Aluminum", "Copper", "Organic", "Non-Organic"];

export function FilterBar() {
  const [activeFilter, setFilter] = useUIState(state => [state.activeFilter, state.setActiveFilter]);

  return (
    <div className="flex items-center justify-between">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "secondary"}
              className={cn(
                "rounded-full h-9 px-4 text-sm font-semibold transition-transform duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 hover:scale-105",
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "bg-white text-foreground"
              )}
              onClick={() => setFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      <a href="#" className="ml-4 text-sm font-semibold text-accent whitespace-nowrap transition-transform duration-200 ease-in-out active:scale-95 hover:scale-105">See All</a>
    </div>
  );
}
