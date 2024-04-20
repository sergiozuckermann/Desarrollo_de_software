import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import GradientButton from "../components/CallingButton";
import WorkerCard from '../components/WorkerCard';

const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonMode(prevMode => prevMode === 'workspace' ? 'calling' : 'workspace');
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 md:grid-cols-12">
      <div className="md:col-span-4">
        <WorkerCard name="Ana Gabriel Martínez" position="Agent" years={2} points={200} status="Active" />
      </div>
      <div className="flex flex-col space-y-4 md:col-span-8">
  <div className="flex flex-col gap-10">
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={() => window.location.href = '/Metrics'}/>
      <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/AgentSpotlight'}/>
      <HomeButton icon="/BadgesSymbol.svg" title="My Badges" subtitle="See all the awards and badges earned" handleClick={() => window.location.href = '/badges'}/>
      <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/Breaks'}/>
    </div>
    <GradientButton mode={buttonMode} handleClick={() => window.location.href = '/agent/workspace'} />
  </div>
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
