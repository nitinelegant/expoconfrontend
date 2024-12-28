import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "accent";
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  color = "primary",
  className,
  ...props
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
  };

  return (
    <div className="h-screen flex  justify-center items-center">
      <div
        className={cn(
          "inline-block rounded-full animate-spin ",
          sizeClasses[size],
          colorClasses[color],
          "border-t-transparent",
          className
        )}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export { Loader };
