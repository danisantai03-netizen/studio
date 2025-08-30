
"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const filters = ["All", "Plastics", "Paper", "Glass", "Electronics", "Aluminum", "Organic"];

export function FilterBar() {
  const [activeFilter, setFilter] = useUIState(state => [state.activeFilter, state.setActiveFilter]);

  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full h-8 px-4 text-xs font-medium shadow-sm",
                activeFilter === filter
                  ? "bg-secondary text-secondary-foreground border-transparent"
                  : "bg-card text-foreground"
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
