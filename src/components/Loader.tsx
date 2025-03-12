import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
      <ClipLoader color="#ffc404" />
    </div>
  );
};

export default Loader;
