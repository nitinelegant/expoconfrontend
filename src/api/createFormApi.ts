import { axiosInstance } from "@/lib/axios";
import {
  AddCompanyCredentials,
  AddCompanyResponseProps,
  AddConferenceCredentials,
  AddKeyConferenceResponseProps,
  AddKeyContactCredentials,
  AddKeyContactResponseProps,
  AddStaffCredentials,
  AddStaffResponseProps,
  AddVenueCredentials,
  AddVenueResponseProps,
  AssociationCredentials,
  AssociationResponseProps,
} from "@/types/createFormApi";
import {
  KeyContactListResponse,
  KeyContactProps,
  KeyContactSingleResponse,
} from "@/types/listTypes";

export const createFormApi = {
  addConference: async (
    credentials: AddConferenceCredentials
  ): Promise<AddKeyConferenceResponseProps> => {
    try {
      const response = await axiosInstance.post<AddKeyConferenceResponseProps>(
        "/conference",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },
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
  addStaff: async (
    credentials: AddStaffCredentials
  ): Promise<AddStaffResponseProps> => {
    try {
      const response = await axiosInstance.post<AddStaffResponseProps>(
        "/staff",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },

  updateKeyContact: async (
    id: string,
    credentials: AddKeyContactCredentials
  ): Promise<AddKeyContactResponseProps> => {
    try {
      const response = await axiosInstance.put<AddKeyContactResponseProps>(
        `/keycontact/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while adding company");
    }
  },
  getKeyContact: async (id: string): Promise<KeyContactSingleResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactSingleResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
};
