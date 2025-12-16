import { ArrowLeft, CircleAlert, Copy } from "lucide-react";
import Button from "../../components/Button";

import { useNavigate } from "react-router";

export const CryptoAddress = () => {
  let navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/success");
  };
  return (
    <div className="bg-white border border-[#CCF6E5] border-solid rounded-[30px] max-w-160 mx-auto w-full px-16 pt-10 pb-14 flex flex-col justify-between items-center">
      <div className="flex flex-row items-center mb-10 w-full">
        <ArrowLeft size={24} onClick={() => navigate(-1)} />{" "}
        <h2 className="font-medium text-xl text-primary w-full text-center ">
          Send ETH to the address below
        </h2>{" "}
      </div>

      <div className="flex flex-row items-end justify-center bg-[#E6FBF2] border w-fit border-[#CCF6E5] rounded-[30px] py-2 px-4 gap-2 mb-16">
        <p className="font-medium text-primary">4LiV4YjbxsL6739MKghUd</p>
        <Copy color="#013941" size={24} />
      </div>
      <div className="w-full py-4 px-6 flex flex-col gap-6 rounded-[10px] bg-[#F7F7F7]">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-[#4F4F4F]">Amount to send</p>
          <div className="flex flex-row items-center gap-2">
            <p className="text-primary">100 ETH</p>{" "}
            <Copy color="#013941" size={24} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-[#4F4F4F]">Network</p>
          <p className="text-primary"> ETH</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-[#4F4F4F]">Wallet</p>
          <p className="text-primary">other</p>
        </div>
      </div>

      <div className="flex items-start gap-2 w-full mt-6 mb-40">
        <CircleAlert size={24} color="#013941" />
        <p className="text-sm text-[#4F4F4F]">
          Only send USDT to this address. Ensure the sender is on
          the CELO network otherwise you might lose your deposit
        </p>
      </div>
      <Button variant="primary" onClick={handleSubmit}>
        I have sent it
      </Button>
    </div>
  );
};
