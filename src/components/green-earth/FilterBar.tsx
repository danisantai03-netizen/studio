
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const filters = ["All", "Plastics", "Paper", "Glass", "Electronics", "Aluminum", "Organic"];

export function FilterBar() {
  const [activeFilter, setFilter] = useUIState(state => [state.activeFilter, state.setActiveFilter]);

  return (
    <div className="flex items-center justify-between">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full h-8 px-4 text-xs font-semibold shadow-sm focus:outline-none focus:ring-0",
                activeFilter === filter
                  ? "bg-accent text-accent-foreground border-transparent pointer-events-none"
                  : "bg-white text-foreground transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
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
