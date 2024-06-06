import React from 'react';

interface TABreakButtonsProps {
  picture: string; 
  title: string;
  handleClick: () => void;
}

const TABreakButtons: React.FC<TABreakButtonsProps> = ({ picture, title, handleClick }) => {
  return (
    <button className="flex items-center px-12 py-12 space-x-2 font-light transition-colors duration-300 ease-in-out shadow-md bg-[#D9D9D9] font-roboto rounded-3xs text-primary hover:text-white hover:bg-primary dark:bg-primary dark:text-white dark:hover:text-black dark:hover:opacity-40" onClick={handleClick} >
        <div className="flex flex-col justify-center items-center ">
            <img src={picture} alt="Pic" className="w-[250px] h-[250px]" />
            <div className=" text-2xl font-medium mt-2 whitespace-nowrap">{title}</div> 
        </div>
    </button>
  );
};

export default TABreakButtons;