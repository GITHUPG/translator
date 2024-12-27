import { useState } from 'react';
import { translateText } from '../services/translator';

export function useTranslation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async (
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<string> => {
    if (!text.trim()) return '';
    
    setIsLoading(true);
    setError(null);

    try {
      const result = await translateText(text, sourceLang, targetLang);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed. Please try again.';
      setError(errorMessage);
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  return { translate, isLoading, error };
}