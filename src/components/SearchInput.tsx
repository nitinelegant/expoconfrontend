import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";
import { Loader2 } from "lucide-react";

interface SearchResponse {
  found: boolean;
  data?: [];
}

interface SearchInputProps {
  label?: string;
  placeholder?: string;
  id?: string;
  onResultFound?: (result: SearchResponse | null) => void;
  className?: string;
  initialValue?: string;
  debounceTime?: number;
  apiEndpoint?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  tabIndex?: number;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label = "Search",
      placeholder = "Enter search term...",
      id = "search",
      onResultFound = () => {},
      className,
      initialValue = "",
      debounceTime = 300,
      apiEndpoint = "/api/search",
      value: externalValue,
      onChange: externalOnChange,
      onBlur,
      error,
      touched,
      tabIndex,
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState<string>(
      externalValue || initialValue
    );
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("Not available");

    useEffect(() => {
      if (externalValue !== undefined) {
        setSearchTerm(externalValue);
      }
    }, [externalValue]);

    const performSearch = async (term: string): Promise<void> => {
      if (!term.trim()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(
          "This website is already in use. Please use another one."
        );

        const response = await axiosInstance.get<SearchResponse>(
          `${apiEndpoint}/website?url=${searchTerm}`
        );

        if (response.data.found) {
          setIsError(true);
          onResultFound(null);
        } else {
          setIsError(false);
          onResultFound(response.data);
        }
      } catch (error) {
        setIsError(true);
        onResultFound(null);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            setErrorMessage("Not found");
          } else if (axiosError.code === "ECONNABORTED") {
            setErrorMessage("Request timeout");
          } else {
            setErrorMessage("An error occurred");
          }
          console.error("Search error:", axiosError.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const debounceTimer = setTimeout(() => {
        if (searchTerm.length > 0) {
          performSearch(searchTerm);
        } else {
          setIsError(false);
          onResultFound(null);
        }
      }, debounceTime);

      return () => clearTimeout(debounceTimer);
    }, [searchTerm, debounceTime]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      if (externalOnChange) {
        externalOnChange(newValue);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        performSearch(searchTerm);
      }
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            tabIndex={tabIndex}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={cn(
              className,
              isError || (touched && error)
                ? "border-red-500 focus:ring-red-500"
                : "",
              isLoading ? "pr-10" : ""
            )}
            aria-invalid={isError || (touched && !!error)}
            aria-describedby={
              isError || (touched && error) ? `${id}-error` : undefined
            }
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
          )}
        </div>
        {touched && error ? (
          <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : (
          isError &&
          searchTerm.length > 0 && (
            <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
