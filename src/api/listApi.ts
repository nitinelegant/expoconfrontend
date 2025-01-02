import { axiosInstance } from "@/lib/axios";
import {
  AssociationDeleteResponse,
  AssociationsListResponse,
  CompanyDeleteResponse,
  CompanyListResponse,
  ConferenceDeleteResponse,
  ConferenceListResponse,
  DeleteApiResponse,
  ExhibitionsListResponse,
  ExpConferenceListResponse,
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
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getAssociation: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompanies: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "/company/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getKeyContacts: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "/keycontact/list",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getConference: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExhibition: async (): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        "/exhibition/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExpExhibition: async (): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        "/exhibition/expired?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExpConference: async (): Promise<ExpConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ExpConferenceListResponse>(
        "/conference/expired"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getStaff: async (): Promise<StaffListResponse> => {
    try {
      const response = await axiosInstance.get<StaffListResponse>(
        "/staff/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteKeyContact: async (id: string): Promise<KeyContactDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<KeyContactDeleteResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteStaff: async (id: string): Promise<StaffDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<StaffDeleteResponse>(
        `/staff/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteCompany: async (id: string): Promise<CompanyDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<CompanyDeleteResponse>(
        `/company/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteAssociation: async (id: string): Promise<AssociationDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<AssociationDeleteResponse>(
        `/association/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteVenue: async (id: string): Promise<VenueDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<VenueDeleteResponse>(
        `/venue/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteConference: async (id: string): Promise<ConferenceDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<ConferenceDeleteResponse>(
        `/conference/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteApi: async (url: string): Promise<DeleteApiResponse> => {
    try {
      const response = await axiosInstance.delete<DeleteApiResponse>(`${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
