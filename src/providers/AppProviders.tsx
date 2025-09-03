
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // It's often a good practice to set some default staleTime
            // to avoid immediate refetches on component mounts.
            staleTime: 1000 * 60, // 1 minute
        },
    },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
