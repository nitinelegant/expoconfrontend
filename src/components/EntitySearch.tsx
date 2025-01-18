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

interface Entity {
  _id: string;
  [key: string]: any;
}

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLButtonElement | HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  tabIndex?: number;
  required?: boolean;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
  entityType: string;
  displayField: string;
  apiEndpoint: string;
  searchParam?: string;
}

interface ApiResponse {
  [key: string]: {
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
    [key: string]: any;
  };
}

const EntitySearch: React.FC<EntitySearchProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  tabIndex = 0,
  required = false,
  label = "Select",
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  noResultsMessage = "No results found.",
  entityType,
  displayField,
  apiEndpoint,
  searchParam = "search",
}) => {
  const [open, setOpen] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedEntityName, setSelectedEntityName] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch initial entity details if value exists
  useEffect(() => {
    const fetchInitialEntity = async () => {
      if (!value) {
        setSelectedEntityName("");
        return;
      }

      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`${apiEndpoint}/${value}`);
        // Handle single entity response
        if (data[entityType]) {
          setSelectedEntityName(data[entityType][displayField]);
        } else if (data[displayField]) {
          // If the response is the entity itself
          setSelectedEntityName(data[displayField]);
        }
      } catch (error) {
        console.error(`Error fetching initial ${entityType}:`, error);
        setSearchError(`Failed to fetch ${entityType} details`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialEntity();
  }, [value, apiEndpoint, entityType, displayField]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 2) {
        setEntities([]);
        setSearchError("");
        return;
      }

      try {
        setLoading(true);
        setSearchError("");
        const { data } = await axiosInstance.get(
          `${apiEndpoint}/list?${searchParam}=${searchTerm}&page=1`
        );

        // Handle the specific response structure
        if (data[`${entityType}s`]) {
          setEntities(data[`${entityType}s`]);
        } else {
          // Fallback for different response structure
          const entityList = Array.isArray(data) ? data : data.results || [];
          setEntities(entityList);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchError(`Failed to fetch ${entityType}s`);
        setEntities([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [apiEndpoint, entityType, searchParam]
  );

  const handleSelect = useCallback(
    (selectedEntity: Entity) => {
      onChange(selectedEntity._id);
      setSelectedEntityName(selectedEntity[displayField]);
      setOpen(false);
    },
    [onChange, displayField]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < entities.length) {
          handleSelect(entities[highlightedIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < entities.length - 1 ? prev + 1 : prev
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
            prev < entities.length - 1 ? prev + 1 : 0
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
      <Label htmlFor={entityType}>
        {label} {required && "*"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label={`Select ${entityType}`}
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-black bg-white min-h-[44px] h-auto py-2",
              !selectedEntityName && "text-gray-600",
              touched && error && "border-red-500"
            )}
            onBlur={onBlur}
            onKeyDown={handleTriggerKeyDown}
            tabIndex={tabIndex}
            type="button"
          >
            <span className="line-clamp-2 text-left mr-2">
              {loading ? "Loading..." : selectedEntityName || placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white">
          <Command onKeyDown={handleKeyDown}>
            <CommandInput
              ref={commandInputRef}
              placeholder={searchPlaceholder}
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
            {!loading && !searchError && entities.length === 0 && (
              <CommandEmpty className="text-black p-3 text-sm">
                {noResultsMessage}
              </CommandEmpty>
            )}
            <CommandGroup className="bg-white max-h-64 overflow-auto">
              {entities.map((entity, index) => (
                <CommandItem
                  key={entity._id}
                  value={entity[displayField]}
                  onSelect={() => handleSelect(entity)}
                  ref={(el) => (commandItemsRef.current[index] = el)}
                  className={cn(
                    "hover:cursor-pointer text-black min-h-[44px] flex items-start py-3",
                    highlightedIndex === index && "bg-gray-100"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 mt-1",
                      value === entity._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-sm">{entity[displayField]}</span>
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

export default EntitySearch;
