import { useEffect, useState } from "react";
import { type Lang, detectBrowserLang } from "@/lib/i18n";

const KEY = "bravo-lang";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem(KEY)) as Lang | null;
    setLangState(stored ?? detectBrowserLang());
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof localStorage !== "undefined") localStorage.setItem(KEY, l);
  };
  return [lang, setLang];
}
