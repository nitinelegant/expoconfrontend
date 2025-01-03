import { axiosInstance } from "@/lib/axios";
import {
  ApproveResponse,
  AssociationsListResponse,
  CompanyListResponse,
  ConferenceListResponse,
  ExhibitionsListResponse,
  KeyContactListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const approvalApi = {
  getExhibitionApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ExhibitionsListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionsListResponse>(
        "/association/approval",
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getConferenceApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        `/conference/approval?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getAssociationApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        `/association/approval?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompanyApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        `/company/approval?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getKeyContactApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        `/keycontact/approval?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  approveOrReject: async (url: string): Promise<ApproveResponse> => {
    try {
      const response = await axiosInstance.post<ApproveResponse>(`${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  deleteApproval: async (url: string): Promise<ApproveResponse> => {
    try {
      const response = await axiosInstance.delete<ApproveResponse>(`${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  getVenueApproval: async ({
    page,
    searchTerm,
  }: {
    page: number;
    searchTerm: string;
  }): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        `/venue/approval?limit=10`,
        {
          params: { page, keyword: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
