import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import SupervisorButton from "../components/SupervisorButton";
import WorkerCard from '../components/WorkerCard';
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'


const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');
  const [userInfo, setUserInfo] = useState<object | null>(null);
  const { username } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonMode(prevMode => prevMode === 'workspace' ? 'calling' : 'workspace');
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // execute call to backend url to fetch info of the user
  useEffect(() => {
    // obtain user information
    axios
      .get(`http://localhost:3000/Supervisor/myinfo/${username}`)
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.log(error))

  }, [])
  return (
    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 md:grid-cols-12">
      <div className="md:col-span-4">
        { userInfo !== null ? <WorkerCard name={userInfo.name} position={userInfo.position} years={userInfo.experience} points={200} status="Active" /> : null}
      </div>
      <div className="flex flex-col space-y-4 md:col-span-8">
  <div className="flex flex-col gap-10">
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={() => window.location.href = '/Metrics'}/>
      <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/AgentSpotlight'}/>
      <HomeButton icon="/costumer.svg" title="Custumer Service" subtitle="See the metrics for the costumer service surveys" handleClick={() => window.location.href = '/CustomerService'}/>
      <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/Breaks'}/>
    </div>
    <SupervisorButton handleClick={() => window.location.href = '/supervisor/onGoingCalls'} />
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

