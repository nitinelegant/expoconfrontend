import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/authTypes";
import {
  AddCompanyCredentials,
  AddCompanyResponseProps,
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
      throw new Error("Error while logging in");
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching user data");
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
