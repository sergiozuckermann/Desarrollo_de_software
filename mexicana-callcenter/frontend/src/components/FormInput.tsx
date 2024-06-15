/*
 * FormInput Component: This component renders a customizable input field for forms. 
 * It supports different input types, placeholders, and icons. Additionally, it allows 
 * for handling changes and icon clicks through passed-in event handlers.
 */

import React from 'react';

// Define the props for the FormInput component
interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  onIconClick?: () => void;
}

// Create the FormInput component
const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  name,
  required,
  value,
  onChange,
  icon,
  onIconClick,
}) => {
  // Define inline style for the input to accommodate icon space
  const inputStyle = {
    paddingRight: '3rem',
  };

  // Render the FormInput component
  return (
    <div className="relative mb-4">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <div className="flex items-center w-full text-base rounded-lg sm:text-lg md:text-xl">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 pl-4 pr-12 text-base border-2 border-gray-300 rounded-lg sm:text-lg md:text-xl"
          style={inputStyle}
        />
        {icon && (
          <div
            onClick={onIconClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            <img
              src={icon}
              alt="Toggle visibility"
              className="w-5 h-5 sm:h-6 sm:w-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;