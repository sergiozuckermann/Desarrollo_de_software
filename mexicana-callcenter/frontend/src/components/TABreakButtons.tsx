import React from 'react';

interface TABreakButtonsProps {
  picture: string; 
  title: string;
  handleClick: () => void;
}

const TABreakButtons: React.FC<TABreakButtonsProps> = ({ picture, title, handleClick }) => {
  return (
    <button className="flex items-center px-20 py-16 space-x-2 font-light  transition-colors duration-300 ease-in-out shadow-md bg-[#D9D9D9] font-roboto rounded-3xs text-primary hover:text-white hover:bg-primary " onClick={handleClick} >
        <div className="flex flex-col justify-center items-center ">
            <img src={picture} alt="Pic" className="w-[250px] h-[250px]  " />
            <div className=" text-2xl font-medium text-left ml-4 mt-10">{title}</div> 
        </div>
    </button>
  );
};

export default TABreakButtons;