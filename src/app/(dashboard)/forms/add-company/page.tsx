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
import { companyTypes, statesAndUnionTerritories } from "@/constants/form";
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";

const CompanyForm = () => {
  // const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
      logo: null,
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
      googleMapLink: Yup.string().url("Must be a valid URL"),
      logo: Yup.mixed(),
      featured: Yup.boolean().required("Featured is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
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
        // setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Add Company
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
                    {companyTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-black hover:cursor-pointer"
                      >
                        {type}
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
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {statesAndUnionTerritories.map((state) => (
                      <SelectItem
                        key={state}
                        value={state}
                        className=" text-black hover:cursor-pointer"
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

              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-900">
                  Website*
                </Label>
                <Input
                  id="website"
                  type="url"
                  tabIndex={7}
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
                <Label htmlFor="googleMapLink" className="text-gray-900">
                  Google Map Link
                </Label>
                <Input
                  id="googleMapLink"
                  type="url"
                  tabIndex={8}
                  {...formik.getFieldProps("googleMapLink")}
                  className={
                    formik.touched.googleMapLink && formik.errors.googleMapLink
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.googleMapLink &&
                  formik.errors.googleMapLink && (
                    <p className="text-sm text-red-600">
                      {formik.errors.googleMapLink}
                    </p>
                  )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="logo" className="text-gray-900">
                  Upload Logo
                </Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  tabIndex={9}
                  onChange={handleLogoChange}
                  className="cursor-pointer bg-white text-black"
                  accept="image/*"
                />
                {/* {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="mt-2 h-20 w-auto rounded-md"
                  />
                )} */}
              </div>
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
                Featured*
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
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary" tabIndex={13}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(CompanyForm, { requiredRole: ["admin", "staff"] });
