import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-3xl mb-8">Oops! Page not found</p>
        <p className="text-xl mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          {/* <Button
            asChild
            variant="outline"
            className="bg-white text-purple-600 hover:bg-purple-100"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button> */}
          <Button
            asChild
            variant="outline"
            className="bg-white text-purple-600 hover:bg-purple-100"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
