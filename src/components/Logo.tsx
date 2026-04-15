import { useLocale } from "../hooks/useLocale";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "lg" }: LogoProps) {
  const { t } = useLocale();

  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-[clamp(3rem,12vw,5rem)]",
  };

  return (
    <h1
      className={`font-fredoka ${sizes[size]} font-bold leading-none text-dark tracking-tight`}
    >
      {t.title.name1}
      <span className="text-primary">{t.title.name2}</span>
    </h1>
  );
}
