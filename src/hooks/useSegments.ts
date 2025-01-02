import { fetchSegments } from "@/api/segments";
import { useQuery } from "@tanstack/react-query";

export function useSegments() {
  return useQuery({
    queryKey: ["segments"],
    queryFn: fetchSegments,
    // Cache the data for 24 hours since it rarely changes
    staleTime: 1000 * 60 * 60 * 24,
    // Keep the data in cache for 24 hours
    cacheTime: 1000 * 60 * 60 * 24,
  });
}
