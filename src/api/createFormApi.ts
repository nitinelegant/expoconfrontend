import { axiosInstance } from "@/lib/axios";
import {
  AddCompanyCredentials,
  AddCompanyResponseProps,
  AddConferenceCredentials,
  AddExhibitionCredentials,
  AddKeyConferenceResponseProps,
  AddKeyContactCredentials,
  AddKeyContactResponseProps,
  AddStaffCredentials,
  AddStaffResponseProps,
  AddVenueCredentials,
  AddVenueResponseProps,
  ApiCreateCommonResponse,
  AssociationCredentials,
  AssociationResponseProps,
} from "@/types/createFormApi";
import {
  AssociationSingleResponse,
  CompanySingleResponse,
  ConferenceListResponse,
  ConferenceSingleResponse,
  ExhibitionSingleResponse,
  ExhibitionsListResponse,
  KeyContactSingleResponse,
  VenueSingleResponse,
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
  addExhibition: async (
    credentials: AddExhibitionCredentials
  ): Promise<ApiCreateCommonResponse> => {
    try {
      const response = await axiosInstance.post<ApiCreateCommonResponse>(
        "/exhibition",
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
  getExhibition: async (id: string): Promise<ExhibitionSingleResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionSingleResponse>(
        `/exhibition/${id}`
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
      console.log(error);
      throw new Error("Error while adding company ");
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
  getVenue: async (id: string): Promise<VenueSingleResponse> => {
    try {
      const response = await axiosInstance.get<VenueSingleResponse>(
        `/venue/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  updateVenue: async (
    id: string,
    credentials: AddVenueCredentials
  ): Promise<AddVenueResponseProps> => {
    try {
      const response = await axiosInstance.put<AddVenueResponseProps>(
        `/venue/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while adding company ${error}`);
    }
  },
  updateExhibition: async (
    id: string,
    credentials: AddExhibitionCredentials
  ): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.put<ExhibitionsListResponse>(
        `/exhibition/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while adding company ${error}`);
    }
  },

  getConference: async (id: string): Promise<ConferenceSingleResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceSingleResponse>(
        `/conference/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  updateConference: async (
    id: string,
    credentials: AddConferenceCredentials
  ): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.put<ConferenceListResponse>(
        `/conference/${id}`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while adding company ${error}`);
    }
  },
};
