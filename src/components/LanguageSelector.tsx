import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  languages: Language[];
  label: string;
}

export function LanguageSelector({ value, onChange, languages, label }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}