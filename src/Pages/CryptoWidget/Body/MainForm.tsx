
import React,{ useEffect, useState, type JSX } from "react";
import CryptoTokenSelector from "../../../components/CryptoTokenSelector";
import CurrencySelector from "../../../components/CurrencySelector";
import InputSelectorDropdown from "../../../components/InputSelectorDropDown";
import Button from "../../../components/Button";
import type { TokenPair } from "../../../types/token";
import metamask from "../../../assets/Metamask.png"
import rainbow from "../../../assets/Rainbow.png"
import walletconnect from "../../../assets/Walletconnect.png"
import otherwallet from "../../../assets/otherwallet.png"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface WalletOption {
  id: string;
  name: string;
  description?: string;
  icon: JSX.Element;
  isOther?: boolean;
}

const WalletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'Metamask',
    icon: (
      <img 
        src={metamask}
        alt="MetaMask" 
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: (
      <img 
        src={rainbow}
        alt="Rainbow" 
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: (
      <img 
        src={walletconnect}
        alt="WalletConnect" 
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
  {
    id: 'other',
    name: 'Other Crypto Wallet(Binance, Coinbase, Bybit etc)',
    description: '(Binance, Coinbase, Bybit etc)',
    icon: (
      <img 
        src={otherwallet}
        alt="WalletConnect" 
        className="w-8 h-8  object-cover"
      />
    ),
    isOther: true,
  },
];
interface ReceiveOption {
  id: string;
  name: string;
  description?: string;
  icon: JSX.Element;
  isOther?: boolean;
}

const ReceiveOptions: ReceiveOption[] = [
  {
    id: 'Bank',
    name: 'Bank',
    icon: (
      <img 
        src="https://cdn-icons-png.flaticon.com/512/8176/8176383.png" 
        alt="Bank" 
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  },
  {
    id: 'Others',
    name: 'Others',
    icon: (
      <img 
        src="https://cdn-icons-png.flaticon.com/512/18274/18274908.png" 
        alt="Others" 
        className="w-8 h-8 rounded-full object-cover"
      />
    ),
  }
];

export const MainForm = () => {
    const [payAmount, setPayAmount] = React.useState("");
    const [receiveAmount, setReceiveAmount] = React.useState("");
    const [selectedToken, setSelectedToken] = useState<TokenPair | null>();
    const [payFrom, setPayFrom] = useState<WalletOption | undefined>();
    const [receiveTO, setReceiveTO] = useState<ReceiveOption | undefined>();
  const TOKEN_RATES: Record<string, number> = {
  ETH: 3200000,
  "USDT-CELO": 1500,
  "USDT-TON": 1500,
  "USDT-BNB": 1500,
};

 let navigate = useNavigate();


  useEffect(() => {
  if (!payAmount || Number(payAmount) <= 0 || !selectedToken) {
    setReceiveAmount("");
    return;
  }

  const rate = TOKEN_RATES[selectedToken.name];

  if (!rate) {
    setReceiveAmount("");
    return;
  }

  const calculated = Number(payAmount) * rate;
  setReceiveAmount(calculated.toFixed(2));
}, [payAmount, selectedToken]);

 const handleSubmit = () => {
  if (!payAmount) {
    toast.error("Please enter an amount");
    return;
  }

  if (Number(payAmount) <= 0) {
    toast.error("Amount must be greater than zero");
    return;
  }

  if (!selectedToken) {
    toast.error("Please select a crypto token");
    return;
  }
  if (!payFrom) {
    toast.error("Please select a wallet to pay from");
    return;
  }
  if (!receiveTO) {
    toast.error("Please select a wallet to receive to");
    return;
  }


navigate("/recepient-details")
 
};


  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-2 p-6 border border-[#E0E0E0] rounded-[30px] ">
        <p className="outfit-font text-[#828282] font-medium ">You pay</p>
        <div className="flex items-center justify-between">
          <input type="number" placeholder="1.00" value={payAmount} className="w-full min-w-0 truncate focus:outline-none no-spinners text-2xl text-[#000E10] font-semibold outfit-font placeholder:text-[#000E10]"  onChange={(e) => setPayAmount(e.target.value)} />
         
           <CryptoTokenSelector onChange={setSelectedToken}/>
            
        </div>
      </div>

     <div className="flex flex-col gap-2 p-6 border border-[#E0E0E0] rounded-[30px] ">
        <p className="outfit-font text-[#828282] font-medium ">You receive</p>
        <div className="flex items-center justify-between">
          <input type="number" placeholder="1.00" value={receiveAmount} className=" w-full min-w-0 truncate focus:outline-none flex-wrap no-spinners text-2xl text-[#000E10] font-semibold outfit-font placeholder:text-[#000E10]"  onChange={(e) => setReceiveAmount(e.target.value)} />
         
           <CurrencySelector/>
          
        </div>
      </div>
       <InputSelectorDropdown InputOption={WalletOptions} title="Pay from" selectedInput={payFrom} onSelect={setPayFrom}/>
       <InputSelectorDropdown InputOption={ReceiveOptions} title="Pay to" selectedInput={receiveTO} onSelect={setReceiveTO}/>
    </div>
    <Button variant="primary" onClick={handleSubmit}>Convert now</Button>
    </div>
  );
};
