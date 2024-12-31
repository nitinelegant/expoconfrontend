import { axiosInstance } from "@/lib/axios";
import {
  OrganizerListResponse,
  SupplierPropsListResponse,
} from "@/types/featureTypes";
import {
  AssociationsListResponse,
  CompanyListResponse,
  ConferenceListResponse,
  KeyContactListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const featureApi = {
  getFeaturedOrganizers: async (): Promise<OrganizerListResponse> => {
    try {
      const response = await axiosInstance.get<OrganizerListResponse>(
        `/organizer/featured`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getFeaturedVanues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        `/venue/featured?limit=50`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getExhibitions: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "featured/exhibition"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getFeaturedConferences: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/featured"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getSuppliers: async (): Promise<SupplierPropsListResponse> => {
    try {
      const response = await axiosInstance.get<SupplierPropsListResponse>(
        "featured/suppliers"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
};
