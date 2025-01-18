import { axiosInstance } from "@/lib/axios";
import { AssociationsListResponse } from "@/types/listTypes";
import { StaffCredentials } from "@/types/staffTypes";
export const staffApi = {
  registStaff: async (
    credentials: StaffCredentials
  ): Promise<StaffCredentials> => {
    try {
      const response = await axiosInstance.post<StaffCredentials>(
        "/users/create",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
  getStaff: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/staff/list"
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
