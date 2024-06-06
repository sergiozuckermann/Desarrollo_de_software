import { FunctionComponent } from "react";
import { useAuth } from "../hooks/useAuth";

const FrameComponent: FunctionComponent = () => {
  const { logout } = useAuth()
  return (
    <header className="self-stretch bg-tertiary flex flex-row items-start justify-between pt-[15px] pb-2.5 pr-[41px] pl-2.5 box-border top-[0] z-[99] sticky max-w-full gap-[20px] text-center text-lg text-black font-paragraph">
      <div className="h-[100px] w-[1280px] relative bg-tertiary hidden max-w-full" />
      <div className="w-[269px] flex flex-row items-start justify-start py-2 pr-0 pl-[34px] box-border relative gap-[81px] z-[1] mq450:gap-[81px_40px]">
        <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]">
          <img
            className="absolute h-full w-[74.35%] top-[0px] right-[25.65%] bottom-[0px] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            loading="lazy"
            alt=""
            src="/image-12@2x.png"
          />
        </div>
        <div className="flex-1 relative inline-block min-w-[95px] whitespace-nowrap z-[1]">
          Call Center
        </div>
        <div className="h-[59px] w-[59px] relative z-[1]">
          <img
            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/mexicana-logoremovebgpreview-1@2x.png"
          />
          <img
            className="absolute h-[57.63%] w-[77.8%] top-[7.63%] right-[17.29%] bottom-[34.75%] left-[4.92%] max-w-full overflow-hidden max-h-full object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/5c54ffaa6210e5031ddf4b4320271804dibujosanimadosdeauriculares-1@2x.png"
          />
        </div>
      </div>
      <div className="h-[73px] w-[339px] relative max-w-full text-right text-41xl text-primary">
        <img
          className="absolute top-[13px] left-[44px] w-[45.5px] h-[49.4px] z-[2]"
          loading="lazy"
          alt=""
          src="/vector.svg"
        />
        <img
          className="absolute top-[9px] left-[109px] w-px h-[58px] object-contain z-[2]"
          loading="lazy"
          alt=""
        />
        <h1 className="m-0 absolute top-[0px] left-[0px] text-inherit font-medium font-inherit inline-block w-full whitespace-nowrap h-full z-[1]">
          On Call
        </h1>
      </div>
        <button onClick={() => logout()}>Logout</button>
    </header>
  );
};

export default FrameComponent;
