import { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import type { TokenPair as BaseTokenPair } from "../types/token";
import { useToken } from "../context/TokenContext";

interface TokenPair extends BaseTokenPair {
  isSelected: boolean;
}

const tokenPairs: TokenPair[] = [
  {
    id: 0,
    name: "ETH",
    chain: "ETH",
    logoUrl:
      "https://cdn.prod.website-files.com/6683c774a6e7a5003c5889c3/669f0c2991541075936aa5b8_What%20is%20ETH_.png",
    isSelected: true,
  },
  {
    id: 1,
    name: "USDT-CELO",
    chain: "CELO",
    logoUrl: "https://cryptologos.cc/logos/celo-celo-logo.png?v=024",
    isSelected: true,
  },
  {
    id: 2,
    name: "USDT-TON",
    chain: "TON",
    logoUrl: "https://cryptologos.cc/logos/toncoin-ton-logo.png?v=024",
    isSelected: false,
  },
  {
    id: 3,
    name: "USDT-BNB",
    chain: "BNB",
    logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=024",
    isSelected: false,
  },
];
interface CryptoTokenSelectorProps {
  onChange: (pair: TokenPair) => void;
}

const CryptoTokenSelector = ({ onChange }: CryptoTokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    selectedPair: globalSelectedPair,
    setSelectedPair: setGlobalSelectedPair,
  } = useToken();
  const [selectedPair, setSelectedPair] = useState<TokenPair>(
    globalSelectedPair
      ? tokenPairs.find((p) => p.id === globalSelectedPair.id) || tokenPairs[0]
      : tokenPairs[0]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPair = (pair: TokenPair) => {
    setSelectedPair(pair);
    setGlobalSelectedPair(pair);
    onChange?.(pair);
    setIsOpen(false);
  };

  const filteredPairs = tokenPairs.filter((pair) =>
    pair.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-72 relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 px-3 py-2 border bg-[#F7F7F7] border-gray-200 rounded-[20px] cursor-pointer hover:bg-gray-50 transition-colors w-fit float-right"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <img
            src={selectedPair?.logoUrl}
            alt={selectedPair?.chain}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-medium text-sm">{selectedPair?.name}</span>
          <FiChevronDown
            className={`text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full  right-0 mt-1 bg-white rounded-[20px] shadow-lg border border-gray-200 z-50 px-3 w-fit">
          <div className=" py-3">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-[20px] border border-gray-200 w-60
                          focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredPairs.map((pair) => (
              <div
                key={pair.id}
                onClick={() => handleSelectPair(pair)}
                className={`flex items-center justify-between  p-3 w-60 
                          hover:bg-gray-50 cursor-pointer text-sm transition-colors rounded-lg
                          ${pair.id === selectedPair.id ? "bg-[#F5F5F5]" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pair.logoUrl}
                    alt={pair.chain}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{pair.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTokenSelector;
