'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneInputWithCountryProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export const PhoneInputWithCountry: React.FC<PhoneInputWithCountryProps> = ({
  value,
  onChange,
  placeholder,
  className,
  error
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    inputValue,
    country,
    setCountry,
    handlePhoneValueChange,
  } = usePhoneInput({
    defaultCountry: 'th',
    value,
    disableDialCodeAndPrefix: true, // แยกเลขประเทศออกไปเลย
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountryData = country;

  return (
    <div className={cn("relative flex flex-col gap-1 w-full", className)}>
      <div className={cn(
        "flex items-center w-full min-h-[44px] bg-white border rounded-lg overflow-hidden transition-all",
        error ? "border-red-500" : "border-[#d3d3d3] focus-within:border-[#bba556] focus-within:ring-1 focus-within:ring-[#bba556]"
      )}>
        {/* Country Selector Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 h-[42px] bg-[#f8f9fa] border-r border-[#d3d3d3] hover:bg-gray-100 transition-colors"
          >
            <img
              src={`https://flagcdn.com/w40/${selectedCountryData.iso2}.png`}
              alt={selectedCountryData.name}
              className="w-5 h-auto object-contain rounded-sm"
            />
            <span className="text-[14px] font-medium text-[#0a0a0a]">
              +{selectedCountryData.dialCode}
            </span>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isDropdownOpen && "rotate-180")} />
          </button>

          {/* Custom Dropdown List */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-[#d3d3d3] rounded-lg shadow-xl z-[100]">
              {defaultCountries.map((c) => {
                const countryData = parseCountry(c);
                return (
                  <button
                    key={countryData.iso2}
                    type="button"
                    onClick={() => {
                      setCountry(countryData.iso2);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors",
                      countryData.iso2 === selectedCountryData.iso2 && "bg-gold/5"
                    )}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${countryData.iso2}.png`}
                      alt={countryData.name}
                      className="w-5 h-auto"
                    />
                    <span className="flex-1 text-[14px] text-gray-700">{countryData.name}</span>
                    <span className="text-[13px] text-gray-400">+{countryData.dialCode}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder={placeholder}
          className="flex-1 h-full px-4 text-[14px] text-[#0a0a0a] bg-transparent outline-none border-none placeholder:text-gray-400"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
