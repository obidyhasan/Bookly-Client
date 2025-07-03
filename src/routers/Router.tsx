import App from "@/App";
import Books from "@/pages/Book/Books";
import CreateBook from "@/pages/Book/CreateBook";
import EditBook from "@/pages/Book/EditBook";
import SingleBook from "@/pages/Book/SingleBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Books,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
      {
        path: "/books/:id",
        Component: SingleBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
