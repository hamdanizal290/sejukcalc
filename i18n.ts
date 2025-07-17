// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './backend/translations';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en', //default
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
