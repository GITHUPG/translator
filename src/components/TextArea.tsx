import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  readOnly?: boolean;
}

export function TextArea({ value, onChange, placeholder, readOnly = false }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className="h-40 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
}