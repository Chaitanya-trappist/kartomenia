import React from 'react';
import { Zap } from 'lucide-react';

const MagneticButton = ({ 
  children = "BOOK YOUR RACE", 
  onClick, 
  href = null,
  target = "_blank",
  rel = "noreferrer",
  className = "", 
  showIcon = true,
  icon: CustomIcon = Zap,
  variant = "orange"
}) => {
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return 'bg-[#0A0A0A] hover:bg-[#F47C20] text-white shadow-md hover:shadow-xl';
    }
    if (variant === 'outline') {
      return 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm';
    }
    return 'bg-[#F47C20] hover:bg-[#E0670E] text-white shadow-[0_0_25px_rgba(244,124,32,0.35)] hover:shadow-[0_0_35px_rgba(244,124,32,0.5)]';
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-widest
    transition-all duration-200 cursor-pointer text-decoration-none select-none
    ${getVariantStyles()}
    ${className}
  `;

  const innerContent = (
    <>
      {showIcon && CustomIcon && <CustomIcon className="w-4 h-4 fill-current shrink-0" />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
    >
      {innerContent}
    </button>
  );
};

export default MagneticButton;
