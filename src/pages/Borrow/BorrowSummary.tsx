import BorrowSummaryTable from "@/components/modules/borrows/BorrowSummaryTable";

const BorrowSummary = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="my-10 flex justify-between items-start sm:items-end flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">Borrow Summary</h1>
          <p className="text-sm max-w-xl mt-1">
            Overview of all borrowed books, including borrower details, due
            dates, and return status. Easily track and manage library activity
            from a single view.
          </p>
        </div>
      </div>
      <BorrowSummaryTable />
    </div>
  );
};

export default BorrowSummary;
