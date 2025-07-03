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
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { Loader2Icon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateBook = () => {
  const navigate = useNavigate();
  const form = useForm();
  const [createTask, { isLoading, isError, error }] = useCreateBookMutation();

  if (isError) {
    console.log(error);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...data,
      available: true,
      copies: parseInt(data.copies),
    };

    await createTask(bookData).unwrap();
    navigate("/books", { replace: true });
    form.reset();
    toast.success("Book Create Successfully");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <div className="max-w-md mx-auto">
        <h1 className="font-semibold text-center text-2xl">Create Book</h1>

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
                      defaultValue={field.value}
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
                    value: 1,
                    message: "Copies must be at least 1",
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
                {isLoading ? (
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

export default CreateBook;
