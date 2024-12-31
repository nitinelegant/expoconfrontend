"use client";
import { Formik, Form, Field } from "formik";
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
import { useRouter } from "next/navigation";
import { createFormApi } from "@/api/createFormApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prefix } from "@/constants/form";

const SignupSchema = Yup.object().shape({
  prefix: Yup.string().required("Prefix is required"),
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const StaffOnBoardForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <>
      <div className="ml-10">
        <BackButton />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Staff Registration</CardTitle>
            <CardDescription>
              Add staff details to create account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ prefix: "", name: "", email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={async (values, {}) => {
                try {
                  const { name, email, password, prefix } = values;

                  const payload = {
                    user_fullname: name,
                    user_email: email,
                    user_password: password,
                    user_prefix: prefix,
                  };
                  const response = await createFormApi.addStaff(payload);
                  if (response) {
                    console.log("submitting vlaues", response);
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
                  console.log(`error while submitting form`, error);
                } finally {
                }
              }}
            >
              {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form className="space-y-4 w-full">
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="prefix" className="text-gray-900">
                        Name Prefix*
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFieldValue("prefix", value)
                        }
                        defaultValue={values.prefix}
                      >
                        <SelectTrigger
                          tabIndex={3}
                          aria-required="true"
                          className={
                            touched.prefix && errors.prefix
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
                              className=" text-black hover:cursor-pointer capitalize"
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {touched.prefix && errors.prefix && (
                        <p className="text-sm text-red-600">{errors.prefix}</p>
                      )}
                    </div>
                    <Label htmlFor="name">Name</Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter staff name"
                    />
                    {errors.name && touched.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter staff email"
                    />
                    {errors.email && touched.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter staff password"
                    />
                    {errors.password && touched.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default withAuth(StaffOnBoardForm, { requiredRole: ["admin"] });
