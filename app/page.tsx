'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { savePrefs, loadPrefs } from '@/lib/onboarding/persist';
import type { LanguageCode, Region } from '@/types/onboarding';

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'Русский' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'other', label: 'Other' },
];

const regions: Region[] = [
  'Khomas','Erongo','Oshana','Oshikoto','Ohangwena','Otjozondjupa',
  'Kunene','Omusati','Kavango East','Kavango West','Omaheke','Hardap',
  'Karas','Zambezi','other'
];

export default function Home() {
  const r = useRouter();
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [region, setRegion] = useState<Region>('Khomas');

  useEffect(() => {
    const cached = loadPrefs();
    if (cached) { setLanguage(cached.language); setRegion(cached.region); }
  }, []);

  const onContinue = () => {
    savePrefs({ language, region });
    r.push('/eligibility');
  };

  return (
    <main className="min-h-dvh flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-indigo-100">
            <Image src="/peka.png" alt="Peka" fill priority className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Hi, I’m Peka 👋</h1>
            <p className="text-gray-600">Let’s set your language and region to personalize the experience.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-700">Language</span>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              value={language}
              onChange={e => setLanguage(e.target.value as LanguageCode)}
            >
              {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Region</span>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              value={region}
              onChange={e => setRegion(e.target.value as Region)}
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onContinue}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>

        <p className="text-xs text-gray-500">You can change these later in Settings.</p>
      </div>
    </main>
  );
}
