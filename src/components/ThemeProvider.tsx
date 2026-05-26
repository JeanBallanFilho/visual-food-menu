import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTheme } from "@/lib/menu";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({ queryKey: ["theme"], queryFn: fetchTheme });

  useEffect(() => {
    if (!data) return;
    const root = document.documentElement;
    const set = (k: string, v: string) => root.style.setProperty(k, v);
    set("--background", data.background);
    set("--foreground", data.foreground);
    set("--primary", data.primary_color);
    set("--primary-foreground", data.primary_foreground);
    set("--accent", data.accent);
    set("--accent-foreground", data.accent_foreground);
    set("--muted", data.muted);
    set("--border", data.border);
  }, [data]);

  return <>{children}</>;
}
