import React from "react";

interface TextInputProps {
  htmlFor: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  htmlFor,
  label,
  type,
  value,
  placeholder,
  onChange,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={htmlFor} className="text-primary font-medium outfit-font">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-[#E0E0E0] rounded-[30px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outfit-font"
      />
    </div>
  );
};
