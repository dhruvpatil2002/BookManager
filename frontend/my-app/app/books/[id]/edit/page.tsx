"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import { getBook, updateBook } from "@/app/lib/api";
import { BookForm } from "@/app/components/BookForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function EditBookPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;


  const [book,setBook] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [isSubmitting,setIsSubmitting] = useState(false);



  useEffect(()=>{

    const fetchBook = async()=>{

      try{

        const data = await getBook(id);

        setBook(data);

      }catch(error:any){

        toast.error(
          error.message || "Failed to load book"
        );

        router.push("/");

      }finally{

        setLoading(false);

      }

    };


    if(id){
      fetchBook();
    }


  },[id,router]);




  const handleSubmit = async(data:any)=>{

    try{

      setIsSubmitting(true);


      await updateBook(id,data);


      toast.success(
        "Book updated successfully"
      );


      router.push("/");


    }catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Failed to update book"
      );


    }finally{

      setIsSubmitting(false);

    }

  };



  if(loading){

    return (
      <p className="text-center mt-10">
        Loading book...
      </p>
    );

  }



  return (

    <div className="flex justify-center px-4 py-8">

      <Card className="w-full max-w-2xl">

        <CardHeader>

          <CardTitle>
            Edit Book
          </CardTitle>


          <CardDescription>
            Update "{book.title}"
          </CardDescription>

        </CardHeader>


        <CardContent>

          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

        </CardContent>


      </Card>

    </div>

  );
}