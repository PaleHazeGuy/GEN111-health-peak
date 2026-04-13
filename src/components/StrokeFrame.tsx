interface StrokeFrameProps {
  size?: number;
  children?: React.ReactNode;
}

export default function StrokeFrame({ size = 80, children }: StrokeFrameProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-2xl bg-purple-50 border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden shrink-0"
    >
      {children}
    </div>
  );
}
