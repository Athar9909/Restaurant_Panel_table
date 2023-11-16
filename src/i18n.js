import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetecter from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetecter)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          learn: "Dashboard",
          desc: "  Edit",
        },
      },
      ar: {
        translation: {
          learn: "Dashyyyy",
          desc: "Ediuuu",
        },
      },
    },
  });
