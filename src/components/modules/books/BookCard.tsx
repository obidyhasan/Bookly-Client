import type { IBook } from "@/types/book";
import bookImg from "./../../../assets/book.png";
import { Button } from "@/components/ui/button";
import BorrowModal from "../borrows/BorrowModal";
import { Link, useNavigate } from "react-router";
import DeleteAlertDialog from "./DeleteAlertDialog";
import toast from "react-hot-toast";
import Loading from "@/components/layouts/Loading";
import { useDeleteBookMutation } from "@/redux/api/bookApi";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }

  function handleDeleteBook(id: string) {
    deleteBook(id);
    toast.success("Book Deleted Successfully");
  }

  const handleNavigate = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div className="border p-3 rounded-lg flex flex-col gap-3 justify-between">
      <div onClick={handleNavigate} className="space-y-3 cursor-pointer">
        <img className="max-w-[100px] mx-auto mt-2" src={bookImg} alt="" />
        <div className="mt-4">
          <h1 className="text-center font-semibold ">{book.title}</h1>
          <p className="mt-0.5 mb-1 text-center text-sm font-medium">
            {book.author}
          </p>
          <p className="text-center text-sm">ISBN: {book.isbn}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <hr />
        <div className="flex items-center justify-between gap-3">
          <p>Copies: {book.copies}</p>
          {book.available ? (
            <p>Available</p>
          ) : (
            <p className="text-red-400">Not Available</p>
          )}
        </div>
        <div className="flex justify-evenly gap-2 items-stretch">
          <div className="w-1/3">
            <BorrowModal id={book._id} copies={book.copies} />
          </div>
          <Link className="flex w-1/3" to={`/edit-book/${book._id}`}>
            <Button className="w-full ">Edit</Button>
          </Link>
          <DeleteAlertDialog
            onConfirm={() => handleDeleteBook(book._id)}
            trigger={<Button className="w-1/3 ">Delete</Button>}
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
