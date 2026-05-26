import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

function toPascal(slug: string) {
  return slug
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

function isUrl(name: string) {
  return /^(https?:\/\/|\/|data:)/i.test(name);
}

export function MarkerIcon({ name, className, style, ...props }: { name: string } & LucideProps) {
  if (name && isUrl(name)) {
    return (
      <img
        src={name}
        alt=""
        className={className as string | undefined}
        style={{
          objectFit: "contain",
          transform: "scale(1.6)",
          mixBlendMode: "multiply",
          ...(style as React.CSSProperties),
        }}
      />
    );
  }
  const key = toPascal(name);
  const Icon = ((Lucide as unknown as Record<string, React.ComponentType<LucideProps>>)[key]) ?? Lucide.Circle;
  return <Icon className={className} style={style} {...props} />;
}

/** Curated list of icons useful as product markers. */
export const MARKER_ICON_OPTIONS = [
  "wheat-off",
  "wheat",
  "milk-off",
  "milk",
  "candy-off",
  "candy",
  "leaf",
  "sprout",
  "salad",
  "apple",
  "carrot",
  "fish",
  "beef",
  "egg",
  "nut-off",
  "flame",
  "snowflake",
  "heart",
  "star",
  "check",
  "circle",
];
