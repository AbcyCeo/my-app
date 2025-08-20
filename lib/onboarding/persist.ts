import type { OnboardingPrefs } from '@/types/onboarding';
const KEY = 'onboarding:prefs';
export const savePrefs = (prefs: OnboardingPrefs) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(prefs));
};
export const loadPrefs = (): OnboardingPrefs | null => {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
};
