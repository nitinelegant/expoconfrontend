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
import { axiosInstance } from "@/lib/axios";

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
  onBlur: (e: React.FocusEvent<HTMLButtonElement | HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const VenueSearch: React.FC<VenueSearchProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const [open, setOpen] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedVenueName, setSelectedVenueName] = useState("");

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
        const { data } = await axiosInstance.get(
          `/venue/list?search=${searchTerm}&page=1`
        );
        setVenues(data.venues);
      } catch (error: any) {
        setSearchError(error.response?.data?.error || "Failed to fetch venues");
        setVenues([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSelect = useCallback(
    (selectedVenue: Venue) => {
      onChange(selectedVenue._id);
      setSelectedVenueName(selectedVenue.venue_name);
      setOpen(false);
    },
    [onChange]
  );

  // Find venue name for display
  const displayValue =
    selectedVenueName || venues.find((v) => v._id === value)?.venue_name || "";

  return (
    <div className="space-y-2">
      <Label htmlFor="venue">Venue*</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-black bg-white",
              !displayValue && "text-gray-600",
              touched && error && "border-red-500"
            )}
            onBlur={onBlur}
            type="button"
          >
            {displayValue || "Select venue..."}
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
                      value === venue._id ? "opacity-100" : "opacity-0"
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
