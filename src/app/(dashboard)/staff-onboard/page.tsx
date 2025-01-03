"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { withAuth } from "@/utils/withAuth";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { createFormApi } from "@/api/createFormApi";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";

const StaffOnBoardForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const staffId = searchParams.get("id");
  const isEditMode = Boolean(staffId);
  const [initialLoading, setInitialLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      // prefix: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      // prefix: Yup.string().required("Prefix is required"),
      name: Yup.string()
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { name, email, password } = values;
        const payload = {
          user_fullname: name,
          user_email: email,
          user_password: password,
          // user_prefix: prefix,
        };
        const response = await createFormApi.addStaff(payload);
        if (response) {
          toast({
            title: "Staff Added Successfully!",
            description:
              "The staff has been added successfully. You can view it in the staff table.",
            duration: 3000,
            variant: "success",
          });
          router.push("/staff-onboard/stafflist");
        }
      } catch (error) {
        toast({
          title: "Add Staff Failed",
          description:
            "Failed to add Staff. Please check your fields and try again.",
          duration: 2500,
          variant: "error",
        });
        console.error("Error submitting form:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        if (isEditMode && staffId) {
          // Fetch staff data and set form values
          // const staffData = await createFormApi.getStaff(staffId);
          // formik.setValues({
          //   prefix: staffData.user_prefix,
          //   name: staffData.user_fullname,
          //   email: staffData.user_email,
          //   password: staffData.user_password,
          // });
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
  }, [isEditMode, staffId]);

  if (initialLoading || isLoading) return <Loader size="medium" />;

  return (
    <>
      <div className="ml-10">
        <BackButton />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Staff Registration</CardTitle>
            <CardDescription className="pt-1">
              Add staff details to create account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* <div className="space-y-2">
                  <Label htmlFor="prefix" className="text-gray-900">
                    Name Prefix*
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("prefix", value)
                    }
                    value={formik.values.prefix}
                  >
                    <SelectTrigger
                      id="prefix"
                      className={
                        formik.touched.prefix && formik.errors.prefix
                          ? "border-red-500 text-black capitalize"
                          : "text-black capitalize"
                      }
                    >
                      <SelectValue placeholder="Select Prefix" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Prefix.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id.toString()}
                          className="text-black hover:cursor-pointer capitalize"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.prefix && formik.errors.prefix && (
                    <p className="text-sm text-red-600">
                      {formik.errors.prefix}
                    </p>
                  )}
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter staff name"
                    {...formik.getFieldProps("name")}
                    className={
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter staff email"
                    {...formik.getFieldProps("email")}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter staff password"
                    {...formik.getFieldProps("password")}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary"
                  disabled={isLoading}
                >
                  {isEditMode ? "Update" : "Create"} Staff
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default withAuth(StaffOnBoardForm, { requiredRole: ["admin"] });
