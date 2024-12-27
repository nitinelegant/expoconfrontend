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
import { statesAndUnionTerritories } from "@/constants/form";

const KeyContactForm = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Add Key Contact
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email
                </Label>
                <Input
                  id="email"
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
                  defaultValue={formik.values.state}
                >
                  <SelectTrigger
                    className={
                      formik.touched.state && formik.errors.state
                        ? "border-red-500 text-black"
                        : "text-black"
                    }
                  >
                    <SelectValue placeholder="Select State" />
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
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900">
                  Company
                </Label>
                <Input
                  id="company"
                  {...formik.getFieldProps("company")}
                  className={
                    formik.touched.company && formik.errors.company
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="text-sm text-red-600">
                    {formik.errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue" className="text-gray-900">
                  Venue
                </Label>
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
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="association" className="text-gray-900">
                  Association
                </Label>
                <Input
                  id="association"
                  {...formik.getFieldProps("association")}
                  className={
                    formik.touched.association && formik.errors.association
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.association && formik.errors.association && (
                  <p className="text-sm text-red-600">
                    {formik.errors.association}
                  </p>
                )}
              </div>
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

export default KeyContactForm;
