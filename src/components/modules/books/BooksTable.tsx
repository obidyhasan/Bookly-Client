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

const BooksTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) {
    return <Loading />;
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
            <TableRow
              className="cursor-pointer"
              onClick={() => navigate(`/books/${book._id}`)}
              key={index}
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? "Yes" : "No"}</TableCell>
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
                      onConfirm={() => deleteBook(book._id)}
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
