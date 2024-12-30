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
import BackButton from "@/components/BackButton";
import { withAuth } from "@/utils/withAuth";
import { useEffect, useState } from "react";
import { createFormApi } from "@/api/createFormApi";
import { AssociationProps, CompanyProps, VenueProps } from "@/types/listTypes";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

const KeyContactForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setcompanies] = useState<CompanyProps[]>([]);
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);

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
      company: Yup.string().required("Company is required"),
      venue: Yup.string().required("Venue is required"),
      association: Yup.string().required("Association is required"),
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
          state_id: parseInt(state),
          contact_organizer_id: company,
          contact_venue_id: venue,
          contact_association_id: association,
        };
        const response = await createFormApi.addKeyContact(payload);
        console.log("submitting vlaues", response);
        toast({
          title: "Key Contact Added Successfully!",
          description:
            "The key contact has been added successfully. You can view it in the key contact list.",
          duration: 3000,
          variant: "success",
        });
        router.push("/records/keycontact");
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
    fetchCompany();
    fetchVenue();
    fetchAssociation();
  }, []);
  const fetchCompany = async () => {
    try {
      const { companies } = await listApi.getCompanies();
      if (companies?.length > 0) setcompanies(companies);
    } catch (error) {}
  };
  const fetchVenue = async () => {
    try {
      const { venues } = await listApi.getVenues();
      if (venues?.length > 0) setVenues(venues);
    } catch (error) {}
  };
  const fetchAssociation = async () => {
    try {
      const { associations } = await listApi.getAssociation();
      if (associations?.length > 0) setAssociations(associations);
    } catch (error) {}
  };

  if (isLoading) return <Loader size="medium" />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
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
                  tabIndex={1}
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
                  <SelectContent>
                    {statesAndUnionTerritories.map((state, index) => (
                      <SelectItem
                        key={state.id}
                        value={state.id.toString()}
                        className="hover:cursor-pointer capitalize"
                        tabIndex={index + 1}
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="Companies" className="text-gray-900">
                  Companies
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("company", value)
                  }
                  defaultValue={formik.values.company}
                >
                  <SelectTrigger
                    tabIndex={4}
                    className={
                      formik.touched.company && formik.errors.company
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((item, index) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer capitalize"
                        tabIndex={index + 1}
                      >
                        {item.company_name}
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
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-gray-900">
                  Venue
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("venue", value)
                  }
                  defaultValue={formik.values.venue}
                >
                  <SelectTrigger
                    tabIndex={4}
                    className={
                      formik.touched.venue && formik.errors.venue
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select Venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues?.map((item, index) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer capitalize"
                        tabIndex={index + 1}
                      >
                        {item.venue_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.venue && formik.errors.venue && (
                  <p className="text-sm text-red-600">{formik.errors.venue}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-gray-900">
                  Association
                </Label>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue("association", value)
                  }
                  defaultValue={formik.values.association}
                >
                  <SelectTrigger
                    tabIndex={4}
                    className={
                      formik.touched.association && formik.errors.association
                        ? "border-red-500 text-black capitalize"
                        : "text-black capitalize"
                    }
                  >
                    <SelectValue placeholder="Select Association" />
                  </SelectTrigger>
                  <SelectContent>
                    {associations?.map((item, index) => (
                      <SelectItem
                        key={item._id}
                        value={item._id.toString()}
                        className="hover:cursor-pointer capitalize"
                        tabIndex={index + 1}
                      >
                        {item.association_name}
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
              tabIndex={8}
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(KeyContactForm, { requiredRole: ["admin", "staff"] });
