import { FunctionComponent } from "react";
import FrameComponent from "../components/FrameComponent";
import CCPComponent from "../components/CCPComponent";
import Chatbot from "../components/Chatbot";

const AgentHome: FunctionComponent = () => {

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[7px] box-border gap-[30px] tracking-[normal]">
      <main className="self-stretch flex flex-col items-start justify-start gap-[13px] max-w-full">
        <FrameComponent />
        <section className="self-stretch flex flex-row items-start justify-start py-0 pr-[41px] pl-[34px] box-border max-w-full text-center text-21xl text-black font-paragraph">
          <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[19px] max-w-full">
            <div className="h-[636px] w-[407px] flex flex-col items-start justify-start pt-[22px] px-0 pb-0 box-border max-w-full">
              {/* <img
                className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-3xs"
                loading="lazy"
                alt=""
                src="/image-15@2x.png"
              /> */}

              {/* add Amazon connect CCP for the agent to receive calls */}
            <CCPComponent />
          </div>
            <div className="flex-1 flex flex-col items-center justify-center py-0 pr-1.5 pl-0 box-border gap-[22px] min-w-[325px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
                <div className="flex flex-col items-start justify-start flex-1 max-w-full">
                  <div className="flex-1 flex flex-col items-center justify-center min-w-[100%] max-w-full text-left text-xl font-roboto">
                    <Chatbot /> 
                  </div> 
                </div>
              </div>
            </div>
            <div className="h-[532px] w-[260px] flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border text-lg text-primary">
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[14px]">
                <div className="self-stretch flex-1 rounded-3xs bg-tertiary flex flex-col items-end justify-start pt-3.5 px-0 pb-[19px] gap-[9px] border-[1px] border-solid border-marco">
                  <div className="self-stretch h-[402px] relative rounded-3xs bg-tertiary box-border hidden border-[1px] border-solid border-marco" />
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[15px] pl-5">
                    <div className="flex-1 relative z-[1]">
                      Total time on call:
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[15px] pl-5 text-marco">
                    <div className="flex-1 relative whitespace-nowrap z-[1]">
                      00:00:00
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[17px] pl-[18px]">
                    <div className="flex-1 relative z-[1]">Talk time:</div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[18px] pl-[17px] text-marco">
                    <div className="flex-1 relative whitespace-nowrap z-[1]">
                      00:00:00
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[17px] pl-[18px]">
                    <div className="flex-1 relative z-[1]">Hold time:</div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[17px] pl-[18px] text-marco">
                    <div className="flex-1 relative whitespace-nowrap z-[1]">
                      00:00:00
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-end justify-start pt-0 px-0 pb-1 gap-[7px]">
                    <div className="self-stretch relative z-[1]">
                      After Call work time:
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[17px] pl-[18px] text-marco">
                      <div className="flex-1 relative whitespace-nowrap z-[1]">
                        00:00:00
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[29px] pl-[31px]">
                    <button className="cursor-pointer [border:none] py-3.5 px-[47.5px] bg-forestgreen-100 flex-1 rounded-3xs flex flex-row items-start justify-start whitespace-nowrap z-[1] hover:bg-forestgreen-200">
                      <div className="w-[105px] relative text-lg font-paragraph text-tertiary text-center inline-block min-w-[105px]">
                        Agent mood
                      </div>
                    </button>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-end py-0 px-[30px]">
                    <button className="cursor-pointer [border:none] py-3.5 px-[48.5px] bg-forestgreen-100 flex-1 rounded-3xs flex flex-row items-start justify-start whitespace-nowrap z-[1] hover:bg-forestgreen-200">
                      <div className="w-[103px] relative text-lg font-paragraph text-tertiary text-center inline-block min-w-[103px]">
                        Client mood
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-[156px] flex flex-row items-start justify-start py-0 px-[18px] box-border text-2xs text-black">
                  <div className="h-[92px] flex-1 relative">
                    <img
                      className="absolute top-[0px] left-[0px] w-[120px] h-[92px] z-[1]"
                      alt=""
                      src="/vector-1.svg"
                    />
                    <div className="absolute top-[22px] left-[18px] w-[84px] flex flex-row items-start justify-start">
                      <div className="h-6 flex-1 relative inline-block z-[2]">
                        Inhale for 4 seconds
                      </div>
                      <div className="h-[188px] w-[151px] absolute !m-[0] right-[-111px] bottom-[-170px]">
                        <div className="absolute top-[24px] left-[11px] rounded-[50%] w-[140px] h-[135px]" />
                        <div className="absolute top-[0px] left-[0px] w-full h-full z-[3]">
                          <img
                            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                            alt=""
                            src="/mexicana-logoremovebgpreview-1-1@2x.png"
                          />
                          <img
                            className="absolute h-[57.61%] w-[77.75%] top-[7.61%] right-[17.28%] bottom-[34.79%] left-[4.97%] max-w-full overflow-hidden max-h-full object-cover z-[1]"
                            loading="lazy"
                            alt=""
                            src="/5c54ffaa6210e5031ddf4b4320271804dibujosanimadosdeauriculares-1-1@2x.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="self-stretch bg-tertiary flex flex-row items-start justify-center py-2.5 px-5 text-center text-lg text-primary font-paragraph">
        <div className="w-[182px] relative flex items-center justify-center whitespace-nowrap">
          29/02/2024 15:00:43
        </div>
      </footer>
    </div>
  );
};

export default AgentHome;

