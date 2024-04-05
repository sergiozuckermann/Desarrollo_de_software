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
    <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px] box-border max-w-full text-center text-primary font-paragraph">
      <div className="w-[625px] flex flex-col items-start justify-start max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[30px] pl-[29px] box-border max-w-full">
          <h1 
            style={{ fontSize: '10rem' }} // Adjust the font-size as needed
            className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full"
          >
            Hello!
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[25px] mq750:flex-wrap">
          <button 
            className="cursor-pointer [border:none] py-2.5 px-5 bg-primary flex-1 rounded-3xs flex items-center justify-center box-border w-full md:min-w-[195px] whitespace-nowrap hover:bg-slategray"
            onClick={handleSignInClick}
          >
            <span className="text-lg font-paragraph text-tertiary text-center">
              Sign in
            </span>
          </button>
          <button 
            className="cursor-pointer [border:none] py-2.5 px-5 bg-primary flex-1 rounded-3xs flex items-center justify-center box-border w-full md:min-w-[195px] whitespace-nowrap hover:bg-slategray"
            onClick={handleSignUpClick}
          >
            <span className="text-lg font-paragraph text-tertiary text-center">
              Sign up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;