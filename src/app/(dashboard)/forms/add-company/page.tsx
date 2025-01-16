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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";
import SearchInput from "@/components/SearchInput";
import { createFormApi } from "@/api/createFormApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@/components/ui/loader";
import { useToast } from "@/hooks/use-toast";
import { useSegments } from "@/hooks/useSegments";
import ImageUploader from "@/components/ImageUploader";
import GoogleMapInput from "@/components/GoogleMapInput";

const CompanyForm = () => {
  const { data } = useSegments();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("id");
  const isEditMode = Boolean(searchParams.get("id"));
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyType: "",
      city: "",
      state: "",
      address: "",
      phone: "",
      website: "",
      googleMapLink: "",
      logo: "",
      featured: false,
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      companyType: Yup.string().required("Company Type is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string().matches(
        /^\d{10}$/,
        "Phone number must be exactly 10 digits"
      ),
      website: Yup.string()
        .url("Must be a valid URL")
        .required("Website is required"),
      googleMapLink: Yup.string().test(
        "is-valid-map",
        "Must be a valid Google Maps embed link or iframe",
        (value) => {
          if (!value) return true; // Optional field
          if (value.includes("<iframe")) {
            const srcMatch = value.match(/src="([^"]+)"/);
            return srcMatch
              ? srcMatch[1].startsWith("https://www.google.com/maps/embed?pb=")
              : false;
          }
          return value.startsWith("https://www.google.com/maps/embed?pb=");
        }
      ),
      featured: Yup.boolean().required("Featured is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters"),
      logo: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const {
          companyName,
          city,
          state,
          address,
          phone,
          website,
          googleMapLink,
          logo,
          featured,
          email,
          password,
          companyType,
        } = values;
        const payload = {
          company_name: companyName,
          company_type_id: companyType,
          company_city: city,
          state_id: state,
          company_address: address,
          company_phone: phone,
          company_website: website,
          company_map: googleMapLink,
          company_logo: logo,
          company_featured: featured,
          company_user_id: email,
          company_password: password,
        };
        if (isEditMode) {
          const response = await createFormApi.updateCompany(
            companyId as string,
            payload
          );
          if (response) {
            toast({
              title: "Company Updated Successfully!",
              description: "The company has been updated successfully.",
              duration: 3000,
              variant: "success",
            });
          }
        } else {
          const response = await createFormApi.addCompany(payload);
          console.log("submitting vlaues", response);
          toast({
            title: "Company Added Successfully!",
            description:
              "The company has been added successfully. You can view it in the company list.",
            duration: 3000,
            variant: "success",
          });
        }
        // router.push("/records/company");
        if (window.history.length > 1) {
          router.back(); // Navigates to the previous page
        } else {
          router.push("/"); // Fallback: Navigate to the home page
        }
      } catch (error) {
        toast({
          title: `${isEditMode ? "Update Failed" : "Add Failed"}`,
          description: `Failed to ${
            isEditMode ? "Update" : "Add"
          }. Please check your credentials and try again`,
          duration: 3000,
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
          const { company } = await createFormApi.getCompany(
            companyId as string
          );
          console.log("contactData", company);
          formik.setValues({
            companyName: company?.company_name,
            companyType: company?.company_type_id.toString(),
            city: company?.company_city,
            state: company?.state_id.toString(),
            address: company?.company_address,
            phone: company?.company_phone,
            website: company?.company_website,
            googleMapLink: company?.company_map,
            logo: company?.company_logo,
            featured: company?.company_featured,
            email: company?.company_user_id,
            password: "",
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
  }, [isEditMode, companyId]);

  if (initialLoading || isLoading) return <Loader size="medium" />;

  const handleResultFound = () => {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            {isEditMode ? "Update Company" : "Add Company"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-900">
                  Company Name*
                </Label>
                <Input
                  id="companyName"
                  tabIndex={1}
                  ref={firstInputRef}
                  {...formik.getFieldProps("companyName")}
                  className={
                    formik.touched.companyName && formik.errors.companyName
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p className="text-sm text-red-600">
                    {formik.errors.companyName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType" className="text-gray-900">
                  Company Type*
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("companyType", value)
                  }
                  defaultValue={formik.values.companyType}
                >
                  <SelectTrigger
                    tabIndex={2}
                    className={
                      formik.touched.companyType && formik.errors.companyType
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue
                      placeholder="Select Company Type"
                      className="text-black"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {data?.company_type_id?.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="text-black hover:cursor-pointer"
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.companyType && formik.errors.companyType && (
                  <p className="text-sm text-red-600">
                    {formik.errors.companyType}
                  </p>
                )}
              </div>

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
                    : " text-black"
                }
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-600">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900">
                  Phone (Landline)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  tabIndex={6}
                  {...formik.getFieldProps("phone")}
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-600">{formik.errors.phone}</p>
                )}
              </div>

              <SearchInput
                label="Website*"
                placeholder="Enter website URL"
                id="website"
                onResultFound={handleResultFound}
                debounceTime={600}
                value={formik.values.website}
                onChange={(value) => {
                  formik.setFieldValue("website", value);
                }}
                onBlur={formik.handleBlur}
                error={formik.errors.website}
                touched={formik.touched.website}
                apiEndpoint="company"
                disabled={isEditMode}
                tabIndex={7}
              />

              <div className="space-y-2">
                <GoogleMapInput
                  label="Google Map Link"
                  name="googleMapLink"
                  value={formik.values.googleMapLink}
                  onChange={(value) =>
                    formik.setFieldValue("googleMapLink", value)
                  }
                  onBlur={formik.handleBlur}
                  error={formik.errors.googleMapLink}
                  touched={formik.touched.googleMapLink}
                  placeholder="Enter Google Map embed link or iframe code"
                  tabIndex={7}
                />
              </div>

              <ImageUploader
                name="logo"
                label="Upload Logo"
                setFieldValue={formik.setFieldValue}
                setFieldError={formik.setFieldError}
                setFieldTouched={formik.setFieldTouched}
                error={formik.errors.logo}
                touched={formik.touched.logo}
                initialPreview={formik.values.logo}
                tabIndex={9}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                tabIndex={10}
                checked={formik.values.featured}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("featured", checked)
                }
                {...formik.getFieldProps("featured")}
                className={
                  formik.touched.featured && formik.errors.featured
                    ? "border-red-500"
                    : ""
                }
              />
              <Label htmlFor="featured" className="text-gray-900">
                Featured
              </Label>
            </div>
            {formik.touched.featured && formik.errors.featured && (
              <p className="text-sm text-red-600">{formik.errors.featured}</p>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email Id*
                </Label>
                <Input
                  id="email"
                  type="email"
                  tabIndex={11}
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
                <Label htmlFor="password" className="text-gray-900">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  tabIndex={12}
                  {...formik.getFieldProps("password")}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white"
              tabIndex={13}
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

export default withAuth(CompanyForm, { requiredRole: ["admin", "staff"] });
