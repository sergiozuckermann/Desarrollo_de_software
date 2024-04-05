import { FunctionComponent } from "react";
import FrameComponent1 from "../components/HelloFrameComponent1";
import FrameComponent from "../components/HelloFrameComponent";

const Hello: FunctionComponent = () => {
  return (
    <div className="flex flex-col bg-white">
      <div className="ml-[-1130.5px] w-[269px] flex flex-col items-start justify-start pt-[547px] px-0 pb-0 box-border mq750:pt-[356px] mq750:box-border">
        <div className="self-stretch flex flex-row items-start justify-between py-2 pr-0 pl-[34px] relative shrink-0 [debug_commit:f6aba90]">
          <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]">
            <img
              className="absolute h-full w-[74.35%] top-[0px] right-[25.65%] bottom-[0px] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
              loading="lazy"
              alt=""
              src= "/callCenterLogo.png" 
            />
            <span className="text-xl">Call Center</span>
          </div>
          
          <div className="h-[22px] w-[95px] relative inline-block z-[1]">
            Call Center
          </div>
          <div className="h-[59px] w-[59px] relative z-[1]">
            <img
              className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src="/callCenterLogo.png"
            />
            <img
              className="absolute h-[57.63%] w-[77.8%] top-[7.63%] right-[17.29%] bottom-[34.75%] left-[4.92%] max-w-full overflow-hidden max-h-full object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/callCenterLogo.png"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen">
      <FrameComponent1 />

      <div className="flex-grow flex flex-col items-center justify-center overflow-hidden">
        <FrameComponent />
      </div>
    </div>
      <main className="h-[750px] w-full absolute !m-[0] right-[0px] bottom-[0px] left-[0px]">
        <img
          className="absolute top-[0px] left-[653px] w-[969.8px] h-[1020.3px] object-contain z-[1]"
          alt=""
          src="/vector.svg"
        />
        <img
          className="absolute top-[18px] left-[700px] w-[969.8px] h-[1020.3px] object-contain z-[2]"
          alt=""
          src="/vector.svg"
        />
        <img
          className="absolute top-[343px] left-[-286px] w-[925.9px] h-[743.7px] object-contain z-[1]"
          alt=""
          src="/vector.svg"
        />
        <img
          className="absolute top-[267px] left-[-334px] w-[1082.9px] h-[919.1px] object-contain z-[3]"
          alt=""
          src="/vector.svg"
        />
      </main>
    </div>
  );
};

export default Hello;
