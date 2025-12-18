type PhoneValue = {
  countryCode: string;
  phone: string;
};

type PhoneInputProps = {
  value: PhoneValue;
  onChange: (val: PhoneValue) => void;
};

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-primary font-medium outfit-font">Recipient phone number</label>

      <div className="w-full flex  border border-[#E0E0E0] rounded-[30px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outfit-font">
        <select
        title="phone"
          className="flex items-center gap-2 mr-4 bg-transparent outline-none border-none focus:ring-0 border-r border"
          value={value.countryCode}
          onChange={(e) =>
            onChange({
              ...value,
              countryCode: e.target.value,
            })
          }
        >
          <option value="+234">+234 🇳🇬 </option>
          <option value="+233">+233 🇬🇭 </option>
          
        </select>

        <input
          type="tel"
          placeholder="906 326 8609"
          value={value.phone}
          onChange={(e) =>
            onChange({
              ...value,
              phone: e.target.value,
            })
          }
          className="focus:outline-none focus:border-transparent outfit-font"
        />
      </div>
    </div>
  );
}
