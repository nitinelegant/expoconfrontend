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
    const response = await axiosInstance.post<LoginResponse>(
      "/users/login",
      credentials
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/auth/me");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },
};
