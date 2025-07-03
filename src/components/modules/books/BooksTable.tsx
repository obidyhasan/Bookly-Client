import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import Loading from "@/components/layouts/Loading";
import type { IBook } from "@/types/book";
import { Button } from "@/components/ui/button";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const BooksTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();

  if (isLoading || deleteLoading) {
    return <Loading />;
  }

  function handleDeleteBook(id: string) {
    deleteBook(id);
    toast.success("Book Deleted Successfully");
  }

  return (
    <div className="mb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((book: IBook, index: number) => (
            <TableRow className="cursor-pointer" key={index}>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.title}
              </TableCell>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.author}
              </TableCell>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.genre}
              </TableCell>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.isbn}
              </TableCell>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.copies}
              </TableCell>
              <TableCell onClick={() => navigate(`/books/${book._id}`)}>
                {book.available ? "Yes" : "No"}
              </TableCell>
              <TableCell className="space-x-2 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xl">⋯</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-10 space-y-1">
                    <Button className="w-full bg-green-400">Borrow</Button>
                    <Link className="flex" to={`/edit-book/${book._id}`}>
                      <Button className="w-full bg-yellow-400">Edit</Button>
                    </Link>
                    <DeleteAlertDialog
                      onConfirm={() => handleDeleteBook(book._id)}
                      trigger={
                        <Button className="w-full bg-red-400">Delete</Button>
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BooksTable;
