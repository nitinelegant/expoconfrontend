import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface WithAuthOptions {
  requiredRole: string[];
}

export const withAuth = (Component: FC<any>, options: WithAuthOptions) => {
  return (props: any) => {
    const { user, loading } = useAuth(); // Add isLoading from your auth context
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const router = useRouter();
    useEffect(() => {
      if (!loading) {
        // Only proceed with auth checks after initial load
        if (!user) {
          setIsAuthorized(false);
          router.replace("/");
        } else if (
          options?.requiredRole?.length > 0 &&
          !options.requiredRole.includes(user)
        ) {
          setIsAuthorized(false);
          router.push("/unauthorized");
        } else {
          setIsAuthorized(true);
        }
      }
    }, [user, router, loading]);

    // Show nothing during initial load or unauthorized state
    if (loading || !isAuthorized) {
      return null; // Or return a loading spinner/component
    }

    // Pass props to the Component
    return <Component {...props} />;
  };
};
