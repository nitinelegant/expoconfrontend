import { axiosInstance } from "@/lib/axios";
import {
  AssociationsListResponse,
  CompanyListResponse,
  ConferenceListResponse,
  KeyContactListResponse,
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
};
