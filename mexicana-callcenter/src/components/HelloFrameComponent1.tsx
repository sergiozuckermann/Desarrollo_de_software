import { FunctionComponent } from "react";

const FrameComponent1: FunctionComponent = () => {
  return (
    <header className="w-full flex items-center justify-between p-[15px] bg-tertiary shadow-md sticky top-0 z-50">
        <img
          className="object-contain" 
          style={{ height: '50px' }} 
          loading="lazy"
          alt="Call Center Logo"
          src="/callCenterLogo.png"
        />
    </header>
  );
};

export default FrameComponent1;
