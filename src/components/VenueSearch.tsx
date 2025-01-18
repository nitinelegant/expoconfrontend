import React, {
  useState,
  useCallback,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
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
  tabIndex?: number;
  required?: boolean;
}

const VenueSearch: React.FC<VenueSearchProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  tabIndex = 0,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedVenueName, setSelectedVenueName] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch initial venue details if value exists
  useEffect(() => {
    const fetchInitialVenue = async () => {
      if (!value) {
        setSelectedVenueName("");
        return;
      }

      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/venue/${value}`);
        if (data.venue) {
          setSelectedVenueName(data.venue.venue_name);
        }
      } catch (error) {
        console.error("Error fetching initial venue:", error);
        setSearchError("Failed to fetch venue details");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialVenue();
  }, [value]);

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
          `/venue/list?keyword=${searchTerm}`
        );
        setVenues(data.venues);
      } catch (error) {
        console.log(error);
        setSearchError("Failed to fetch venues");
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < venues.length) {
          handleSelect(venues[highlightedIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < venues.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Escape":
        setOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        if (open) {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < venues.length - 1 ? prev + 1 : 0
          );
        }
        break;
    }
  };
  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="venue">Venue {required && "*"}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Select venue"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-black bg-white min-h-[44px] h-auto py-2",
              !selectedVenueName && "text-gray-600",
              touched && error && "border-red-500"
            )}
            onBlur={onBlur}
            onKeyDown={handleTriggerKeyDown}
            tabIndex={tabIndex}
            type="button"
          >
            <span className="line-clamp-2 text-left mr-2">
              {loading ? "Loading..." : selectedVenueName || "Select venue..."}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white">
          <Command onKeyDown={handleKeyDown}>
            <CommandInput
              ref={commandInputRef}
              placeholder="Search venues..."
              onValueChange={debouncedSearch}
              className="text-black"
            />
            {loading && (
              <CommandEmpty className="text-sm text-black p-3">
                Loading...
              </CommandEmpty>
            )}
            {!loading && searchError && (
              <CommandEmpty className="text-red-500">
                {searchError}
              </CommandEmpty>
            )}
            {!loading && !searchError && venues.length === 0 && (
              <CommandEmpty className="text-black p-3 text-sm">
                No venues found.
              </CommandEmpty>
            )}
            <CommandGroup className="bg-white max-h-64 overflow-auto">
              {venues.map((venue, index) => (
                <CommandItem
                  key={venue._id}
                  value={venue.venue_name}
                  onSelect={() => handleSelect(venue)}
                  ref={(el) => (commandItemsRef.current[index] = el)}
                  className={cn(
                    "hover:cursor-pointer text-black min-h-[44px] flex items-start py-3",
                    highlightedIndex === index && "bg-gray-100"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 mt-1",
                      value === venue._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-sm">{venue.venue_name}</span>
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
