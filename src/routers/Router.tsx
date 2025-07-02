import App from "@/App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <h1>Main Layout</h1>,
      },
      {
        path: "/books",
        element: <h1>Books Layout</h1>,
      },
      {
        path: "/create-book",
        element: <h1>Create Book Layout</h1>,
      },
      {
        path: "/books/:id",
        element: <h1>Get Single Book Layout</h1>,
      },
      {
        path: "/edit-book/:id",
        element: <h1>Edit Book Layout</h1>,
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
