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
      <div className={`relative mb-4`}>
        <label htmlFor={name} className="sr-only">
          {placeholder}
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg text-lg w-full">
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            className="border-2 border-gray-300 rounded-lg py-3 px-4 w-full text-lg pr-12 pl-4 ${className}"
            style={inputStyle}
          />
          {icon && (
            <div
              onClick={onIconClick}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            >
              <img
                src={icon}
                alt="Toggle visibility"
                className="h-6 w-6"
              />
            </div>
          )}
        </div>
      </div>
    );
  };
export default FormInput;