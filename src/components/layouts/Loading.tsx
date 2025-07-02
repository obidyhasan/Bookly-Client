import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <ClipLoader
        color={"#ff4e33"}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
