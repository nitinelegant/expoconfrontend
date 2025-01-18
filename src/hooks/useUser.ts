import { fetchUser } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    // Cache the data for 24 hours since it rarely changes
    staleTime: 1000 * 60 * 60 * 24,
    // Keep the data in cache for 24 hours
    cacheTime: 1000 * 60 * 60 * 24,
  });
}
