import { CSSProperties, FC, ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<ButtonProps> = ({ onClick, children, className = '', style = {} }) => {
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
