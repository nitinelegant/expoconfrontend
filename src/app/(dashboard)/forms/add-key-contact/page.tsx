"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";
import { createFormApi } from "@/api/createFormApi";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";
import VenueSearch from "@/components/VenueSearch";
import { useSegments } from "@/hooks/useSegments";

const KeyContactForm = () => {
  const { data } = useSegments();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const searchParams = useSearchParams();
  const keyContactId = searchParams.get("id");
  const isEditMode = Boolean(searchParams.get("id"));
  const firstInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      email: "",
      state: "",
      company: "",
      venue: "",
      association: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      mobile: Yup.string().matches(
        /^\d{10}$/,
        "Mobile number must be 10 digits"
      ),
      email: Yup.string().email("Must be a valid email"),
      state: Yup.string(),
      company: Yup.string(),
      venue: Yup.string(),
      association: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { fullName, mobile, email, state, company, venue, association } =
          values;
        const payload = {
          contact_name: fullName,
          contact_mobile: mobile,
          contact_email: email,
          state_id: state,
          contact_organizer_id: company,
          contact_venue_id: venue,
          contact_association_id: association,
        };
        if (isEditMode) {
          await createFormApi.updateKeyContact(keyContactId as string, payload);
          toast({
            title: "Key Contact Updated Successfully!",
            description: "The key contact has been updated successfully.",
            duration: 3000,
            variant: "success",
          });
        } else {
          await createFormApi.addKeyContact(payload);
          toast({
            title: "Key Contact Added Successfully!",
            description: "The key contact has been added successfully.",
            duration: 3000,
            variant: "success",
          });
        }

        router.push("/records/keycontact");
      } catch (error) {
        toast({
          title: `${isEditMode ? "Update" : "Add"} Key Contact Failed`,
          description: `Failed to ${
            isEditMode ? "update" : "add"
          } key contact. Please try again.`,
          duration: 2500,
          variant: "error",
        });

        console.error(
          `Error while ${isEditMode ? "updating" : "submitting"} form`,
          error
        );
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
        if (isEditMode) {
          const { keyContact } = await createFormApi.getKeyContact(
            keyContactId as string
          );
          console.log("contactData", keyContact);
          formik.setValues({
            fullName: keyContact?.contact_name,
            mobile: keyContact?.contact_mobile,
            email: keyContact?.contact_email,
            state: keyContact?.state_id?.toString(),
            company: keyContact?.contact_organizer_id,
            venue: keyContact?.contact_venue_id,
            association: keyContact?.contact_association_id,
          });
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load contact information. Please try again.",
          variant: "error",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    initializeData();
  }, [isEditMode, keyContactId]);

  if (initialLoading || isLoading) return <Loader size="medium" />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            {isEditMode ? "Update Key Contact" : "Add Key Contact"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-900">
                  Full Name*
                </Label>
                <Input
                  ref={firstInputRef}
                  tabIndex={1}
                  id="fullName"
                  {...formik.getFieldProps("fullName")}
                  className={
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-sm text-red-600">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-gray-900">
                  Mobile
                </Label>
                <Input
                  id="mobile"
                  tabIndex={2}
                  {...formik.getFieldProps("mobile")}
                  className={
                    formik.touched.mobile && formik.errors.mobile
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-sm text-red-600">{formik.errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Email and State Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email
                </Label>
                <Input
                  id="email"
                  tabIndex={3}
                  {...formik.getFieldProps("email")}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-900">
                  State
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("state", value)
                  }
                  value={formik.values.state}
                >
                  <SelectTrigger
                    tabIndex={4}
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.state_id?.map((state) => (
                      <SelectItem
                        key={state._id}
                        value={state._id.toString()}
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
            </div>

            {/* Company and Venue Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900">
                  Company
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("company", value)
                  }
                  value={formik.values.company}
                >
                  <SelectTrigger
                    tabIndex={5}
                    className={
                      formik.touched.company && formik.errors.company
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.company_type_id?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer capitalize"
                      >
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.company && formik.errors.company && (
                  <p className="text-sm text-red-600">
                    {formik.errors.company}
                  </p>
                )}
              </div>
              <VenueSearch
                value={formik.values.venue}
                onChange={(value) => formik.setFieldValue("venue", value)}
                onBlur={formik.handleBlur}
                error={formik.errors.venue}
                touched={formik.touched.venue}
                tabIndex={6}
              />
            </div>

            {/* Association Field */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="association" className="text-gray-900">
                  Association
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("association", value)
                  }
                  value={formik.values.association}
                >
                  <SelectTrigger
                    tabIndex={6}
                    className={
                      formik.touched.association && formik.errors.association
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select Association" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.association_type_id?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer capitalize"
                      >
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.association && formik.errors.association && (
                  <p className="text-sm text-red-600">
                    {formik.errors.association}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary"
              tabIndex={7}
              disabled={isLoading}
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(KeyContactForm, { requiredRole: ["admin", "staff"] });
