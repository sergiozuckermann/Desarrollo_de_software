import { FunctionComponent } from "react";

const FrameComponent1: FunctionComponent = () => {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between p-[15px] bg-tertiary shadow-md">
      <img
        className="object-contain header-img" 
        alt="Call Center Logo"
        src="/newLogo_LIGHT_1.png"
      />
    </header>
  );
};

export default FrameComponent1;

