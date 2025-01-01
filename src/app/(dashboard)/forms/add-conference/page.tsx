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
  associationTypes,
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
import { withAuth } from "@/utils/withAuth";
import SearchInput from "@/components/SearchInput";
import { useEffect, useRef, useState } from "react";
import { listApi } from "@/api/listApi";
import { AssociationProps, CompanyProps } from "@/types/listTypes";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { createFormApi } from "@/api/createFormApi";
import { Loader } from "@/components/ui/loader";

const ConferenceForm = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { toast } = useToast();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [companies, setcompanies] = useState<CompanyProps[]>([]);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  const searchParams = useSearchParams();
  const conferenceId = searchParams.get("id");
  const isEditMode = Boolean(searchParams.get("id"));
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
      conferenceOrganizer: "",
      segment: "",
      exhibitorProfile: "",
      visitorProfile: "",
      nationalAssociation: "",
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
          const selectedMonth = parseInt(value);
          const currentMonth = today.getMonth() + 1; // Adding 1 since months array is 1-based

          if (selectedYear > currentYear) return true;
          if (selectedYear === currentYear) {
            return selectedMonth >= currentMonth;
          }
          return false;
        }),
      startDate: Yup.date()
        .required("Start Date is required")
        .test("valid-date-range", "Invalid date selection", function (value) {
          if (!value || !this.parent.year || !this.parent.month) return true;

          const selectedDate = new Date(value);
          const selectedYear = parseInt(this.parent.year);
          const selectedMonth = parseInt(this.parent.month) - 1; // Subtract 1 for 0-based month

          // Check if date is in past
          if (selectedDate < today) {
            return this.createError({ message: "Cannot select past date" });
          }

          // Check if date matches selected year and month
          if (selectedDate.getFullYear() !== selectedYear) {
            return this.createError({
              message: "Date must be in selected year",
            });
          }

          if (selectedDate.getMonth() !== selectedMonth) {
            return this.createError({
              message: "Date must be in selected month",
            });
          }

          return true;
        }),

      endDate: Yup.date()
        .required("End Date is required")
        .test("valid-end-date", "Invalid end date selection", function (value) {
          if (
            !value ||
            !this.parent.startDate ||
            !this.parent.year ||
            !this.parent.month
          )
            return true;

          const endDate = new Date(value);
          const startDate = new Date(this.parent.startDate);
          const selectedYear = parseInt(this.parent.year);
          const selectedMonth = parseInt(this.parent.month) - 1; // Subtract 1 for 0-based month

          // Check if end date is before start date
          if (endDate < startDate) {
            return this.createError({
              message: "End date must be after start date",
            });
          }

          // Check if date is in past
          if (endDate < today) {
            return this.createError({ message: "Cannot select past date" });
          }

          // Check if date matches selected year and month
          if (endDate.getFullYear() !== selectedYear) {
            return this.createError({
              message: "Date must be in selected year",
            });
          }

          if (endDate.getMonth() !== selectedMonth) {
            return this.createError({
              message: "Date must be in selected month",
            });
          }

          return true;
        }),
      entryFees: Yup.number().required("Entry Fees is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      venue: Yup.string().required("Venue is required"),
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      segment: Yup.string().required("Exhibition Type is required"),
      nationalAssociation: Yup.string().required(
        "National Association is required"
      ),
      conferenceOrganizer: Yup.string().required(
        "Conference Organizer is required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const {
          eventType,
          eventFullName,
          eventShortName,
          startDate,
          endDate,
          timings,
          year,
          state,
          city,
          conferenceOrganizer,
          segment,
          website,
          venue,
          entryFees,
          frequency,
          month,
          nationalAssociation,
        } = values;
        const payload = {
          con_type_id: parseInt(eventType),
          con_fullname: eventFullName,
          con_shortname: eventShortName,
          con_sd: startDate,
          con_ed: endDate,
          month_id: parseInt(month),
          year_id: parseInt(year),
          con_time: timings,
          fee_id: parseInt(entryFees),
          con_city: city,
          state_id: parseInt(state),
          venue_id: venue,
          con_website: website,
          con_logo: "",
          con_frequency: frequency,
          company_id: conferenceOrganizer,
          con_segment_id: parseInt(segment),
          con_nassociation_id: parseInt(nationalAssociation),
          con_hassociation_id: parseInt(segment),
        };

        if (isEditMode) {
          await createFormApi.updateVenue(conferenceId as string, payload);
          toast({
            title: "Venue Updated Successfully!",
            description: "The venue has been updated successfully.",
            duration: 3000,
            variant: "success",
          });
        } else {
          const response = await createFormApi.addConference(payload);
          if (response) {
            console.log("submitting vlaues", response);
            toast({
              title: "Conference Added Successfully!",
              description:
                "The conference has been added successfully. You can view it in the conference list.",
              duration: 3000,
              variant: "success",
            });
          }

          router.push("/records/conference");
        }
      } catch (error) {
        toast({
          title: "Add Conference Failed",
          description:
            "Failed to add conference. Please check your credentials and try again.",
          duration: 2500,
          variant: "error",
        });
        console.log(`error while submitting form`, error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!initialLoading) {
      // Use a short timeout to ensure the component has fully rendered
      const focusTimer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(focusTimer);
    }
  }, [initialLoading]);

  const fetchCompany = async () => {
    try {
      const { companies } = await listApi.getCompanies();
      if (companies?.length > 0) setcompanies(companies);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAssociation = async () => {
    try {
      const { associations } = await listApi.getAssociation();
      if (associations?.length > 0) setAssociations(associations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([fetchCompany(), fetchAssociation()]);
        if (isEditMode) {
          const { conference } = await createFormApi.getConference(
            conferenceId as string
          );
          console.log("contactData", conference);
          formik.setValues({
            eventType: conference?.con_type_id?.toString(),
            eventFullName: conference?.con_fullname,
            eventShortName: conference?.con_shortname,
            startDate: conference?.con_sd,
            endDate: conference?.con_ed,
            month: conference?.month_id,
            year: conference?.year_id,
            timings: conference?.con_time,
            entryFees: conference?.fee_id,
            city: conference?.con_city,
            state: conference?.state_id?.toString(),
            venue: conference?.venue_id,
            website: conference?.con_website,
            logo: null,
            frequency: conference?.con_frequency,
            conferenceOrganizer: conference?.company_id,
            segment: conference?.con_segment_id,
            exhibitorProfile: "",
            visitorProfile: "",
            nationalAssociation: conference?.con_hassociation_id,
          });
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load data. Please try again.",
          variant: "error",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    initializeData();
  }, [isEditMode, conferenceId]);

  if (initialLoading || isLoading) return <Loader size="medium" />;

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

  const getMaxDateForMonth = (year: string, month: string) => {
    if (!year || !month) return undefined;

    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    return `${year}-${String(month).padStart(2, "0")}-${String(
      lastDay
    ).padStart(2, "0")}`;
  };

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
                    ref={firstInputRef}
                    tabIndex={1}
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
                    {associationTypes.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item.name}
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
                  tabIndex={2}
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
                  tabIndex={3}
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
                    tabIndex={4}
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
                    tabIndex={5}
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
                        key={month.id}
                        value={month.id.toString()}
                        disabled={
                          formik.values.year ===
                            today.getFullYear().toString() &&
                          months.indexOf(month) < today.getMonth()
                        }
                        className="hover:cursor-pointer"
                      >
                        {month.name}
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
                      ? getMaxDateForMonth(
                          formik.values.year,
                          formik.values.month
                        )
                      : undefined
                  }
                  tabIndex={6}
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
                      ? getMaxDateForMonth(
                          formik.values.year,
                          formik.values.month
                        )
                      : undefined
                  }
                  tabIndex={7}
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
                      tabIndex={8}
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
                  tabIndex={9}
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
                  tabIndex={10}
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
                    tabIndex={11}
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
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
                        key={state.id}
                        value={state.id.toString()}
                        className="hover:cursor-pointer capitalize"
                      >
                        {state.name}
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
                onBlur={formik.handleBlur}
                error={formik.errors.venue}
                touched={formik.touched.venue}
                onChange={(value) =>
                  formik.handleChange({ target: { name: "venue", value } })
                }
                tabIndex={12}
              />

              <SearchInput
                label="Website"
                placeholder="Enter website URL"
                id="website"
                onResultFound={() => {}}
                debounceTime={600}
                value={formik.values.website}
                onChange={(value) => {
                  console.log("values", value);
                  formik.setFieldValue("website", value);
                }}
                onBlur={formik.handleBlur}
                error={formik.errors.website}
                touched={formik.touched.website}
                apiEndpoint="company"
                tabIndex={13}
              />

              {/* <div className="space-y-2">
                <Label htmlFor="website">Website*</Label>
                <Input
                  id="website"
                  type="url"
                  tabIndex={13}
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
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="logo">Upload Event Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  tabIndex={14}
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
                <Input
                  id="frequency"
                  tabIndex={15}
                  {...formik.getFieldProps("frequency")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conferenceOrganizer">
                  {" "}
                  Conference Organizer PCO
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("conferenceOrganizer", value)
                  }
                >
                  <SelectTrigger
                    tabIndex={17}
                    className={
                      formik.touched.conferenceOrganizer &&
                      formik.errors.conferenceOrganizer
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference organizer" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id}
                        className="hover:cursor-pointer"
                      >
                        {item.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.conferenceOrganizer &&
                  formik.errors.conferenceOrganizer && (
                    <p className="text-sm text-red-600">
                      {formik.errors.conferenceOrganizer}
                    </p>
                  )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="conferenceOrganizer">
                  Conference Organizer PCO
                </Label>
                <Input
                  id="conferenceOrganizer"
                  tabIndex={16}
                  {...formik.getFieldProps("conferenceOrganizer")}
                />
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="segment">Conference Segment</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("segment", value)
                  }
                >
                  <SelectTrigger
                    tabIndex={17}
                    className={
                      formik.touched.segment && formik.errors.segment
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentTypes.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item.name}
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
                    formik.setFieldValue("nationalAssociation", value)
                  }
                >
                  <SelectTrigger
                    tabIndex={18}
                    className={
                      formik.touched.nationalAssociation &&
                      formik.errors.nationalAssociation
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {associations?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item.association_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.nationalAssociation &&
                  formik.errors.nationalAssociation && (
                    <p className="text-sm text-red-600">
                      {formik.errors.nationalAssociation}
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
                    tabIndex={19}
                    className={
                      formik.touched.segment && formik.errors.segment
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select conference segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentTypes.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item.name}
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
                tabIndex={20}
                {...formik.getFieldProps("exhibitorProfile")}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitorProfile">Visitor Profile</Label>
              <Textarea
                id="visitorProfile"
                tabIndex={21}
                {...formik.getFieldProps("visitorProfile")}
                className="text-black"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary"
              tabIndex={22}
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ConferenceForm, { requiredRole: ["admin", "staff"] });
