import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/authTypes";
import {
  AddCompanyCredentials,
  AddCompanyResponseProps,
  AddKeyContactCredentials,
  AddKeyContactResponseProps,
  AddVenueCredentials,
  AddVenueResponseProps,
  AssociationCredentials,
  AssociationResponseProps,
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
  addAssociation: async (
    credentials: AssociationCredentials
  ): Promise<AssociationResponseProps> => {
    try {
      const response = await axiosInstance.post<AssociationResponseProps>(
        "/association",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },
  addVenue: async (
    credentials: AddVenueCredentials
  ): Promise<AddVenueResponseProps> => {
    try {
      const response = await axiosInstance.post<AddVenueResponseProps>(
        "/venue",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },
};
