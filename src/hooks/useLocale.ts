//TODO make this shit sync with choose lang

import { getLocale } from "../locales";

export function useLocale() {
  const t = getLocale("en");
  return { t };
}
