import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface PropsType {
  id: string;
  copies: number;
}

const BorrowModal = ({ id, copies }: PropsType) => {
  const form = useForm();
  const navigate = useNavigate();
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const borrowData = {
      ...data,
      quantity: parseInt(data.quantity),
      book: id,
    };
    console.log(borrowData);
    await createBorrow(borrowData).unwrap();
    form.reset();
    toast.success("Book Borrowed Successfully");
    navigate("/borrow-summary", { replace: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full ">Borrow</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 my-4">
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                  max: {
                    value: copies,
                    message: "Not enough copies available",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        required
                        {...field}
                        placeholder="Enter Title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Dua date is required" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel>Dua Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {isLoading ? (
                <Button disabled>
                  <Loader2Icon className="animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button type="submit">Borrow Book</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
