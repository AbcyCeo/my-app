export type LanguageCode = 'en' | 'pt' | 'fr' | 'de' | 'es' | 'af' | 'zh' | 'ar' | 'ru' | 'hi' | 'other';
export type Region =
  | 'Khomas' | 'Erongo' | 'Oshana' | 'Oshikoto' | 'Ohangwena' | 'Otjozondjupa'
  | 'Kunene' | 'Omusati' | 'Kavango East' | 'Kavango West' | 'Omaheke' | 'Hardap'
  | 'Karas' | 'Zambezi' | 'other';
export interface OnboardingPrefs { language: LanguageCode; region: Region; }
