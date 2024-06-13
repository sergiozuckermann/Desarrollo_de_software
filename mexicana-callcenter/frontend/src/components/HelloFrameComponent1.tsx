// Landing page header component

// import the FunctionComponent type
import { FunctionComponent } from "react";

// define the FrameComponent1 component
const FrameComponent1: FunctionComponent = () => {
  return (
    // JSX component
    <header className="fixed top-0 w-full flex items-center justify-between p-[15px] bg-tertiary">
      {/* Call Center Logo */}
      <img
        className="object-contain header-img" 
        alt="Call Center Logo"
        src="/newLogo_LIGHT_1.png"
      />
    </header>
  );
};

export default FrameComponent1;

