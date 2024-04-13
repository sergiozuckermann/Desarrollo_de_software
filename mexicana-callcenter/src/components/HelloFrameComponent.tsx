import { FunctionComponent } from "react";

const FrameComponent: FunctionComponent = () => {

  const handleSignInClick = () => {
    console.log('Sign in clicked');
    window.location.href = '/signin'; 
  };

  const handleSignUpClick = () => {
    window.location.href = '/signup'; 
  };

  return (
    <div className="frameComponent-container flex flex-row items-center justify-center py-0 box-border max-w-full text-center text-primary font-paragraph">
    <div className="w-[625px] flex flex-col items-center justify-center max-w-full">
      <div className="flex flex-row items-center justify-center py-0 px-[30px] box-border max-w-full">
        <h1 
          style={{ fontSize: '10rem' }} 
          className="frameComponent-header m-0 relative text-inherit font-bold font-inherit inline-block max-w-full"
        >
          Hello!
        </h1>
      </div>

      <div className="frameComponent-buttons self-stretch flex flex-row items-center justify-center">
      <button 
        className="frameComponent-button cursor-pointer py-2.5 px-5 flex-1 rounded-3xs flex items-center justify-center box-border w-full md:min-w-[195px] whitespace-nowrap"
        onClick={handleSignInClick}
      >
        Sign in
      </button>
      <button 
        className="frameComponent-button cursor-pointer py-2.5 px-5 flex-1 rounded-3xs flex items-center justify-center box-border w-full md:min-w-[195px] whitespace-nowrap"
        onClick={handleSignUpClick}
      >
        Sign up
      </button>

      </div>
    </div>
  </div>

  );
};

export default FrameComponent;