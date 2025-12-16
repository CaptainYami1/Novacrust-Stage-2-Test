import  type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type,
  ...rest
}: ButtonProps) {
  const variantStyle =
    {
      primary: "bg-primary text-[#E6FBF2]",
      secondary: "text-primary",
    }[variant];

  return (
    <button
      type={type}
      className={`w-full rounded-[30px] py-5 px-10 text-center font-bold text-[16px] instrument-font ${variantStyle} `}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
