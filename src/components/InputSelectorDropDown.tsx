import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface InputSelectorDropdownProps<T> {
  InputOption: T[];
  title: string;
  selectedInput?: T;
  onSelect?: (input: T) => void; // ✅ generic type
}

function InputSelectorDropdown<T extends { id: string; name: string; description?: string; icon: JSX.Element }>({
  InputOption,
  title,
  selectedInput,
  onSelect,
}: InputSelectorDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelect = (input: T) => {
    onSelect?.(input); // ✅ now fully type-safe
    setIsOpen(false);
  };

  return (
    <div className="w-full relative flex flex-col gap-4" ref={dropdownRef}>
      <p className="text-primary font-medium outfit-font">{title}</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-5 border border-gray-200 rounded-[30px] cursor-pointer hover:bg-gray-50 transition-colors text-left"
      >
        {selectedInput ? selectedInput.name : `Select ${title}`}
        <FiChevronDown className={`text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 -mt-3 bg-white rounded-[20px] shadow-lg border border-gray-200 z-50 mx-6 py-3 px-4 max-h-60 overflow-y-auto">
          {InputOption.map((input) => (
            <div
              key={input.id}
              onClick={() => handleSelect(input)}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-gray-50 ${
                selectedInput?.id === input.id ? "bg-[#F5F5F5]" : ""
              }`}
            >
              <div className="shrink-0">{input.icon}</div>
              <div>
                <div className="font-medium text-sm">{input.name}</div>
                {input.description && <div className="text-xs text-gray-500">{input.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputSelectorDropdown;
