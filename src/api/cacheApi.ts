import { axiosInstance } from "@/lib/axios";

interface CacheDataProps {
  _id: number;
  status: "active" | "inactive";
  name: string;
}

export interface CacheDataResponse {
  adv_location: CacheDataProps[];
  association_type_id: CacheDataProps[];
  company_type_id: CacheDataProps[];
  con_segment_id: CacheDataProps[];
  con_type_id: CacheDataProps[];
  expo_segment_id: CacheDataProps[];
  expo_type_id: CacheDataProps[];
  interested_as: CacheDataProps[];
  job_type: CacheDataProps[];
  state_id: CacheDataProps[];
  year_id: CacheDataProps[];
}

export const cacheApi = {
  getCacheData: async (): Promise<CacheDataResponse> => {
    try {
      const response = await axiosInstance.get<CacheDataResponse>("/config");
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
