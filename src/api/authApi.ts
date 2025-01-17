import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/authTypes";

interface LoginResponse {
  accessToken: string;
  type: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/users/login",
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      throw new Error(`Error while fetching data ${error}`);
    }
  },
};
