import { Facebook, Github, Instagram } from "lucide-react";
import bookLogo from "./../../assets/book.png";

const Footer = () => {
  return (
    <div className="border-t">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <img className="w-8 hidden md:flex" src={bookLogo} alt="" />
          <h1 className="font-bold text-2xl">Bookly</h1>
        </div>
        <p className="max-w-xl text-center my-3 text-sm">
          A Minimalist and Responsive Library Management System for Seamless
          Book and Borrow Operations Using React, TypeScript, and Redux Toolkit
          Query
        </p>

        <div className="border flex items-center gap-3 py-2 flex-wrap px-3 rounded-full">
          <Facebook />
          <Instagram />
          <Github />
        </div>
        <p className="text-sm mt-4">© Bookly 2025. All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
