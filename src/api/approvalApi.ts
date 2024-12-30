import { axiosInstance } from "@/lib/axios";
import {
  ConferenceApprovalListResponse,
  ExhibitionApprovalListResponse,
} from "@/types/approvalTypes";

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
  getConference: async (): Promise<ConferenceApprovalListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceApprovalListResponse>(
        "/company/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
};
