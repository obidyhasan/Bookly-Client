import Loading from "@/components/layouts/Loading";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";
import bookImg from "./../../assets/book_img.png";
import { Badge } from "@/components/ui/badge";

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-10 flex gap-5">
      <div className="w-full md:w-1/3 border p-5 rounded-2xl">
        <img src={bookImg} alt="" />
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
