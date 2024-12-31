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
  AssociationSingleResponse,
  CompanySingleResponse,
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while fetching data ${error}`);
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
      throw new Error(`Error while adding company ${error}`);
    }
  },

  getKeyContact: async (id: string): Promise<KeyContactSingleResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactSingleResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompany: async (id: string): Promise<CompanySingleResponse> => {
    try {
      const response = await axiosInstance.get<CompanySingleResponse>(
        `/company/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  updateCompany: async (
    id: string,
    credentials: AddCompanyCredentials
  ): Promise<AddCompanyResponseProps> => {
    try {
      const response = await axiosInstance.put<AddCompanyResponseProps>(
        `/company/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while adding company ${error}`);
    }
  },

  getAssocian: async (id: string): Promise<AssociationSingleResponse> => {
    try {
      const response = await axiosInstance.get<AssociationSingleResponse>(
        `/association/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  updateAssociation: async (
    id: string,
    credentials: AssociationCredentials
  ): Promise<AssociationResponseProps> => {
    try {
      const response = await axiosInstance.put<AssociationResponseProps>(
        `/association/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while adding company ${error}`);
    }
  },
};
