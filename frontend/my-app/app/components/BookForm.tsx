"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),

  author: z.string().min(1, "Author is required"),

  tags: z.string().optional(),

  status: z.enum([
    "want-to-read",
    "reading",
    "completed",
  ]),
});


type BookFormValues = z.infer<typeof bookSchema>;



interface BookFormProps {

  onSubmit: (
    data: any
  ) => Promise<void>;

  isSubmitting: boolean;

  initialData?: {

    title?: string;

    author?: string;

    tags?: string[];

    status?: string;

  };
}



export function BookForm({
  onSubmit,
  isSubmitting,
  initialData,
}: BookFormProps) {


  const form = useForm<BookFormValues>({

    resolver: zodResolver(bookSchema),

    defaultValues: {

      title: initialData?.title || "",

      author: initialData?.author || "",

      tags: initialData?.tags?.join(", ") || "",

      status:
        (initialData?.status as BookFormValues["status"])
        || "want-to-read",

    },

  });



  // Update form values when edit data loads

  useEffect(() => {

    if(initialData){

      form.reset({

        title: initialData.title || "",

        author: initialData.author || "",

        tags:
          initialData.tags?.join(", ") || "",

        status:
          (initialData.status as BookFormValues["status"])
          || "want-to-read",

      });

    }

  }, [initialData, form]);




  const handleFormSubmit = async (
    values: BookFormValues
  ) => {


    const payload = {

      title: values.title,

      author: values.author,

      status: values.status,


      tags: values.tags
        ? values.tags
            .split(",")
            .map((tag)=>tag.trim())
            .filter(Boolean)
        : [],

    };


    await onSubmit(payload);

  };





  return (

    <Form {...form}>

      <form
        onSubmit={
          form.handleSubmit(handleFormSubmit)
        }
        className="space-y-4"
      >



        {/* Title */}

        <FormField

          control={form.control}

          name="title"

          render={({field})=>(

            <FormItem>

              <FormLabel>
                Title
              </FormLabel>


              <FormControl>

                <Input
                  placeholder="Book title"
                  {...field}
                />

              </FormControl>


              <FormMessage />

            </FormItem>

          )}

        />




        {/* Author */}

        <FormField

          control={form.control}

          name="author"

          render={({field})=>(

            <FormItem>

              <FormLabel>
                Author
              </FormLabel>


              <FormControl>

                <Input
                  placeholder="Author name"
                  {...field}
                />

              </FormControl>


              <FormMessage />

            </FormItem>

          )}

        />





        {/* Tags */}

        <FormField

          control={form.control}

          name="tags"

          render={({field})=>(

            <FormItem>

              <FormLabel>
                Tags (comma separated)
              </FormLabel>


              <FormControl>

                <Input

                  placeholder="fiction, mystery"

                  {...field}

                />

              </FormControl>


              <FormMessage />

            </FormItem>

          )}

        />





        {/* Status */}

        <FormField

          control={form.control}

          name="status"

          render={({field})=>(

            <FormItem>


              <FormLabel>
                Status
              </FormLabel>



              <Select

                value={field.value}

                onValueChange={
                  field.onChange
                }

              >

                <FormControl>

                  <SelectTrigger>

                    <SelectValue
                      placeholder="Select status"
                    />

                  </SelectTrigger>

                </FormControl>



                <SelectContent>


                  <SelectItem value="want-to-read">

                    📖 Want to Read

                  </SelectItem>



                  <SelectItem value="reading">

                    📘 Reading

                  </SelectItem>



                  <SelectItem value="completed">

                    ✅ Completed

                  </SelectItem>


                </SelectContent>


              </Select>



              <FormMessage />


            </FormItem>

          )}

        />





        <Button

          type="submit"

          disabled={isSubmitting}

          className="w-full"

        >

          {
            isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Book"
                : "Add Book"
          }


        </Button>



      </form>


    </Form>

  );

}