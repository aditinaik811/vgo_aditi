"use client";
import { useState } from "react";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
];

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState("+91");

  const numberOnly = value.startsWith(countryCode)
    ? value.slice(countryCode.length)
    : value;

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    onChange(`${countryCode}${digitsOnly}`);
  };

  return (
    <div className="phone-input-container">
      {/* Dropdown */}
      <select
        value={countryCode}
        onChange={(e) => {
          setCountryCode(e.target.value);
          onChange(`${e.target.value}${numberOnly}`);
        }}
        disabled={disabled}
      >
        {countryCodes.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>

      {/* Input */}
      <input
        type="tel"
        placeholder="Enter phone number"
        value={numberOnly}
        onChange={handleNumberChange}
        disabled={disabled}
        pattern="[0-9]{6,15}"
        required
      />
    </div>
  );
}
