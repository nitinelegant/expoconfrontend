import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoogleMapInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  tabIndex?: number;
}

const GoogleMapInput: React.FC<GoogleMapInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  ...props
}) => {
  // Extract src URL from iframe string if provided
  const extractMapUrl = (value: string): string => {
    if (!value) return "";

    // If it's an iframe, extract the src
    if (value.includes("<iframe")) {
      const srcMatch = value.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : "";
    }

    // If it's already a URL, return it
    return value;
  };

  const isValidGoogleMapLink = (value: string): boolean => {
    const url = extractMapUrl(value);
    return url.startsWith("https://www.google.com/maps/embed?pb=");
  };

  const renderMap = () => {
    if (!value) return null;

    const url = extractMapUrl(value);
    if (isValidGoogleMapLink(url)) {
      return (
        <div className="mt-2 rounded-md overflow-hidden border border-gray-200">
          <iframe
            src={url}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          />
        </div>
      );
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-gray-900">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        {...props}
        className={`${touched && error ? "border-red-500" : ""} text-black`}
      />
      {touched && error && <p className="text-sm text-red-600">{error}</p>}
      {renderMap()}
    </div>
  );
};

export default GoogleMapInput;
