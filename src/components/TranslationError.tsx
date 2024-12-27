import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TranslationErrorProps {
  message: string;
}

export function TranslationError({ message }: TranslationErrorProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700">
      <AlertCircle className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}