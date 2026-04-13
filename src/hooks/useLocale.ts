import { getLocale } from "../locales";
import { useGame } from "./useGame";

export function useLocale() {
  const { language } = useGame();
  const t = getLocale(language);
  return { t };
}
