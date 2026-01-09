import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { EStorageKeys } from '@/shared/constants/storage';

import en from './locales/en.json';
import ru from './locales/ru.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: en.common,
    auth: en.auth,
    navigation: en.navigation,
    validation: en.validation,
    generate: en.generate,
    wizard: en.wizard,
  },
  ru: {
    common: ru.common,
    auth: ru.auth,
    navigation: ru.navigation,
    validation: ru.validation,
    generate: ru.generate,
    wizard: ru.wizard,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: EStorageKeys.I18nextLng,
    },
  });

export default i18n;
