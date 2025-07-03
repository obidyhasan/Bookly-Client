import Loading from "@/components/layouts/Loading";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";
import bookImg from "./../../assets/book.png";
import { Badge } from "@/components/ui/badge";
import type { ErrorResponse } from "@/types/Error";
import toast from "react-hot-toast";

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id);

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
    <div className="max-w-6xl mx-auto px-4 my-10 flex flex-col md:flex-row gap-5">
      <div className="w-full h-min md:w-1/3 border p-5 rounded-2xl">
        <img className="w-2/3 mx-auto" src={bookImg} alt="" />
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-3 items-start justify-center">
        <Badge>{data?.data?.genre}</Badge>
        <h1 className="text-2xl font-bold">{data?.data?.title}</h1>
        <span className="px-2 py-0.5 rounded text-base border font-semibold">
          {data?.data?.author}
        </span>
        <div className="space-y-1">
          <p className="font-medium">ISBN : {data?.data?.isbn}</p>
          <p className="font-medium">Copies : {data?.data?.copies}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">Description :</p>
          <p>{data?.data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
