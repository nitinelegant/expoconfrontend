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
  _id: string;
  venue_name: string;
  venue_city: string;
  state_id: number;
  venue_address: string;
  venue_phone: string;
  venue_website: string;
  venue_map: string;
  venue_photo: string;
  venue_layout: string;
  venue_featured: false;
  status: string;
}

interface VenueSearchProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLButtonElement | HTMLInputElement>) => void; // Updated type

  error?: string;
  touched?: boolean;
}

interface VenuesResponse {
  message: string;
  venues: Venue[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  error?: string;
}

const api = axios.create({
  baseURL: "http://13.233.254.86:3000/api/v1",
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

        const { data } = await api.get<VenuesResponse>(
          `/venue/list?search=${searchTerm}&page=1`
        );
        setVenues(data.venues);
      } catch (error) {
        const axiosError = error as AxiosError<VenuesResponse>;
        setSearchError(
          axiosError.response?.data?.error || "Failed to fetch venues"
        );
        setVenues([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSelect = useCallback(
    (selectedVenue: Venue) => {
      // Set the value first
      onChange(selectedVenue.venue_name);

      // Close the popover
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="venue">Venue*</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select venue"
            className={cn(
              "w-full justify-between text-black bg-white",
              !value && "text-gray-600",
              touched && error && "border-red-500"
            )}
            onBlur={onBlur}
            type="button"
          >
            {value || "Select venue..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-56 p-0 bg-white">
          <Command>
            <CommandInput
              placeholder="Search venues..."
              onValueChange={debouncedSearch}
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
            <CommandGroup className="bg-white max-h-64 overflow-auto">
              {venues.map((venue) => (
                <CommandItem
                  key={venue._id}
                  value={venue.venue_name}
                  onSelect={() => handleSelect(venue)}
                  className="hover:cursor-pointer text-black"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === venue.venue_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {venue.venue_name}
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
