import { axiosInstance } from "@/lib/axios";
import {
  AssociationDeleteResponse,
  AssociationProps,
  AssociationSingleResponse,
  AssociationsListResponse,
  CompanyDeleteResponse,
  CompanyListResponse,
  CompanySingleResponse,
  ConferenceDeleteResponse,
  ConferenceListResponse,
  ConferenceSingleResponse,
  DeleteApiResponse,
  ExhibitionSingleResponse,
  ExhibitionsListResponse,
  ExpConferenceListResponse,
  KeyContactDeleteResponse,
  KeyContactListResponse,
  KeyContactSingleResponse,
  StaffDeleteResponse,
  StaffListResponse,
  VenueDeleteResponse,
  VenueListResponse,
  VenueSingleResponse,
} from "@/types/listTypes";

export const listApi = {
  getKeyContact: async (): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "/keycontact/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getKeyContactById: async (id: string): Promise<KeyContactSingleResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactSingleResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompanyById: async (id: string): Promise<CompanySingleResponse> => {
    try {
      const response = await axiosInstance.get<CompanySingleResponse>(
        `/company/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getVenueById: async (id: string): Promise<VenueSingleResponse> => {
    try {
      const response = await axiosInstance.get<VenueSingleResponse>(
        `/venue/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getConferenceById: async (id: string): Promise<ConferenceSingleResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceSingleResponse>(
        `/conference/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExhibitionById: async (id: string): Promise<ExhibitionSingleResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionSingleResponse>(
        `/exhibition/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getAssociationById: async (
    id: string
  ): Promise<AssociationSingleResponse> => {
    try {
      const response = await axiosInstance.get<AssociationSingleResponse>(
        `/association/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  getStaff: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<StaffListResponse> => {
    try {
      const response = await axiosInstance.get<StaffListResponse>(
        "/staff/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
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

  getKeyContacts: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "/keycontact/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompanies: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "/company/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getAssociation: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getVenues: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        "/venue/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExpConference: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ExpConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ExpConferenceListResponse>(
        "/conference/expired?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getConference: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getExpExhibition: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        "/exhibition/expired?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  getExhibition: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        "/exhibition/list?limit=10",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  fetchCompanies: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "/company/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  fetchVenues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        "/venue/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  fetchAssociation: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list?limit=200"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
