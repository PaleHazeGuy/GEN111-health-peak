import { useEffect, useState } from "react";

interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

export default function StatBar({ label, value, color }: StatBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: "0.82rem", color: "#6b6b8a", width: 65, flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 8, background: "#f1f1f7", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: color,
          borderRadius: 4,
          transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
      <span style={{ fontSize: "0.78rem", color: "#9999bb", width: 28, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
