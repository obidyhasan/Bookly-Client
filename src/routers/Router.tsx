import App from "@/App";
import Books from "@/pages/Book/Books";
import CreateBook from "@/pages/Book/CreateBook";
import EditBook from "@/pages/Book/EditBook";
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
        element: <h1>Get Single Book Layout</h1>,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow/:bookId",
        element: <h1>Borrow Book Layout</h1>,
      },
      {
        path: "/borrow-summary",
        element: <h1>Borrow Summary Book Layout</h1>,
      },
    ],
  },
]);

export default router;
