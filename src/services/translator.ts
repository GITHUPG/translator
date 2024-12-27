const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

interface MyMemoryResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  responseStatus: number;
  responseDetails: string;
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  try {
    const langPair = `${sourceLang}|${targetLang}`;
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Translation service unavailable');
    }

    const data: MyMemoryResponse = await response.json();
    
    if (data.responseStatus === 403) {
      throw new Error('Daily translation limit exceeded. Please try again tomorrow.');
    }
    
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }

    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}