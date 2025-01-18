import { User, UserResponse } from "@/types/authTypes";
import { authApi } from "./authApi";

export async function fetchUser(): Promise<User> {
  const { user }: UserResponse = await authApi.getCurrentUser();
  return user;
}
