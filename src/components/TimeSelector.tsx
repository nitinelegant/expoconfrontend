import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormikProps } from "formik";

interface FormValues {
  timings: string;
  [key: string]: string;
}

interface TimeSelectorProps {
  formik: FormikProps<FormValues>;
  timeOptions: string[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ formik, timeOptions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    time: string,
    index: number
  ): void => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        formik.setFieldValue("timings", time);
        formik.setFieldTouched("timings", true);
        setIsOpen(false);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (index < timeOptions.length - 1) {
          buttonRefs.current[index + 1]?.focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index > 0) {
          buttonRefs.current[index - 1]?.focus();
        }
        break;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="time">Timings</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="bg-white text-black" tabIndex={8}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-black",
              !formik.values.timings && "text-black",
              formik.touched.timings &&
                formik.errors.timings &&
                "border-red-500"
            )}
          >
            <Clock className="mr-2 h-4 w-4 text-black" />
            {formik.values.timings || "Select time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-56 p-0 bg-white">
          <div className="h-64 overflow-y-auto p-2">
            {timeOptions.map((time, index) => (
              <Button
                key={time}
                ref={(el) => (buttonRefs.current[index] = el)}
                variant="ghost"
                className="w-full justify-start text-black bg-white focus:bg-gray-100 hover:bg-gray-100"
                onClick={() => {
                  formik.setFieldValue("timings", time);
                  formik.setFieldTouched("timings", true);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => handleKeyDown(e, time, index)}
              >
                {time}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {formik.touched.timings && formik.errors.timings && (
        <p className="text-sm text-red-600">{formik.errors.timings}</p>
      )}
    </div>
  );
};

export default TimeSelector;
