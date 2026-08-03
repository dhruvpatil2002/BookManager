"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Stats } from "@/app/components/Stats";
import { FilterBar } from "@/app/components/FilterBar";
import { BookList } from "@/app/components/BookList";

import { useBookStore } from "@/app/lib/bookstore";
import { useAuth } from "@/app/hooks/useAuth";
import { getBooks, getMe } from "@/app/lib/api";

export default function Dashboard() {
  const router = useRouter();

  const { user, setUser } = useAuth();

  const {
    books,
    setBooks,
    loading,
    setLoading,
  } = useBookStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        const currentUser = await getMe();
        setUser(currentUser);

        // Load books
        const books = await getBooks();
        setBooks(books);
      } catch (err: any) {
        toast.error("Please login first");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Your Library {user ? `- ${user.name}` : ""}
      </h1>

      <Stats books={books} />

      <FilterBar />

      {loading ? (
        <p className="text-gray-500">Loading your books...</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}