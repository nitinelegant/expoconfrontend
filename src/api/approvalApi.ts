import { axiosInstance } from "@/lib/axios";
import { ExhibitionApprovalListResponse } from "@/types/approvalTypes";
import {
  ApproveResponse,
  AssociationsListResponse,
  CompanyListResponse,
  ConferenceListResponse,
  KeyContactListResponse,
} from "@/types/listTypes";

export const approvalApi = {
  getExhibitionApproval: async (): Promise<ExhibitionApprovalListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionApprovalListResponse>(
        "/association/approval"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getConferenceApproval: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        `/conference/approval`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getAssociationApproval: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        `/association/approval`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getCompanyApproval: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        `/company/approval`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getKeyContactApproval: async (): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        `/keycontact/approval`
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
};
