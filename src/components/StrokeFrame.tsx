interface StrokeFrameProps {
  size?: number;
  children?: React.ReactNode;
}

export default function StrokeFrame({ size = 80, children }: StrokeFrameProps) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 14,
      background: "#ede9ff",
      border: "2px dashed #c4b5fd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}
