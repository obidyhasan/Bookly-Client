import BooksTable from "@/components/modules/books/BooksTable";

const Books = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="my-5">
        <h1 className="font-semibold text-2xl">All Books</h1>
        <p className="text-sm max-w-xl mt-1">
          Explore the complete collection of books available in the library.
          View essential details, manage book entries, and perform quick actions
          like edit, delete, or borrow—all in one place.
        </p>
      </div>
      <BooksTable />
    </div>
  );
};

export default Books;
