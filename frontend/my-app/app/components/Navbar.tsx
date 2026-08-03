"use client";

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, LogOut, PlusCircle } from "lucide-react";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <BookOpen className="h-6 w-6" />
          <span>BookManager</span>
        </Link>

        {/* Right: Navigation */}
        <div className="flex items-center gap-3">
    
          {isAuthenticated ? (
            <>
              {/* Add Book button (visible on larger screens) */}
              <Link href="/books/add" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  Add Book
                </Button>
              </Link>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full hover:bg-accent hover:text-accent-foreground p-1.5 transition-colors cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:block">
                    {user?.name}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Mobile Add Book link */}
                  <DropdownMenuItem
                    onClick={() => router.push("/books/add")}
                    className="sm:hidden cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Book
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}