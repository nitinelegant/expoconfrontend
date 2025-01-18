import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface WithAuthOptions {
  requiredRole: string[];
}

export const withAuth = (
  Component: FC<React.Component>, // `any` will be fixed in the next step
  options: WithAuthOptions
) => {
  const WrappedComponent = (props) => {
    const { user, loading } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
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

    if (loading || !isAuthorized) {
      return <Loader />;
    }
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
