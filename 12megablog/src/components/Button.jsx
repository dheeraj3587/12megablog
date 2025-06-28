import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  variant = "primary",
  ...props
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white/90 hover:text-white";
      case "outline":
        return "bg-transparent border-2 border-gradient-to-r from-purple-500 to-cyan-500 text-white hover:bg-white/10";
      case "ghost":
        return "bg-transparent text-white/80 hover:text-white hover:bg-white/10";
      case "danger":
        return "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-red-500/25";
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-500/25";
      default:
        return "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-purple-500/25";
    }
  };

  const baseClasses =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm";
  const variantClasses = bgColor
    ? `${bgColor} ${textColor}`
    : getVariantClasses();

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      type={type}
      {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default Button;
