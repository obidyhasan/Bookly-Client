import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import bookLogo from "./../../assets/book.png";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-red-500 text-sm font-semibold" : "text-gray-600 text-sm";
  return (
    <div className="border-b sticky top-0 z-50 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className=" md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2" align="start">
                <DropdownMenuItem>
                  <Link to={"/books"}>All Books</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/create-book"}>Add Book</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/borrow-summary"}>Borrow Summary</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to={"/"} className="flex items-center gap-2">
            <img className="w-8 hidden md:flex" src={bookLogo} alt="" />
            <h1 className="font-bold text-2xl">Bookly</h1>
          </Link>
        </div>
        <div className="md:flex items-center gap-3 hidden">
          <NavLink to={"/"} className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink className={navLinkStyle} to={"/books"}>
            All Books
          </NavLink>
          <NavLink className={navLinkStyle} to={"/create-book"}>
            Add Book
          </NavLink>
          <NavLink className={navLinkStyle} to={"/borrow-summary"}>
            Borrow Summary
          </NavLink>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
