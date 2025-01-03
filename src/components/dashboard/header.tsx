import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ADMIN } from "@/constants/auth";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  // const { data, isLoading: loading, error } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  // const { data } = useUser();
  // console.log("data", data);

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">
          {title || "Dashboard"}
        </h1>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search here"
              className="w-[300px] pl-8"
            />
          </div> */}
          {/* <button className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              4
            </span>
          </button> */}
          <div className="flex items-center space-x-2 text-black">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              {/* <AvatarFallback>GA</AvatarFallback> */}
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">
                {user === ADMIN ? "Admin" : "Staff"}
              </p>
              <p className="text-gray-500">
                {`${user === ADMIN ? "Adming" : "Staff"}`}@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
