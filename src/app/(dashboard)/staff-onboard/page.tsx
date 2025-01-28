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
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

const StaffOnBoardForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const staffId = searchParams.get("id");
  const isEditMode = Boolean(staffId);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isActive: true,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().when([], {
        is: () => !isEditMode,
        then: (schema) =>
          schema
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        otherwise: (schema) =>
          schema.min(8, "Password must be at least 8 characters").notRequired(),
      }),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { name, email, password, isActive } = values;
        const payload = {
          user_fullname: name,
          user_email: email,
          user_status: isActive ? "active" : "inactive",
        };

        if (!isEditMode || (isEditMode && password)) {
          payload.user_password = password;
        }
        let response;
        if (isEditMode) {
          response = await createFormApi.updateStaff(
            staffId as string,
            payload
          );
        } else {
          response = await createFormApi.addStaff(payload);
        }
        if (response) {
          toast({
            title: `Staff ${isEditMode ? "Updated" : "Added"} Successfully!`,
            description: `The staff has been ${
              isEditMode ? "updated" : "added"
            } successfully. You can view it in the staff table.`,
            duration: 3000,
            variant: "success",
          });
          router.push("/staff-onboard/stafflist");
        }
      } catch (error) {
        console.log("error", JSON.stringify(error));
        toast({
          title: `${isEditMode ? "Update" : "Add"} Staff Failed`,
          description: `Failed to ${isEditMode ? "update" : "add"} Staff. ${
            isEditMode
              ? "Please try again later."
              : "Make sure the user is not already registered or try again later."
          }`,
          duration: 2500,
          variant: "error",
        });
        console.error(
          `Error ${isEditMode ? "updating" : "submitting"} form:`,
          error
        );
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
          const { staff } = await createFormApi.getStaff(staffId as string);
          console.log("staff", staff);
          formik.setValues({
            name: staff?.user_fullname,
            email: staff?.user_email,
          });
          const isActive = staff?.user_status === "active" ? true : false;
          setIsActive(isActive);
          formik.setFieldValue("isActive", isActive);
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
            <CardTitle className="text-black">Staff Registration</CardTitle>
            <CardDescription className="pt-1 text-black">
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

                <div className="space-y-2 relative">
                  <Label htmlFor="password">
                    Password{" "}
                    {!isEditMode && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isEditMode
                          ? "Enter new password (optional)"
                          : "Enter staff password"
                      }
                      {...formik.getFieldProps("password")}
                      className={
                        formik.touched.password && formik.errors.password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {isEditMode && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={(checked) => {
                        setIsActive(checked);
                        formik.setFieldValue("isActive", checked);
                      }}
                    />
                    <Label htmlFor="isActive">
                      {isActive ? "Active" : "InActive"}
                    </Label>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-white"
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
