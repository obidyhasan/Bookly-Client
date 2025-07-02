import BooksTable from "@/components/modules/books/BooksTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Books = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="my-10 flex justify-between items-start sm:items-end flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">All Books</h1>
          <p className="text-sm max-w-xl mt-1">
            Explore the complete collection of books available in the library.
            View essential details, manage book entries, and perform quick
            actions like edit, delete, or borrow—all in one place.
          </p>
        </div>

        <Link to={"/create-book"}>
          <Button className="cursor-pointer">Add New Book</Button>
        </Link>
      </div>
      <BooksTable />
    </div>
  );
};

export default Books;
