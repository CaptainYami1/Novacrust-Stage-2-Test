import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface CurrencyPair {
  id: number;
  name: string;
  logoUrl: string;
  isSelected: boolean;
}

const currencyPairs: CurrencyPair[] = [
   {
    id: 0, 
    name: 'NGN', 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/1280px-Flag_of_Nigeria.svg.png',
    isSelected: true 
  },
  { 
    id: 1, 
    name: 'GHC', 
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7PfMoe-PBkdKdBpHN5cuEe6g5M58jk9IRA&s',
    isSelected: true 
  },
  { 
    id: 2, 
    name: 'KYS', 
    logoUrl: 'https://thumbs.dreamstime.com/b/kenya-flag-image-any-design-simple-style-80478548.jpg',
    isSelected: false 
  },
];

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(
    currencyPairs.find(p => p.isSelected) || currencyPairs[0]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  const handleSelectPair = (pair: CurrencyPair) => {
    setSelectedPair(pair);
    setIsOpen(false); 
  };

  return (
    <div className="w-72 relative" ref={dropdownRef}>
     
      <div 
        className="flex items-center gap-1 px-3 py-2 border bg-[#F7F7F7] border-gray-200 rounded-[20px] cursor-pointer hover:bg-gray-50 transition-colors w-fit float-right"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <img 
            src={selectedPair?.logoUrl} 
            alt={selectedPair?.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-medium text-sm">{selectedPair?.name}</span>
          <FiChevronDown 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            size={20} 
          />
        </div>
      </div>


      {isOpen && (
        <div className="absolute top-full  right-0 bg-white rounded-[20px] shadow-lg border border-gray-200 z-50 p-3 w-fit">
       
          <div className="max-h-80 overflow-y-auto">
            {currencyPairs.map((pair) => (
              <div
                key={pair.id}
                onClick={() => handleSelectPair(pair)}
                className={`flex items-center justify-between  p-3 w-60 
                          hover:bg-gray-50 cursor-pointer text-sm transition-colors rounded-lg
                          ${pair.id === selectedPair.id ? 'bg-[#F5F5F5]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={pair.logoUrl} 
                    alt={pair.name}
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

export default CurrencySelector;
