import { axiosInstance } from "@/lib/axios";
import { SupplierPropsListResponse } from "@/types/featureTypes";
import {
  CompanyListResponse,
  ConferenceListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const featureApi = {
  getFeaturedOrganizers: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        `/company/featured`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedVanues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        `/venue/featured?limit=50`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExhibitions: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "featured/exhibition"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedConferences: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/featured"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getSuppliers: async (): Promise<SupplierPropsListResponse> => {
    try {
      const response = await axiosInstance.get<SupplierPropsListResponse>(
        "featured/suppliers"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
