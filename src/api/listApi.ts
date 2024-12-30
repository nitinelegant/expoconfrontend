import { axiosInstance } from "@/lib/axios";
import {
  AssociationsListResponse,
  CompanyListResponse,
  KeyContactListResponse,
  VenueListResponse,
} from "@/types/listTypes";

interface Venue {
  _id: string;
  venue_name: string;
  venue_city: string;
  state_id: number;
  venue_address: string;
  venue_phone: string;
  venue_website: string;
  venue_map: string;
  venue_photo: string;
  venue_layout: string;
  venue_featured: boolean;
  status: "approved" | "pending" | "rejected";
}

interface ListResponse {
  message: string;
  venues: Venue[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

``;
export const listApi = {
  getExhibitions: async (): Promise<ListResponse> => {
    const response = await axiosInstance.get<ListResponse>("/exhibitions/list");
    return response.data;
  },

  getConferences: async (): Promise<ListResponse> => {
    const response = await axiosInstance.get<ListResponse>("/conference/list");
    return response.data;
  },

  getVenues: async (): Promise<VenueListResponse> => {
    const response = await axiosInstance.get<VenueListResponse>("/venue/list");
    return response.data;
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
  getAssociation: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getExpConference: async (): Promise<AssociationsListResponse> => {
    const response = await axiosInstance.get<AssociationsListResponse>(
      "/expired/list"
    );
    return response.data;
  },
};
