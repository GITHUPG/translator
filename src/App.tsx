import React, { useState } from 'react';
import { Languages, ArrowRightLeft } from 'lucide-react';
import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TranslationError } from './components/TranslationError';
import { languages } from './types/languages';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const { translate, isLoading, error } = useTranslation();

  const handleTranslate = async () => {
    const result = await translate(sourceText, sourceLang, targetLang);
    if (result) {
      setTranslatedText(result);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <Languages className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Text Translator</h1>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <LanguageSelector
                value={sourceLang}
                onChange={setSourceLang}
                languages={languages}
                label="Translate from"
              />
              <TextArea
                value={sourceText}
                onChange={setSourceText}
                placeholder="Enter text to translate..."
              />
            </div>

            <div>
              <LanguageSelector
                value={targetLang}
                onChange={setTargetLang}
                languages={languages}
                label="Translate to"
              />
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <TextArea
                  value={translatedText}
                  onChange={setTranslatedText}
                  placeholder="Translation will appear here..."
                  readOnly
                />
              )}
            </div>
          </div>

          {error && <TranslationError message={error} />}

          <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <button
              onClick={handleSwapLanguages}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Swap Languages
            </button>
            <button
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;