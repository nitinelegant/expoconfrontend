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
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createFormApi } from "@/api/createFormApi";
import SearchInput from "@/components/SearchInput";
import { Loader } from "@/components/ui/loader";
import { useSegments } from "@/hooks/useSegments";

const AssociationForm = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { data } = useSegments();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const associationId = searchParams.get("id");
  const isEditMode = Boolean(searchParams.get("id"));
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      website: "",
      associationName: "",
      city: "",
      state: "",
      address: "",
      associationType: "",
    },
    validationSchema: Yup.object({
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      associationName: Yup.string().required("Association Name is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      address: Yup.string().required("Address is required"),
      associationType: Yup.string().required("Type is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const {
          website,
          associationName,
          city,
          state,
          address,
          associationType,
        } = values;
        const payload = {
          association_website: website,
          association_name: associationName,
          association_city: city,
          state_id: state,
          association_address: address,
          association_type_id: associationType,
        };
        if (isEditMode) {
          await createFormApi.updateAssociation(
            associationId as string,
            payload
          );
          toast({
            title: "Association Updated Successfully!",
            description: "The association has been updated successfully.",
            duration: 3000,
            variant: "success",
          });
        } else {
          const response = await createFormApi.addAssociation(payload);
          if (response) {
            toast({
              title: "Association Added Successfully!",
              description:
                "The associdation has been added successfully. You can view it in the association list.",
              duration: 3000,
              variant: "success",
            });
            router.push("/records/association");
          }
        }

        router.push("/records/association");
      } catch (error) {
        toast({
          title: "Add Key Contact Failed",
          description:
            "Failed to add key contact. Please check your credentials and try again.",
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
        // await Promise.all([fetchCompany(), fetchAssociation()]);
        if (isEditMode) {
          const { association } = await createFormApi.getAssocian(
            associationId as string
          );
          console.log("contactData", association);
          formik.setValues({
            website: association?.association_website,
            associationName: association?.association_name,
            city: association?.association_city,
            state: association?.state_id?.toString(),
            address: association?.association_address,
            associationType: association?.association_type_id?.toString(),
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
  }, [isEditMode, associationId]);

  if (initialLoading || isLoading) return <Loader size="medium" />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            {isEditMode ? "Update" : "Add"} Association
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Website */}
              <SearchInput
                ref={firstInputRef}
                tabIndex={1}
                label="Website*"
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
                apiEndpoint="association"
                disabled={isEditMode}
              />
              {/* <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-900">
                  Website*
                </Label>
                <Input
                  id="website"
                  tabIndex={1}
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

              {/* Association Name */}
              <div className="space-y-2">
                <Label htmlFor="associationName" className="text-gray-900">
                  Association Name*
                </Label>
                <Input
                  id="associationName"
                  tabIndex={2}
                  {...formik.getFieldProps("associationName")}
                  className={
                    formik.touched.associationName &&
                    formik.errors.associationName
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.associationName &&
                  formik.errors.associationName && (
                    <p className="text-sm text-red-600">
                      {formik.errors.associationName}
                    </p>
                  )}
              </div>
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-900">
                  City*
                </Label>
                <Input
                  id="city"
                  tabIndex={3}
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
                    tabIndex={4}
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black capitalize"
                        : "text-black"
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

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-900">
                Address*
              </Label>
              <Textarea
                id="address"
                tabIndex={5}
                {...formik.getFieldProps("address")}
                className={
                  formik.touched.address && formik.errors.address
                    ? "border-red-500 text-black"
                    : "text-black"
                }
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-600">{formik.errors.address}</p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-900">
                Type*
              </Label>
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("associationType", value)
                }
                defaultValue={formik.values.associationType}
              >
                <SelectTrigger
                  tabIndex={6}
                  className={
                    formik.touched.associationType &&
                    formik.errors.associationType
                      ? "border-red-500 text-black"
                      : "text-black"
                  }
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {data?.association_type_id?.map((item) => (
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
              {formik.touched.associationType &&
                formik.errors.associationType && (
                  <p className="text-sm text-red-600">
                    {formik.errors.associationType}
                  </p>
                )}
            </div>

            {/* Submit Button */}
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

export default withAuth(AssociationForm, { requiredRole: ["admin", "staff"] });
