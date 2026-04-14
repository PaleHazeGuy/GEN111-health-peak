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
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{
            width: `${width}%`,
            background: color,
            transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
          }}
          className="h-full rounded-full"
        />
      </div>
      <span className="text-xs text-muted w-7 text-right">{value}</span>
    </div>
  );
}
