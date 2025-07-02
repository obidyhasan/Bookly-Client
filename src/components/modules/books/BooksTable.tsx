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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import Loading from "@/components/layouts/Loading";
import type { IBook } from "@/types/book";

const BooksTable = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

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
            <TableRow key={index}>
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-yellow-500">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-500">
                      Borrow
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      Delete
                    </DropdownMenuItem>
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
