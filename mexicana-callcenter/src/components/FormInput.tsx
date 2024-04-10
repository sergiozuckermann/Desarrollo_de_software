import React from 'react';
import { FormInputProps } from "../types";

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
  const inputStyle = {
    paddingRight: '3rem',
  };

  return (
    <div className="relative mb-4">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <div className="flex items-center border-2 border-gray-300 rounded-lg text-base sm:text-lg md:text-xl w-full">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`py-2 px-3 w-full text-base sm:text-lg md:text-xl rounded-lg border-2 border-gray-300 pr-12 pl-4`}
          style={inputStyle}
        />
        {icon && (
          <div
            onClick={onIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            <img
              src={icon}
              alt="Toggle visibility"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
