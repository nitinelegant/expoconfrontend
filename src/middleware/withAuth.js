import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.replace("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
