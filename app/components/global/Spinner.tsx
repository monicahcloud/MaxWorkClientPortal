import { LoaderPinwheel } from "lucide-react";

const Spinner = () => {
  return (
    <div className="w-6 h-6 border-2 rounded-full animate-spin">
      <LoaderPinwheel />
    </div>
  );
};

export default Spinner;
