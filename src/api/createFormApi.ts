import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/authTypes";
import {
  AddCompanyCredentials,
  AddCompanyResponseProps,
  AddKeyContactCredentials,
  AddKeyContactResponseProps,
} from "@/types/createFormApi";

export const createFormApi = {
  addCompany: async (
    credentials: AddCompanyCredentials
  ): Promise<AddCompanyResponseProps> => {
    try {
      const response = await axiosInstance.post<AddCompanyResponseProps>(
        "/company",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },
  addKeyContact: async (
    credentials: AddKeyContactCredentials
  ): Promise<AddKeyContactResponseProps> => {
    try {
      const response = await axiosInstance.post<AddKeyContactResponseProps>(
        "/keycontact",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      throw new Error("Error while logging out");
    }
  },
};
