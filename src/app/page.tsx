"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";

const Login = () => {
  const router = useRouter();
  const { user, isAuthenticated, loading, login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setSubmitError(null);
        console.log("subitting form");
        const { email, password } = values;
        await login(email, password);
      } catch (error) {
        console.log("error", error);
        setSubmitError(
          "Failed to log in. Please check your credentials and try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
    if (isAuthenticated && user === "admin") {
      router.replace("/admin");
    }
    if (isAuthenticated && user === "staff") {
      router.replace("/staff");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Loader size="medium" />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div> */}
            <Image
              src={Logo}
              alt="Description of the image"
              width={150} // Desired width
              height={100} // Desired height
            />
            {/* <span className="text-xl font-semibold text-black">ExpoCon</span> */}
          </div>
          {/* <h2 className="text-2xl font-bold text-gray-900">Login</h2> */}
          <p className="mt-1 text-sm text-gray-600">
            Please login into your account
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...formik.getFieldProps("email")}
                className="mt-1 bg-white text-black "
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
                className="mt-1 bg-white text-black"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          {submitError && (
            <div className="text-sm text-red-600 mt-1">{submitError}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
