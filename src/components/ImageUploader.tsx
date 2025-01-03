"use client";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

interface ImageUploaderProps {
  name: string;
  label: string;
  setFieldValue: (field: string, value: string) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
  initialPreview?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  tabIndex?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  label,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  initialPreview,
  required = false,
  error,
  touched,
  tabIndex,
}) => {
  const [preview, setPreview] = useState<string>(initialPreview || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setFieldTouched(name, true);

    if (!file) {
      if (required) {
        setFieldError(name, "Image is required");
      }
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setFieldError(name, "Please upload an image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setFieldError(name, "Image size should be less than 5MB");
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      setIsUploading(true);
      setFieldError(name, undefined);

      // Create form data
      const formData = new FormData();
      formData.append("image", file);

      // Upload image
      const response = await axiosInstance.post("/media/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("----", response);
      // Set the image URL in Formik
      setFieldValue(name, response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setFieldError(name, "Failed to upload image. Please try again.");
      setPreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setFieldValue(name, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFieldTouched(name, true);
    if (required) {
      setFieldError(name, "Image is required");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        onChange={handleImageChange}
        className={`cursor-pointer bg-white text-black ${
          touched && error ? "border-red-500" : ""
        }`}
        accept="image/*"
        disabled={isUploading}
        onBlur={() => setFieldTouched(name, true)}
        tabIndex={tabIndex}
      />
      {isUploading && <div className="text-sm text-gray-500">Uploading...</div>}
      {!isUploading && touched && error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      {preview && (
        <div className="relative mt-2 border-none max-w-[80px]">
          <button
            type="button"
            className="border-none  absolute top-0 left-0 bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary/90 h-7 w-7"
            onClick={handleRemoveImage}
            aria-label="Remove Image"
            tabIndex={tabIndex ? tabIndex + 1 : undefined}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={preview}
            alt="Preview"
            className="h-20 w-auto rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
