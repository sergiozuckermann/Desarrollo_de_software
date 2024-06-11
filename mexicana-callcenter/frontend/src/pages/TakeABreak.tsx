import React from 'react';
import PageStructure from "../components/PageStructure"
import TABreakButtons from "../components/TABreakButtons"
import { useAuth } from "../hooks/useAuth";

const TakeABreak = () => {
  const { role } = useAuth();
  const breathingExcerPath = role === 'Agent' ? '/agent/BreathingExcer' : '/supervisor/BreathingExcer';
  const moveYourBodyPath = role === 'Agent' ? '/agent/MoveYourBody' : '/supervisor/MoveYourBody';

  return (
    <PageStructure title="Take a Break">
      <div className="w-full h-full items-center justify-center overflow-y-auto lg:mt-36" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8 dark:text-white">We’re here for you</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center ml-4 mt-10">
          <div className="col-span-1">
            <TABreakButtons picture="/need_help_nbg.png" title="Contact help" handleClick={() => window.open('https://www.gob.mx/stps/articulos/conoce-el-programa-de-bienestar-emocional-en-el-trabajo', '_blank')} />
          </div>
          <div className="col-span-1">
            <TABreakButtons picture="/breathing_exc_nbg.png" title="Breathing exercises" handleClick={() => window.location.href = breathingExcerPath} />
          </div>
          <div className="col-span-1">
            <TABreakButtons picture="/move_body_nbg.png" title="Move your body" handleClick={() => window.location.href = moveYourBodyPath} />
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default TakeABreak;
