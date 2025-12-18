import { ArrowLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import InputSelectorDropdown from "../../components/InputSelectorDropDown";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import PhoneInput from "../../components/PhoneInput";
import { useNavigate } from "react-router";

interface BankOption {
  id: string;
  name: string;
  description?: string;
  icon: ReactNode;
  isOther?: boolean;
}
const BankOptions: BankOption[] = [
  {
    id: "Guarantee Trust Bank",
    name: "Guarantee Trust Bank",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/8176/8176383.png"
        alt="Guarantee Trust Bank"
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
  {
    id: "United bank of africa",
    name: "United bank of africa",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/8176/8176383.png"
        alt="United bank of africa"
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
];
export const RecipientDetail = () => {
  const [bank, setBank] = useState<BankOption | undefined>();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [inputType, setInputType] = useState("AccountInfo");
  const [email, setEmail] = useState("");
  const [phoneData, setPhoneData] = useState({
    countryCode: "+234",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputType === "AccountInfo") {
      if (!bank) {
        toast.error("Please select a bank");
        return;
      }
      if (!accountNumber) {
        toast.error("Please enter an account number");
        return;
      }
      if (!accountName) {
        toast.error("Please enter an account name");
        return;
      }

      setInputType("ContactInfo");
      return;
    }

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    navigate("/crypto-address");
  };
  return (
    <div className="bg-white border border-[#CCF6E5] h-[90%] border-solid rounded-[30px] max-w-160 mx-auto w-full px-16 pt-10 pb-14 flex flex-col justify-between">
      <div className="">
        <div className="flex flex-row items-center mb-10">
          <ArrowLeft
            size={24}
            onClick={
              inputType === "ContactInfo"
                ? () => setInputType("AccountInfo")
                : () => navigate(-1)
            }
          />{" "}
          <h2 className="font-medium text-xl text-primary w-full text-center">
            Recipient details
          </h2>{" "}
        </div>
        <div className="flex flex-col gap-8 ">
          {inputType === "AccountInfo" && (
            <div className="flex flex-col gap-8 ">
              <InputSelectorDropdown
                InputOption={BankOptions}
                title="Bank"
                selectedInput={bank}
                onSelect={setBank}
              />
              <TextInput
                htmlFor="Account number"
                label="Account number"
                placeholder="Enter account number"
                type="number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <TextInput
                htmlFor="Account name"
                label="Account name"
                placeholder="Enter account name"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          )}

          {inputType === "ContactInfo" && (
            <div className="flex flex-col gap-8">
              <TextInput
                htmlFor="Recipient email"
                label="Recipient email"
                placeholder="Enter recipient email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PhoneInput value={phoneData} onChange={setPhoneData} />
            </div>
          )}
        </div>
      </div>
      <Button variant="primary" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};
