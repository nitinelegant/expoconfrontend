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
  statesAndUnionTerritories,
  years,
} from "@/constants/form";

const AddEvent = () => {
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
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("End Date is required"),
      month: Yup.string().required("Month is required"),
      year: Yup.string().required("Year is required"),
      entryFees: Yup.number().required("Entry Fees is required"),
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Event</CardTitle>
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
                <Label htmlFor="startDate">Start Date*</Label>
                <Input
                  type="date"
                  id="startDate"
                  {...formik.getFieldProps("startDate")}
                  className={
                    formik.touched.startDate && formik.errors.startDate
                      ? "border-red-500"
                      : ""
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
                  className={
                    formik.touched.endDate && formik.errors.endDate
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-sm text-red-600">
                    {formik.errors.endDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Month*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("month", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.month && formik.errors.month
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue
                      placeholder="Select Month"
                      className="text-black"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
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
                <Label htmlFor="year">Year*</Label>
                <Select
                  onValueChange={(value) => formik.setFieldValue("year", value)}
                >
                  <SelectTrigger
                    className={
                      formik.touched.year && formik.errors.year
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue
                      placeholder="Select Year"
                      className="text-black"
                    />
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
                <Label htmlFor="timings">Timings</Label>
                <Input id="timings" {...formik.getFieldProps("timings")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryFees">Entry Fees*</Label>
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

              <div className="space-y-2">
                <Label htmlFor="venue">Venue*</Label>
                <Input
                  id="venue"
                  {...formik.getFieldProps("venue")}
                  className={
                    formik.touched.venue && formik.errors.venue
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.venue && formik.errors.venue && (
                  <p className="text-sm text-red-600">{formik.errors.venue}</p>
                )}
              </div>

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
                  Exhibition Organizer
                </Label>
                <Input
                  id="exhibitionOrganizer"
                  {...formik.getFieldProps("exhibitionOrganizer")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exhibitionType">Exhibition Type*</Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("exhibitionType", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.exhibitionType &&
                      formik.errors.exhibitionType
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
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
