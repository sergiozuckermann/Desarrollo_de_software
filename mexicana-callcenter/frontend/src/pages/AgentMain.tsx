import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons";
import GradientButton from "../components/CallingButton"; 
import WorkerCard from '../components/WorkerCard';

const handleMetricsButton = () => {
  window.location.href = '/Metrics'; 
};
const handleAgentSpotlightButton = () => {
  window.location.href = '/AgentSpotlight'; 
};
const handleBadgeButton = () => {
  window.location.href = '/badges'; 
};

const handleBreaksButton = () => {
  window.location.href = '/Breaks'; 
};
const handleCallingButton = () => {
    window.location.href = '/agent/workspace'; 
  };


const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonMode(prevMode => prevMode === 'workspace' ? 'calling' : 'workspace');
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-1 w-90% h-[90%] inset-y-1/2 items-center content-center ">
      <div className="flex flex-col col-span-12 md:col-span-4">
        <WorkerCard  name="Ana Gabriel Martínez" position="Agent" years={2} points={200} status="Active" />
      </div>
      <div className="flex flex-col col-span-12 md:col-span-8">
        <div className="flex-1 p-8 border-2 border-gray-400 bg-tertiary border-black-500 home-button rounded-xl">
          <div className="grid h-full gap-8 mx-auto md:grid-cols-2">
            <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={handleMetricsButton}/>
            <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={handleAgentSpotlightButton}/>
            <HomeButton icon="/BadgesSymbol.svg" title="My Badges" subtitle="See all the awards and badges earned" handleClick={handleBadgeButton} />
            <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={handleBreaksButton}/>
          </div>
        </div>
        <GradientButton text="Call Next Customer"
           mode={buttonMode}
           handleClick={handleCallingButton} />  
    </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <PageStructure title="Home">
      <MainContent />
    </PageStructure>
  );
};

export default HomePage;