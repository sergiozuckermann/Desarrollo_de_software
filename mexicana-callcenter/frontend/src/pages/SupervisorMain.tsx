
import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import SupervisorButton from "../components/SupervisorButton";
import WorkerCard from '../components/WorkerCard';
import userService from "../services/user"
import { useAuth } from '../hooks/useAuth'
import { WorkerCardProps } from '../utils/interfaces';
import useCustomToast from "../components/LoginNotification";



const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');
  const [userInfo, setUserInfo] = useState<WorkerCardProps | null>(null);
  const { showError } = useCustomToast();
  const { role, username, logout } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonMode(prevMode => prevMode === 'workspace' ? 'calling' : 'workspace');
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // execute call to backend url to fetch info of the user
  useEffect(() => {
 
    userService
      .GetInfo(role!, username!) // call function that makes axios request
      .then((user) => setUserInfo(user)) // set userInfo state with the result from the request if it is successful
      .catch(error => {
        if(error.response.status === 401) { // check for an authorization error
            showError(error.response.data.error) // display error
            setTimeout(() => {logout()}, 4000) // log user out
        }
      })

  }, [])
  
  return (
    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 text-black transition-colors duration-500 bg-white md:grid-cols-12 dark:bg-gray-900 dark:text-white">
    <div className="md:col-span-4">
      { userInfo !== null ? 
      <WorkerCard 
        name={userInfo.name} 
        position={userInfo.position} 
        experience={userInfo.experience} 
        points={userInfo.points} 
        status="Active" /> : null}
    </div>
    <div className="flex flex-col space-y-4 md:col-span-8">
      <div className="flex flex-col gap-10">
        <div className="flex grid justify-center grid-cols-1 gap-4 md:grid-cols-2 md:col-span-2">
          <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the historical metrics of the call center" handleClick={() => window.location.href = '/supervisor/metrics'}/>
          <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/AgentSpotlight'}/>
          <HomeButton icon="/costumer.svg" title="Agent Performance" subtitle="See the weekly metrics of agent perfomance" handleClick={() => window.location.href = '/supervisor/AgentSpotlight'}/>
          <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/Breaks'}/>
          <div className="flex justify-center w-full md:col-span-2">
            <HomeButton icon="/Switch.svg" title="Agent Queue Transfer" subtitle="Transfer agents from one queue to another" handleClick={() => window.location.href = '/supervisor/agent-transfer'}/>
          </div>
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

