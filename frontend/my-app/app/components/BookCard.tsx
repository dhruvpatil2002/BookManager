"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/app/lib/api";
import { toast } from "sonner";
import { useBookStore } from "@/app/lib/bookstore";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Edit, Trash2 } from "lucide-react";


export function BookCard({ book }: { book:any }) {

  const router = useRouter();
    const { removeBook } = useBookStore();
  const [isDeleting,setIsDeleting] = useState(false);


 
const handleDelete = async () => {
  try {

    setIsDeleting(true);

    await deleteBook(book._id);

    removeBook(book._id);

    toast.success("Book deleted successfully");

  } catch(error:any){

    toast.error(
      error.message || "Failed to delete book"
    );

  } finally {

    setIsDeleting(false);

  }
};

  return (

    <Card>

      <CardHeader>
        <CardTitle>
          {book.title}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {book.author}
        </p>

      </CardHeader>


      <CardContent>

        <p>
          {book.status}
        </p>


        <div className="flex gap-2 mt-3">

          {
            book.tags?.map((tag:string)=>(
              <Badge key={tag}>
                #{tag}
              </Badge>
            ))
          }

        </div>


      </CardContent>


      <CardFooter className="flex gap-2">

        <Link href={`/books/${book._id}/edit`}>

          <Button variant="outline">
            <Edit className="h-4 w-4 mr-1"/>
            Edit
          </Button>

        </Link>


        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}
        >

          <Trash2 className="h-4 w-4 mr-1"/>

          {
            isDeleting 
            ? "Deleting..."
            : "Delete"
          }

        </Button>


      </CardFooter>


    </Card>

  );
}