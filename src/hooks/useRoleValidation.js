import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRoleValidation = (allowedTypes) => {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!allowedTypes.includes(Number(userType))) {
      router.push("/unauthorized");
    }
  }, [allowedTypes, router]);
};
