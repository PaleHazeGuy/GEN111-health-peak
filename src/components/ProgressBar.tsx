interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          }}
        />
      </div>
      <span className="text-xs font-semibold text-muted shrink-0">
        {current}/{total}
      </span>
    </div>
  );
}
