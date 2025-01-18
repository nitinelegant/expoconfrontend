import { axiosInstance } from "@/lib/axios";
import { SupplierPropsListResponse } from "@/types/featureTypes";
import {
  CompanyListResponse,
  ConferenceListResponse,
  ExhibitionsListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const featureApi = {
  getFeaturedCompany: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        `/company/featured?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedExhibition: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        `/exhibition/featured?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedOrganizers: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        `/company/featured?limit=10`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedVanues: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        `/venue/featured?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExhibitions: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "featured/exhibition?limit=10"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getFeaturedConferences: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/featured?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getSuppliers: async (): Promise<SupplierPropsListResponse> => {
    try {
      const response = await axiosInstance.get<SupplierPropsListResponse>(
        "featured/suppliers?limit=10"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
