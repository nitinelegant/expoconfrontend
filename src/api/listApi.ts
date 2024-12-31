import { axiosInstance } from "@/lib/axios";
import {
  AssociationDeleteResponse,
  AssociationsListResponse,
  CompanyDeleteResponse,
  CompanyListResponse,
  ConferenceDeleteResponse,
  ConferenceListResponse,
  ExpConferenceListResponse,
  KeyContactDeleteCredential,
  KeyContactDeleteResponse,
  KeyContactListResponse,
  StaffDeleteResponse,
  StaffListResponse,
  VenueDeleteResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const listApi = {
  getVenues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        "/venue/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getAssociation: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getCompanies: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "/company/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getKeyContact: async (): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "/keycontact/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getConference: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getExpConference: async (): Promise<ExpConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ExpConferenceListResponse>(
        "/conference/expired"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getStaff: async (): Promise<StaffListResponse> => {
    try {
      const response = await axiosInstance.get<StaffListResponse>(
        "/staff/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  deleteKeyContact: async (id: string): Promise<KeyContactDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<KeyContactDeleteResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
  deleteStaff: async (id: string): Promise<StaffDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<StaffDeleteResponse>(
        `/staff/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
  deleteCompany: async (id: string): Promise<CompanyDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<CompanyDeleteResponse>(
        `/company/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
  deleteAssociation: async (id: string): Promise<AssociationDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<AssociationDeleteResponse>(
        `/association/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
  deleteVenue: async (id: string): Promise<VenueDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<VenueDeleteResponse>(
        `/venue/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
  deleteConference: async (id: string): Promise<ConferenceDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<ConferenceDeleteResponse>(
        `/conference/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
};
