"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const eventTypes = [
  "Conference",
  "Exhibition",
  "Trade Show",
  "Workshop",
  "Seminar",
  "Other",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() + i).toString()
);

const states = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  // Add other states as needed
];

const venues = [
  "Convention Center",
  "Exhibition Hall",
  "Hotel Ballroom",
  "Trade Center",
  // Add other venues as needed
];

const exhibitionTypes = ["B2B", "B2C", "Both B2B & B2C"];

export default function AddConference() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      eventType: "",
      eventFullName: "",
      eventShortName: "",
      startDate: "",
      endDate: "",
      month: "",
      year: "",
      timings: "",
      entryFees: "",
      city: "",
      state: "",
      venue: "",
      website: "",
      logo: null,
      frequency: "",
      exhibitionOrganizer: "",
      exhibitionType: "",
      exhibitorProfile: "",
      visitorProfile: "",
    },
    validationSchema: Yup.object({
      eventType: Yup.string().required("Event Type is required"),
      eventFullName: Yup.string().required("Event Full Name is required"),
      eventShortName: Yup.string().required("Event Short Name is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date can't be before start date")
        .required("End Date is required"),
      month: Yup.string().required("Month is required"),
      year: Yup.string().required("Year is required"),
      entryFees: Yup.string().required("Entry Fees is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      venue: Yup.string().required("Venue is required"),
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      exhibitionType: Yup.string().required("Exhibition Type is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    formik.setFieldValue("logo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-h-screen bg-gray-50 p-6">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Conference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Event Type */}
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("eventType", value)
                  }
                  defaultValue={formik.values.eventType}
                >
                  <SelectTrigger
                    className={
                      formik.touched.eventType && formik.errors.eventType
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.eventType && formik.errors.eventType && (
                  <p className="text-sm text-red-600">
                    {formik.errors.eventType}
                  </p>
                )}
              </div>

              {/* Event Names */}
              <div className="space-y-2">
                <Label htmlFor="eventFullName">Event Full Name*</Label>
                <Input
                  id="eventFullName"
                  {...formik.getFieldProps("eventFullName")}
                  className={
                    formik.touched.eventFullName && formik.errors.eventFullName
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.eventFullName &&
                  formik.errors.eventFullName && (
                    <p className="text-sm text-red-600">
                      {formik.errors.eventFullName}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventShortName">Event Short Name*</Label>
                <Input
                  id="eventShortName"
                  {...formik.getFieldProps("eventShortName")}
                  className={
                    formik.touched.eventShortName &&
                    formik.errors.eventShortName
                      ? "border-red-500"
                      : ""
                  }
                />
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <Label>Start Date*</Label>
                <Popover>
                  <PopoverTrigger asChild className="bg-white text-black">
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.startDate
                        ? format(new Date(formik.values.startDate), "PP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white text-black">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.startDate
                          ? new Date(formik.values.startDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date*</Label>
                <Popover>
                  <PopoverTrigger asChild className="bg-white text-black">
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.endDate
                        ? format(new Date(formik.values.endDate), "PP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white text-black">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.endDate
                          ? new Date(formik.values.endDate)
                          : undefined
                      }
                      onSelect={(date) => formik.setFieldValue("endDate", date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Month and Year */}
              <div className="space-y-2">
                <Label>Month*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("month", value)
                  }
                  defaultValue={formik.values.month}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year*</Label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("year", value)}
                  defaultValue={formik.values.year}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Other Fields */}
              <div className="space-y-2">
                <Label htmlFor="timings">Timings</Label>
                <Input id="timings" {...formik.getFieldProps("timings")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryFees">Entry Fees*</Label>
                <Input
                  id="entryFees"
                  {...formik.getFieldProps("entryFees")}
                  className={
                    formik.touched.entryFees && formik.errors.entryFees
                      ? "border-red-500"
                      : ""
                  }
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  {...formik.getFieldProps("city")}
                  className={
                    formik.touched.city && formik.errors.city
                      ? "border-red-500"
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>State*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("state", value)
                  }
                  defaultValue={formik.values.state}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Venue*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("venue", value)
                  }
                  defaultValue={formik.values.venue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Website and Logo */}
              <div className="space-y-2">
                <Label htmlFor="website">Website*</Label>
                <Input
                  id="website"
                  type="url"
                  {...formik.getFieldProps("website")}
                  className={
                    formik.touched.website && formik.errors.website
                      ? "border-red-500"
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Upload Event Logo</Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleLogoChange}
                  className="cursor-pointer"
                  accept="image/*"
                />
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="mt-2 h-20 w-auto rounded-md"
                  />
                )}
              </div>

              {/* Exhibition Details */}
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input id="frequency" {...formik.getFieldProps("frequency")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exhibitionOrganizer">
                  Exhibition Organizer
                </Label>
                <Input
                  id="exhibitionOrganizer"
                  {...formik.getFieldProps("exhibitionOrganizer")}
                />
              </div>

              <div className="space-y-2">
                <Label>Exhibition Type</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("exhibitionType", value)
                  }
                  defaultValue={formik.values.exhibitionType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Exhibition Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {exhibitionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Profiles */}
            <div className="space-y-2">
              <Label htmlFor="exhibitorProfile">Exhibitor Profile</Label>
              <Textarea
                id="exhibitorProfile"
                {...formik.getFieldProps("exhibitorProfile")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitorProfile">Visitor Profile</Label>
              <Textarea
                id="visitorProfile"
                {...formik.getFieldProps("visitorProfile")}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
