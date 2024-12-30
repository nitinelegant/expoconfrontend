import { axiosInstance } from "@/lib/axios";
import {
  OrganizerListResponse,
  SupplierPropsListResponse,
} from "@/types/featureTypes";
import {
  AssociationsListResponse,
  CompanyListResponse,
  KeyContactListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const featureApi = {
  getOrganizers: async (): Promise<OrganizerListResponse> => {
    try {
      const response = await axiosInstance.get<OrganizerListResponse>(
        "featured/organizer"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getVanues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        "featured/venues"
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
  getConferences: async (): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "featured/conference"
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
