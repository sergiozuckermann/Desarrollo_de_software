import { ReactNode } from "react";

// Button component
const Button = (
  { onClick, children, className = '', style = {} }: {
    onClick: () => void,
    children: ReactNode,
    className?: string,
    style?: object
  }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center border-none bg-transparent hover-shrink-button ${className}`}
      style={{ cursor: 'pointer', background: 'none', ...style }} 
    >
      {children}
    </button>
  );
};

export default Button;
