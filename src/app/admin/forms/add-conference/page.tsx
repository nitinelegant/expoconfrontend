"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  eventTypes,
  exhibitionTypes,
  months,
  segmentTypes,
  statesAndUnionTerritories,
  years,
} from "@/constants/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import VenueSearch from "@/components/VenueSearch";
import BackButton from "@/components/BackButton";

const AddEvent = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // const [logoPreview, setLogoPreview] = useState(null);

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
      segment: "",
      exhibitorProfile: "",
      visitorProfile: "",
    },
    validationSchema: Yup.object({
      eventType: Yup.string().required("Event Type is required"),
      eventFullName: Yup.string().required("Event Full Name is required"),
      eventShortName: Yup.string().required("Event Short Name is required"),
      year: Yup.string()
        .required("Year is required")
        .test("future-year", "Cannot select past year", (value) => {
          if (!value) return true;
          return parseInt(value) >= today.getFullYear();
        }),
      month: Yup.string()
        .required("Month is required")
        .test("future-month", "Cannot select past month", function (value) {
          if (!value || !this.parent.year) return true;
          const selectedYear = parseInt(this.parent.year);
          const currentYear = today.getFullYear();
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
          const selectedMonthIndex = months.indexOf(value);

          if (selectedYear > currentYear) return true;
          if (selectedYear === currentYear) {
            return selectedMonthIndex >= today.getMonth();
          }
          return false;
        }),
      startDate: Yup.date()
        .required("Start Date is required")
        .min(today, "Cannot select past date")
        .test(
          "year-match",
          "Start date must be in selected year",
          function (value) {
            if (!value || !this.parent.year) return true;
            return (
              new Date(value).getFullYear().toString() === this.parent.year
            );
          }
        ),
      endDate: Yup.date()
        .required("End Date is required")
        .min(Yup.ref("startDate"), "End date must be after start date")
        .min(today, "Cannot select past date")
        .test(
          "year-match",
          "End date must be in selected year",
          function (value) {
            if (!value || !this.parent.year) return true;
            return (
              new Date(value).getFullYear().toString() === this.parent.year
            );
          }
        )
        .test(
          "month-match",
          "End date must be in selected month",
          function (value) {
            if (!value || !this.parent.month) return true;
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
            return months[new Date(value).getMonth()] === this.parent.month;
          }
        ),
      entryFees: Yup.number().required("Entry Fees is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      venue: Yup.string().required("Venue is required"),
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      segment: Yup.string().required("Exhibition Type is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const handleLogoChange = (event) => {
  //   const file = event.currentTarget.files?.[0];
  //   formik.setFieldValue("logo", file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setLogoPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Generate time options for the time picker
  const generateTimeOptions = () => {
    const times = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hour = hours.toString().padStart(2, "0");
        const minute = minutes.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const todayStr = today.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Conference</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("eventType", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.eventType && formik.errors.eventType
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue
                      placeholder="Select Event Type"
                      className="text-black"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:cursor-pointer"
                      >
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
                <Label htmlFor="eventFullName">Event Short Name*</Label>
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
                {formik.touched.eventShortName &&
                  formik.errors.eventShortName && (
                    <p className="text-sm text-red-600">
                      {formik.errors.eventShortName}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year*</Label>
                <Select
                  onValueChange={(value) => {
                    formik.setFieldValue("year", value);
                    formik.setFieldValue("startDate", "");
                    formik.setFieldValue("endDate", "");
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "text-black",
                      formik.touched.year &&
                        formik.errors.year &&
                        "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem
                        key={year}
                        value={year}
                        className="hover:cursor-pointer"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.year && formik.errors.year && (
                  <p className="text-sm text-red-600">{formik.errors.year}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Month*</Label>
                <Select
                  onValueChange={(value) => {
                    formik.setFieldValue("month", value);
                    formik.setFieldValue("startDate", "");
                    formik.setFieldValue("endDate", "");
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "text-black",
                      formik.touched.month &&
                        formik.errors.month &&
                        "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem
                        key={month}
                        value={month}
                        disabled={
                          formik.values.year ===
                            today.getFullYear().toString() &&
                          months.indexOf(month) < today.getMonth()
                        }
                        className="hover:cursor-pointer"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.month && formik.errors.month && (
                  <p className="text-sm text-red-600">{formik.errors.month}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date*</Label>
                <Input
                  type="date"
                  id="startDate"
                  {...formik.getFieldProps("startDate")}
                  className={cn(
                    formik.touched.startDate &&
                      formik.errors.startDate &&
                      "border-red-500"
                  )}
                  min={todayStr}
                  max={
                    formik.values.year && formik.values.month
                      ? `${formik.values.year}-${String(
                          months.indexOf(formik.values.month) + 1
                        ).padStart(2, "0")}-${new Date(
                          formik.values.year,
                          months.indexOf(formik.values.month) + 1,
                          0
                        ).getDate()}`
                      : undefined
                  }
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-sm text-red-600">
                    {formik.errors.startDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date*</Label>
                <Input
                  type="date"
                  id="endDate"
                  {...formik.getFieldProps("endDate")}
                  className={cn(
                    formik.touched.endDate &&
                      formik.errors.endDate &&
                      "border-red-500"
                  )}
                  min={formik.values.startDate || todayStr}
                  max={
                    formik.values.year && formik.values.month
                      ? `${formik.values.year}-${String(
                          months.indexOf(formik.values.month) + 1
                        ).padStart(2, "0")}-${new Date(
                          formik.values.year,
                          months.indexOf(formik.values.month) + 1,
                          0
                        ).getDate()}`
                      : undefined
                  }
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-sm text-red-600">
                    {formik.errors.endDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Timings</Label>
                <Popover>
                  <PopoverTrigger asChild className="bg-white text-black">
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
                      {timeOptions.map((time) => (
                        <Button
                          key={time}
                          variant="ghost"
                          className="w-full justify-start text-black bg-white"
                          onClick={() => {
                            formik.setFieldValue("timings", time);
                            formik.setFieldTouched("timings", true);
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {formik.touched.timings && formik.errors.timings && (
                  <p className="text-sm text-red-600">
                    {formik.errors.timings}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryFees">Entry Fees* (₹)</Label>
                <Input
                  type="number"
                  id="entryFees"
                  {...formik.getFieldProps("entryFees")}
                  className={
                    formik.touched.entryFees && formik.errors.entryFees
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.entryFees && formik.errors.entryFees && (
                  <p className="text-sm text-red-600">
                    {formik.errors.entryFees}
                  </p>
                )}
              </div>

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
                {formik.touched.city && formik.errors.city && (
                  <p className="text-sm text-red-600">{formik.errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("state", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue
                      placeholder="Select State"
                      className="text-black"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {statesAndUnionTerritories.map((state) => (
                      <SelectItem
                        key={state}
                        value={state}
                        className="hover:cursor-pointer"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <p className="text-sm text-red-600">{formik.errors.state}</p>
                )}
              </div>
              <VenueSearch
                value={formik.values.venue}
                onChange={(value) => formik.setFieldValue("venue", value)}
                onBlur={formik.handleBlur}
                error={formik.errors.venue}
                touched={formik.touched.venue}
              />

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
                {formik.touched.website && formik.errors.website && (
                  <p className="text-sm text-red-600">
                    {formik.errors.website}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Upload Event Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  // onChange={handleLogoChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
                {/* {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="mt-2 h-20 w-auto rounded-md"
                  />
                )} */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input id="frequency" {...formik.getFieldProps("frequency")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exhibitionOrganizer">
                  Conference Organizer PCO
                </Label>
                <Input
                  id="exhibitionOrganizer"
                  {...formik.getFieldProps("exhibitionOrganizer")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Conference Segment</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("segment", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.segment && formik.errors.segment
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:cursor-pointer"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.segment && formik.errors.segment && (
                  <p className="text-sm text-red-600">
                    {formik.errors.segment}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">National Association</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("segment", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.segment && formik.errors.segment
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:cursor-pointer"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.segment && formik.errors.segment && (
                  <p className="text-sm text-red-600">
                    {formik.errors.segment}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">Hosting Chapter</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("segment", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.segment && formik.errors.segment
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="hover:cursor-pointer"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.segment && formik.errors.segment && (
                  <p className="text-sm text-red-600">
                    {formik.errors.segment}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exhibitorProfile">Exhibitor Profile</Label>
              <Textarea
                id="exhibitorProfile"
                {...formik.getFieldProps("exhibitorProfile")}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitorProfile">Visitor Profile</Label>
              <Textarea
                id="visitorProfile"
                {...formik.getFieldProps("visitorProfile")}
                className="text-black"
              />
            </div>

            <Button type="submit" className="w-full bg-primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEvent;
