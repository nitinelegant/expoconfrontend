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
import { Button } from "@/components/ui/button";
import { months } from "@/constants/form";
import { cn } from "@/lib/utils";
import VenueSearch from "@/components/VenueSearch";
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";
import SearchInput from "@/components/SearchInput";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TimeSelector from "@/components/TimeSelector";
import { createFormApi } from "@/api/createFormApi";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";
import { useSegments } from "@/hooks/useSegments";
import ImageUploader from "@/components/ImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyProps } from "@/types/listTypes";
import { listApi } from "@/api/listApi";

const today = new Date();
today.setHours(0, 0, 0, 0);

const ExhibitonForm = () => {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const exhibitionId = searchParams.get("id");
  const isEditMode = Boolean(searchParams.get("id"));
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

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
      logo: "",
      frequency: "",
      exhibitionOrganizer: "",
      exhibitionType: "",
      exhibitorProfile: "",
      visitorProfile: "",
      featured: false,
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
      exhibitionType: Yup.string(),
      exhibitionOrganizer: Yup.string(),
      logo: Yup.string(),
      featured: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const {
          eventType,
          eventFullName,
          eventShortName,
          year,
          month,
          startDate,
          endDate,
          timings,
          entryFees,
          city,
          state,
          venue,
          website,
          logo,
          frequency,
          exhibitionOrganizer,
          exhibitionType,
          exhibitorProfile,
          visitorProfile,
          featured,
        } = values;
        const payload = {
          year_id: data?.year_id
            .find((x) => parseInt(x.name) === parseInt(year))
            ?._id.toString(),
          fee_id: parseInt(entryFees),
          con_city: city,
          state_id: state,
          venue_id: venue,
          company_id: exhibitionOrganizer,
          expo_type_id: eventType,
          expo_fullname: eventFullName,
          expo_shortname: eventShortName,
          expo_sd: startDate,
          expo_ed: endDate,
          month_id: parseInt(month),
          expo_time: timings,
          expo_city: city,
          expo_website: website,
          expo_logo: logo ? logo : "",
          expo_frequency: frequency,
          expo_segment_id: exhibitionType,
          expo_eprofile: exhibitorProfile,
          expo_vprofile: visitorProfile,
          expo_featured: featured,
        };

        if (isEditMode) {
          const response = await createFormApi.updateExhibition(
            exhibitionId as string,
            payload
          );
          if (response) {
            toast({
              title: "Exhibition Updated Successfully!",
              description: "The exhibition has been updated successfully.",
              duration: 3000,
              variant: "success",
            });
          }
        } else {
          const response = await createFormApi.addExhibition(payload);
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
        }
        if (window.history.length > 1) {
          router.back(); // Navigates to the previous page
        } else {
          router.push("/"); // Fallback: Navigate to the home page
        }
      } catch (error) {
        toast({
          title: "Add Conference Failed",
          description:
            "Failed to add conference. Please check your fields and try again.",
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

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        fetchCompany();
        if (isEditMode) {
          const { exhibition } = await createFormApi.getExhibition(
            exhibitionId as string
          );

          if (exhibition) {
            formik.setValues(
              {
                ...formik.values,
                eventType: exhibition.expo_type_id?.toString(),
                eventFullName: exhibition.expo_fullname,
                eventShortName: exhibition.expo_shortname,
                startDate: exhibition.expo_sd,
                endDate: exhibition.expo_ed,
                timings: exhibition.expo_time,
                year: data?.year_id
                  ?.find((x) => x?._id?.toString() === exhibition?.year_id)
                  ?.name?.toString(),
                state: exhibition.state_id?.toString(),
                city: exhibition.expo_city,
                exhibitionType: exhibition?.expo_segment_id?.toString(),
                website: exhibition.expo_website,
                venue: exhibition.venue_id?.toString(),
                entryFees: exhibition.fee_id?.toString(),
                frequency: exhibition.expo_frequency,
                month: exhibition.month_id?.toString(),
                exhibitionOrganizer: exhibition.company_id?.toString(),
                logo: exhibition.expo_logo,
                exhibitorProfile: exhibition?.expo_eprofile,
                visitorProfile: exhibition?.expo_vprofile,
                featured: exhibition?.expo_featured,
              },
              false
            );
          }
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        // toast({
        //   title: "Error Loading Data",
        //   description: "Failed to load contact information. Please try again.",
        //   variant: "error",
        // });
      } finally {
        setInitialLoading(false);
      }
    };

    initializeData();
  }, [isEditMode, exhibitionId]);

  const fetchCompany = async () => {
    try {
      const { companies } = await listApi.fetchCompanies();
      setCompanies(companies);
    } catch (error) {
      console.log(error);
    }
  };

  if (initialLoading || isLoading) return <Loader size="medium" />;

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

  const handleResultFound = () => {};

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
          <CardTitle className="text-2xl font-bold text-black">
            {isEditMode ? "Update" : "Add"} Exhibition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-900">
                  Event Type*
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("eventType", value)
                  }
                  defaultValue={formik.values.eventType}
                >
                  <SelectTrigger
                    tabIndex={1}
                    ref={firstInputRef}
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    {data?.expo_type_id?.map((state) => (
                      <SelectItem
                        key={state._id}
                        value={state._id.toString()}
                        className=" text-black hover:cursor-pointer capitalize"
                      >
                        {state?.name}
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
                  defaultValue={formik.values.year}
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
                    {data?.year_id?.map((year) => (
                      <SelectItem
                        key={year._id}
                        value={year?.name?.toString()}
                        className="hover:cursor-pointer"
                      >
                        {year?.name}
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
                  defaultValue={formik.values.month}
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
                  tabIndex={6}
                  value={
                    formik.values.startDate
                      ? new Date(formik.values.startDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    formik.setFieldValue("startDate", e.target.value);
                  }}
                  // {...formik.getFieldProps("startDate")}
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date*</Label>
                <Input
                  type="date"
                  id="endDate"
                  tabIndex={7}
                  value={
                    formik.values.endDate
                      ? new Date(formik.values.endDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    formik.setFieldValue("endDate", e.target.value);
                  }}
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
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-sm text-red-600">
                    {formik.errors.endDate}
                  </p>
                )}
              </div>

              <TimeSelector formik={formik} timeOptions={timeOptions} />

              <div className="space-y-2">
                <Label htmlFor="entryFees">Entry Fees* (₹)</Label>
                <Input
                  type="number"
                  id="entryFees"
                  tabIndex={9}
                  value={formik.values.entryFees}
                  onChange={(e) => {
                    formik.setFieldValue("entryFees", e.target.value);
                  }}
                  // {...formik.getFieldProps("entryFees")}
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
                <Label htmlFor="state" className="text-gray-900">
                  State*
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("state", value)
                  }
                  defaultValue={formik.values.state}
                >
                  <SelectTrigger
                    tabIndex={11}
                    aria-required="true"
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {data?.state_id?.map((state) => (
                      <SelectItem
                        key={state._id}
                        value={state._id.toString()}
                        className=" text-black hover:cursor-pointer capitalize"
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
                onChange={(value) => {
                  formik.setFieldValue("venue", value);
                  formik.setFieldTouched("venue", true, false);
                }}
                onBlur={formik.handleBlur}
                error={formik.errors.venue}
                touched={formik.touched.venue}
                tabIndex={12}
              />

              <SearchInput
                label="Website*"
                placeholder="Enter website URL"
                id="website"
                onResultFound={handleResultFound}
                debounceTime={600}
                value={formik.values.website}
                onChange={(value) => {
                  console.log("values", value);
                  formik.setFieldValue("website", value);
                }}
                onBlur={formik.handleBlur}
                error={formik.errors.website}
                touched={formik.touched.website}
                apiEndpoint="exhibition"
                disabled={isEditMode}
                tabIndex={13}
              />

              <ImageUploader
                name="logo"
                label="Upload Event Logo"
                setFieldValue={formik.setFieldValue}
                setFieldError={formik.setFieldError}
                setFieldTouched={formik.setFieldTouched}
                error={formik.errors.logo}
                touched={formik.touched.logo}
                initialPreview={formik.values.logo}
                tabIndex={14}
              />

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  tabIndex={15}
                  {...formik.getFieldProps("frequency")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exhibitionOrganizer">
                  Exhibition Organizer
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("exhibitionOrganizer", value)
                  }
                  defaultValue={formik.values.exhibitionOrganizer}
                >
                  <SelectTrigger
                    tabIndex={17}
                    className={
                      formik.touched.exhibitionOrganizer &&
                      formik.errors.exhibitionOrganizer
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select exhibition organizer" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((item) => (
                      <SelectItem
                        key={item?._id}
                        value={item?._id?.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item?.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.exhibitionOrganizer &&
                  formik.errors.exhibitionOrganizer && (
                    <p className="text-sm text-red-600">
                      {formik.errors.exhibitionOrganizer}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Exhibition Type</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("exhibitionType", value)
                  }
                  defaultValue={formik.values.exhibitionType}
                >
                  <SelectTrigger
                    tabIndex={17}
                    className={
                      formik.touched.exhibitionType &&
                      formik.errors.exhibitionType
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select exhibition type" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.con_segment_id?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.exhibitionType &&
                  formik.errors.exhibitionType && (
                    <p className="text-sm text-red-600">
                      {formik.errors.exhibitionType}
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formik.values.featured}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("featured", checked)
                }
                tabIndex={10}
              />
              <Label htmlFor="featured" className="text-gray-900">
                Featured
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white"
              tabIndex={22}
              disabled={isLoading}
            >
              {isEditMode ? "Update" : "Add"} Exhibition
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(ExhibitonForm, { requiredRole: ["admin", "staff"] });
