interface StrokeFrameProps {
  size?: number;
  children?: React.ReactNode;
}

export default function StrokeFrame({ size = 80, children }: StrokeFrameProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-2xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden shrink-0 relative"
    >
      {children}
    </div>
  );
}
