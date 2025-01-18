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
import { AssociationProps } from "@/types/listTypes";

interface VenueSearchProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLButtonElement | HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  tabIndex?: number;
  required?: boolean;
  label: string;
  placeholder: string;
}

const AssociationSearch: React.FC<VenueSearchProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  tabIndex = 0,
  label,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedVenueName, setSelectedVenueName] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch initial association details if value exists
  useEffect(() => {
    const fetchInitialVenue = async () => {
      if (!value) {
        setSelectedVenueName("");
        return;
      }

      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/association/${value}`);
        if (data.association) {
          setSelectedVenueName(data?.association?.association_name);
        }
      } catch (error) {
        console.error("Error fetching initial association:", error);
        setSearchError("Failed to fetch associaiton details");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialVenue();
  }, [value]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 2) {
        setAssociations([]);
        setSearchError("");
        return;
      }

      try {
        setLoading(true);
        setSearchError("");
        const { data } = await axiosInstance.get(
          `/association/list?search=${searchTerm}`
        );
        setAssociations(data.associations);
      } catch (error) {
        console.log(error);
        setSearchError("Failed to fetch association");
        setAssociations([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSelect = useCallback(
    (selectedVenue: AssociationProps) => {
      onChange(selectedVenue._id);
      setSelectedVenueName(selectedVenue?.association_name);
      setOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < associations.length) {
          handleSelect(associations[highlightedIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < associations.length - 1 ? prev + 1 : prev
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
            prev < associations.length - 1 ? prev + 1 : 0
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
      <Label htmlFor="association">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label={placeholder}
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
              {loading ? "Loading..." : selectedVenueName || placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white">
          <Command onKeyDown={handleKeyDown}>
            <CommandInput
              ref={commandInputRef}
              placeholder={placeholder}
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
            {!loading && !searchError && associations.length === 0 && (
              <CommandEmpty className="text-black p-3 text-sm">
                No Association found.
              </CommandEmpty>
            )}
            <CommandGroup className="bg-white max-h-64 overflow-auto">
              {associations.map((ass, index) => (
                <CommandItem
                  key={ass._id}
                  value={ass.association_name}
                  onSelect={() => handleSelect(ass)}
                  ref={(el) => (commandItemsRef.current[index] = el)}
                  className={cn(
                    "hover:cursor-pointer text-black min-h-[44px] flex items-start py-3",
                    highlightedIndex === index && "bg-gray-100"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 mt-1",
                      value === ass._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-sm">{ass.association_name}</span>
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

export default AssociationSearch;
