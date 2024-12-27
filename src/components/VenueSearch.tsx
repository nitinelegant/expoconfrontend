import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";
import axios, { AxiosError } from "axios";

interface Venue {
  id: string | number;
  name: string;
}

interface VenueSearchProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<string>) => void;
  error?: string;
  touched?: boolean;
}

interface ApiResponse {
  data: Venue[];
  error?: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const VenueSearch: React.FC<VenueSearchProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  // Debounced search function with axios
  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 2) {
        setVenues([]);
        setSearchError("");
        return;
      }

      try {
        setLoading(true);
        setSearchError("");

        const response = await api.get<ApiResponse>(`/venues/search`, {
          params: {
            q: searchTerm,
          },
        });

        setVenues(response.data.data);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.error("Failed to fetch venues:", error);

        if (axiosError.response?.data?.error) {
          setSearchError(axiosError.response.data.error);
        } else {
          setSearchError("Failed to fetch venues. Please try again.");
        }

        setVenues([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Clean up debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    onBlur({ target: { name: "venue" } } as React.FocusEvent<HTMLInputElement>);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="venue">Venue*</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="bg-white ">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select venue"
            className={cn(
              "w-full justify-between",
              !value && "text-gray-600",
              touched && error && "border-red-500"
            )}
            type="button"
          >
            {value || "Select venue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-56 p-0 bg-white text-black">
          <Command>
            <CommandInput
              placeholder="Search venues..."
              onValueChange={(search: string) => {
                debouncedSearch(search);
              }}
              className="text-black"
            />
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {!loading && searchError && (
              <CommandEmpty className="text-red-500">
                {searchError}
              </CommandEmpty>
            )}
            {!loading && !searchError && venues.length === 0 && (
              <CommandEmpty>No venues found.</CommandEmpty>
            )}
            <CommandGroup>
              {venues.map((venue) => (
                <CommandItem
                  key={venue.id}
                  value={venue.name}
                  onSelect={() => handleSelect(venue.name)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === venue.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {venue.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {touched && error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default VenueSearch;
