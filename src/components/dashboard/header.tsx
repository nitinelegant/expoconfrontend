import { ADMIN } from "@/constants/auth";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { data } = useUser();
  const { user } = useAuth();

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">
          {title || "Dashboard"}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-black">
            <div className="text-sm">
              <p className="font-medium capitalize">
                {user !== ADMIN && "Welcome, "} {data?.fullname}
              </p>
              <p className="text-gray-500">{data?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
