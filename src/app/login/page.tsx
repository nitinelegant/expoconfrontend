"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();

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
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      try {
        localStorage.setItem("authToken", "12345");
        localStorage.setItem("userType", "1");
        router.replace("/admin/dashboard");
        toast({
          title: "Success",
          description: "Logged in successfully",
          duration: 3000,
        });

        console.log("submitting form");
      } catch (error) {
        console.log("error", error);
        toast({
          title: "Error",
          description: "Invalid credentials. Try demo@example.com / password",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            {/* <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div> */}
            <h2 className="text-2xl font-bold text-gray-900">ExpoCon</h2>
            {/* <span className="text-xl font-semibold text-black">ExpoCon</span> */}
          </div>
          {/* <h2 className="text-2xl font-bold text-gray-900">Login</h2> */}
          <p className="mt-2 text-sm text-gray-600">
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
                placeholder="Type your email"
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
                placeholder="Type your password"
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

          <div>
            <Button type="submit" className="w-full bg-primary">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
