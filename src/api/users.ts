import { User } from "@/types/authTypes";
import { NextResponse } from "next/server";
import { authApi } from "./authApi";

export async function fetchUser(): Promise<User[]> {
  const { name, email, id, role }: User = await authApi.getCurrentUser();
  if (!name) {
    throw new Error("Failed to fetch segments");
  }
  return NextResponse.json({ name, email, id, role }).json();
}
