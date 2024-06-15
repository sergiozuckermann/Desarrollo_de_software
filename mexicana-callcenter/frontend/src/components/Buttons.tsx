import { CSSProperties, FC, ReactNode } from 'react';

// Definition of the properties that the Button component can receive
interface ButtonProps {
  onClick: () => void;        // Callback function to handle the click event
  children: ReactNode;        // Button content
  className?: string;         // CSS class (optional class --> button styles)
  style?: CSSProperties;      // CSS styles (optional styles --> button styles)
}

// Definition of the Button component as a Functional Component (FC) that accepts the properties defined in ButtonProps
const Button: FC<ButtonProps> = ({ onClick, children, className = '', style = {} }) => {
  return (
    <button
      onClick={onClick}   // Assigns the onClick function passed as a property to the button's onClick event
      className={`flex items-center border-none bg-transparent hover-shrink-button ${className}`} // CSS classes for the button
      style={{ cursor: 'pointer', background: 'none', ...style }} // CSS styles for the button, combining passed styles and default styles
    >
      {children}    
    </button> // Button content passed as children
  );
};

export default Button; 
