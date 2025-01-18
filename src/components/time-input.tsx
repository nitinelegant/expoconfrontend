"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error?: string;
  touched?: boolean;
  tabIndex?: number;
}

const TimeInput: React.FC<TimeInputProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  tabIndex,
}) => {
  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("AM");

  useEffect(() => {
    if (value) {
      const [timeStr, period] = value.split(" ");
      setTime(timeStr);
      setAmpm(period || "AM");
    }
  }, [value]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9:]/g, "");

    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
    }

    if (inputValue.length === 2 && !inputValue.includes(":")) {
      inputValue += ":";
    }

    const [hours, minutes] = inputValue.split(":");
    if (hours && parseInt(hours) > 12) {
      inputValue = "12" + inputValue.slice(2);
    }
    if (minutes && parseInt(minutes) > 59) {
      inputValue = inputValue.slice(0, 3) + "59";
    }

    setTime(inputValue);
    updateParentValue(inputValue, ampm);
  };

  const toggleAmPm = () => {
    const newAmPm = ampm === "AM" ? "PM" : "AM";
    setAmpm(newAmPm);
    updateParentValue(time, newAmPm);
  };

  const updateParentValue = (timeValue: string, ampmValue: string) => {
    const event = {
      target: {
        name: id,
        value: `${timeValue} ${ampmValue}`,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          id={id}
          name={id}
          tabIndex={tabIndex}
          value={time}
          onChange={handleTimeChange}
          onBlur={onBlur}
          placeholder="HH:MM"
          maxLength={5}
          className={touched && error ? "border-red-500" : ""}
        />
        <Button
          type="button"
          onClick={toggleAmPm}
          variant="outline"
          className="w-16 bg-white text-black"
        >
          {ampm}
        </Button>
      </div>
      {touched && error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TimeInput;
