import { axiosInstance } from "@/lib/axios";
import {
  ConferenceApprovalListResponse,
  ExhibitionApprovalListResponse,
} from "@/types/approvalTypes";
import { ConferenceListResponse } from "@/types/listTypes";

export const approvalApi = {
  getExhibition: async (): Promise<ExhibitionApprovalListResponse> => {
    try {
      const response = await axiosInstance.get<ExhibitionApprovalListResponse>(
        "/association/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getConferenceApproval: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        `/conference/approval`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
};
