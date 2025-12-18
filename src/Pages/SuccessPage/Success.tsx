import Logo from "../../assets/NCLogo.png";
import Check from "../../assets/CheckCircle.png";
import { Copy } from "lucide-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

export const Success = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="bg-white border border-[#CCF6E5] border-solid rounded-[30px] max-w-160 mx-auto w-full px-16 pt-10 pb-14 flex flex-col justify-between items-center">
      <div className="flex flex-row items-center mb-16 max-w-[177px]">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-col items-center gap-10  w-full">
        <img src={Check} alt="" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-medium text-2xl text-[#000E10]">
            Your transaction is processing.
          </h1>
          <p className="text-lg text-[#4F4F4F]">
            The recipient will receive it shortly.
          </p>
        </div>
        <div className="w-full py-4 px-6 gap-6 rounded-[10px] bg-[#F7F7F7] flex flex-row justify-between items-center">
          <p className="text-sm text-[#4F4F4F]">Transaction ID</p>
          <div className="flex flex-row items-center gap-2">
            <p className="text-primary">NC123456789</p>{" "}
            <Copy color="#013941" size={24} />
          </div>
        </div>
        <Button variant="secondary" onClick={handleSubmit}>
          Go back to home
        </Button>
      </div>
    </div>
  );
};
