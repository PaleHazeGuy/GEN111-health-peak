import { en } from "./en";
import { th } from "./th";
import type { Language } from "../types";

export const locales = { en, th };

export type Locale = typeof en;

export function getLocale(lang: Language): Locale {
  return locales[lang];
}
