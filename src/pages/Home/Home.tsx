import BookGridLayout from "@/components/modules/books/BookGridLayout";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="my-20 flex flex-col items-center gap-7">
        <h1 className="max-w-3xl text-center font-bold text-3xl sm:text-4xl md:text-5xl ">
          Bookly – Your Minimal Library Companion
        </h1>
        <p className="text-center max-w-4xl sm:text-base text-sm">
          Welcome to Bookly, a clean and simple library management system built
          to help you organize books and borrowing efficiently. Browse the full
          book collection, add or update entries, and track borrowed books—all
          in one intuitive interface.
        </p>
      </div>
      <BookGridLayout />
    </div>
  );
};

export default Home;
