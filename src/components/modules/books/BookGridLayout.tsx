import Loading from "@/components/layouts/Loading";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import type { IBook } from "@/types/book";
import BookCard from "./BookCard";
import type { ErrorResponse } from "react-router";
import toast from "react-hot-toast";

const BookGridLayout = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  // Check and handle the error
  if (isError && error) {
    const err = error as unknown as ErrorResponse;
    console.log(error);

    // Show the error message
    toast.error(
      err.data?.message || err.data?.error?.name || "Something went wrong"
    );
  }

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.data.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGridLayout;
