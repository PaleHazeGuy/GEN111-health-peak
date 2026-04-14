interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline" | "gradient";
  className?: string;
}

export default function Button({ children, onClick, disabled, variant = "primary", className = "" }: ButtonProps) {
  const base = "w-full py-4 rounded-2xl font-semibold text-base cursor-pointer transition-all duration-200 font-sans disabled:opacity-40 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-dark text-white hover:opacity-85",
    outline: "border-2 border-dark text-dark bg-white hover:bg-gray-50",
    gradient: "text-white hover:opacity-85",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "gradient" ? { background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" } : {}}
    >
      {children}
    </button>
  );
}
