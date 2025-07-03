import Loading from "@/components/layouts/Loading";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import type { ErrorResponse } from "@/types/Error";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [updateBook, { isLoading: updateIsLoading }] = useUpdateBookMutation();

  const form = useForm();
  const navigate = useNavigate();
  // Check and handle the error
  if (isError && error) {
    const err = error as unknown as ErrorResponse;
    console.log(error);

    // Show the error message
    toast.error(
      err.data?.message || err.data?.error?.name || "Something went wrong"
    );
  }

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title,
        author: data.data.author,
        genre: data.data.genre,
        isbn: data.data.isbn,
        copies: data.data.copies,
        description: data.data.description,
      });
    }
  }, [data, form]);

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (newData) => {
    if (parseInt(newData.copies) === 0) {
      newData.available = false;
    }
    if (parseInt(newData.copies) > 0) {
      newData.available = true;
    }

    const bookData = {
      ...newData,
      _id: id,
      copies: parseInt(newData.copies),
    };

    await updateBook(bookData).unwrap();
    navigate("/books", { replace: true });
    toast.success("Book Edited Successfully");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <div className="max-w-md mx-auto">
        <h1 className="font-semibold text-center text-2xl">Edit Book</h1>

        <div className="mt-10">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input required {...field} placeholder="Enter Title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input required {...field} placeholder="Enter Author" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={data.data.genre}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genre</SelectLabel>
                          <SelectItem value="FICTION">FICTION</SelectItem>
                          <SelectItem value="NON_FICTION">
                            NON_FICTION
                          </SelectItem>
                          <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                          <SelectItem value="HISTORY">HISTORY</SelectItem>
                          <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                          <SelectItem value="FANTASY">FANTASY</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input required {...field} placeholder="Enter ISBN" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Copies is required",
                  min: {
                    value: 0,
                    message: "Copies can not be a negative number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="number"
                        {...field}
                        placeholder="Enter Copies"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        {...field}
                        placeholder="Enter Description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                {updateIsLoading ? (
                  <Button className="w-full mt-2" disabled>
                    <Loader2Icon className="animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="mt-2 w-full" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
