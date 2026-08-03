"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookForm } from "@/app/components/BookForm";
import { createBook } from "@/app/lib/api";
import { toast } from "sonner"; // or your own toast hook

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
  setIsSubmitting(true);

  try {
    const payload = {
  ...data,
  tags: Array.isArray(data.tags)
    ? data.tags
    : data.tags
        ? data.tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [],
};
    await createBook(payload);

    toast.success("Book added successfully!");
    router.push("/");
    router.refresh();
  }

  catch (error: any) {
  console.error("Create book error:", error);

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Failed to add book"
  );
}
  finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border-2 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Add a New Book</CardTitle>
          <CardDescription>
            Fill in the details below to add a book to your collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass loading state to disable form while submitting */}
          <BookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}