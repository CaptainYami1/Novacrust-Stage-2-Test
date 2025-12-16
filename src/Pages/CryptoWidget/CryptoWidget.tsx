import { useState } from "react";
import { ComingSoon } from "./Body/ComingSoon";
import { MainForm } from "./Body/MainForm";

export const CryptoWidget = () => {
  const [conversionMode, setConversionMode] = useState<
    "crypto-to-cash" | "cash-to-crypto" | "crypto-to-fiat-loan"
  >("crypto-to-cash");
  return (
    <div className="bg-white border border-[#CCF6E5] border-solid rounded-[30px] max-w-160 mx-auto w-full px-16 pt-10 pb-14">
      <div className=" bg-[#f2f2f2]  rounded-[30px]  w-fit flex m-auto">
        <span
          onClick={() => setConversionMode("crypto-to-cash")}
          className={`inline-flex items-center text-center px-4 py-2  rounded-[30px] transition-all font-medium leading-[normal] relative  text-[14px] text-sm ${
            conversionMode === "crypto-to-cash"
              ? "bg-primary text-[#f8fefb]"
              : "text-[#828282]"
          }`}
        >
          Crypto to cash
        </span>
        <span
          onClick={() => setConversionMode("cash-to-crypto")}
          className={`inline-flex items-center text-center px-4 py-2  rounded-[30px]  transition-all font-medium leading-[normal] relative  text-[14px] ${
            conversionMode === "cash-to-crypto"
              ? "bg-primary text-[#f8fefb]"
              : "text-[#828282]"
          }`}
        >
          Cash to crypto
        </span>
        <span
          onClick={() => setConversionMode("crypto-to-fiat-loan")}
          className={`inline-flex items-center px-4 py-2 text-center rounded-[30px] transition-all font-medium leading-[normal] relative  text-[14px]  ${
            conversionMode === "crypto-to-fiat-loan"
              ? "bg-primary text-[#f8fefb]"
              : "text-[#828282]"
          }`}
        >
          Crypto to fiat loan
        </span>
      </div>

    {conversionMode === "crypto-to-cash" && <MainForm />}
      {conversionMode !== "crypto-to-cash" && <ComingSoon
        cryptoType={
          conversionMode === "cash-to-crypto"
            ? "Cash to crypto"
            : conversionMode === "crypto-to-fiat-loan"
            ? "Crypto to fiat loan"
            : "Crypto to cash"
        }
      />}
    </div>
  );
};
