import Loading from "@/components/layouts/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/api/borrowApi";
import type { IBorrowSummary } from "@/types/borrowSummary";
import type { ErrorResponse } from "@/types/Error";
import toast from "react-hot-toast";

const BorrowSummaryTable = () => {
  const { data, isLoading, error, isError } = useGetBorrowQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Check and handle the error
  if (isError && error) {
    const err = error as unknown as ErrorResponse;
    console.log(error);

    // Show the error message
    toast.error(
      err.data?.message || err.data?.error?.name || "Something went wrong"
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((summary: IBorrowSummary, index: number) => (
            <TableRow className="cursor-pointer" key={index}>
              <TableCell>{summary.book.title}</TableCell>

              <TableCell>{summary.book.isbn}</TableCell>
              <TableCell>{summary.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummaryTable;
