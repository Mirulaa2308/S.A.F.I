import { createContext, useContext, useState, type ReactNode } from 'react'

export type LangCode = 'en' | 'hi' | 'ta' | 'te' | 'ml' | 'kn' | 'bn' | 'mr' | 'gu' | 'pa' | 'od' | 'as'

export interface Language {
  code: LangCode
  label: string
  nativeLabel: string
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'od', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
]

// Minimal UI string translations for the nav/shell. Page content would fetch from API in production.
export const UI_STRINGS: Record<string, Record<LangCode, string>> = {
  searchScheme: {
    en: 'Search Scheme', hi: 'योजना खोजें', ta: 'திட்டம் தேடு', te: 'పథకం శోధించండి',
    ml: 'പദ്ധതി തിരയുക', kn: 'ಯೋಜನೆ ಹುಡುಕಿ', bn: 'প্রকল্প খুঁজুন', mr: 'योजना शोधा',
    gu: 'યોજના શોધો', pa: 'ਯੋਜਨਾ ਲੱਭੋ', od: 'ଯୋଜନା ଖୋଜ', as: 'আঁচনি বিচাৰক',
  },
  schemes: {
    en: 'Schemes', hi: 'योजनाएँ', ta: 'திட்டங்கள்', te: 'పథకాలు',
    ml: 'പദ്ധതികൾ', kn: 'ಯೋಜನೆಗಳು', bn: 'প্রকল্প', mr: 'योजना',
    gu: 'યોજનાઓ', pa: 'ਯੋਜਨਾਵਾਂ', od: 'ଯୋଜନା', as: 'আঁচনিসমূহ',
  },
  calculator: {
    en: 'Calculator', hi: 'कैलकुलेटर', ta: 'கணிப்பான்', te: 'కాల్క్యులేటర్',
    ml: 'കാൽക്കുലേറ്റർ', kn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್', bn: 'ক্যালকুলেটর', mr: 'कॅल्क्युलेटर',
    gu: 'કેલ્ક્યુલેટર', pa: 'ਕੈਲਕੁਲੇਟਰ', od: 'କ୍ୟାଲ୍କୁଲେଟର', as: 'কেলকুলেটৰ',
  },
  partners: {
    en: 'Partners', hi: 'भागीदार', ta: 'பங்காளர்கள்', te: 'భాగస్వాములు',
    ml: 'പങ്കാളികൾ', kn: 'ಪಾಲುದಾರರು', bn: 'অংশীদার', mr: 'भागीदार',
    gu: 'ભાગીદારો', pa: 'ਸਾਂਝੇਦਾਰ', od: 'ଅଂଶୀଦାର', as: 'অংশীদাৰ',
  },
  login: {
    en: 'Login', hi: 'लॉगिन', ta: 'உள்நுழைய', te: 'లాగిన్',
    ml: 'ലോഗിൻ', kn: 'ಲಾಗಿನ್', bn: 'লগইন', mr: 'लॉगिन',
    gu: 'લૉગિન', pa: 'ਲੌਗਿਨ', od: 'ଲଗଇନ', as: 'লগইন',
  },
  findMyScheme: {
    en: 'Search Scheme', hi: 'योजना खोजें', ta: 'திட்டம் தேடு', te: 'పథకం శోధించండి',
    ml: 'പദ്ധതി തിരയുക', kn: 'ಯೋಜನೆ ಹುಡುಕಿ', bn: 'প্রকল্প খুঁজুন', mr: 'योजना शोधा',
    gu: 'યોજના શોધો', pa: 'ਯੋਜਨਾ ਲੱਭੋ', od: 'ଯୋଜନା ଖୋଜ', as: 'আঁচনি বিচাৰক',
  },
}

export function t(key: string, lang: LangCode): string {
  return UI_STRINGS[key]?.[lang] ?? UI_STRINGS[key]?.['en'] ?? key
}

interface LanguageContextType {
  lang: LangCode
  setLang: (l: LangCode) => void
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>('en')
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}
