"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Mail } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg border-2 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <Avatar className="mx-auto h-20 w-20">
            <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-2xl text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="mt-2 text-2xl">
            {user?.name || "User"}
          </CardTitle>

          <CardDescription className="flex items-center justify-center gap-1">
            <Mail className="h-4 w-4" />
            {user?.email || "No email"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}