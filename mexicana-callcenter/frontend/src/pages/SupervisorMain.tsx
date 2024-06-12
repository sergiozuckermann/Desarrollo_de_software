import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons";
import WorkerCard from '../components/WorkerCard';
import userService from "../services/user";
import { useAuth } from '../hooks/useAuth';
import { WorkerCardProps } from '../utils/interfaces';
import useCustomToast from "../components/LoginNotification";
import ConnectHere from '../components/ConnectHere';
import GradientButton from '../components/CallingButton';

const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');
  const [userInfo, setUserInfo] = useState<WorkerCardProps | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { showError } = useCustomToast();
  const { role, username, logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setButtonMode(prevMode => prevMode === 'workspace' ? 'calling' : 'workspace');
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    userService
      .GetInfo(role!, username!)
      .then((user) => setUserInfo(user))
      .catch(error => {
        if (error.response.status === 401) {
          showError(error.response.data.error);
          setTimeout(() => { logout(); }, 4000);
        }
      });
  }, [role, username, logout, showError]);

  useEffect(() => {
    userService
      .GetImageUrl(username!)
      .then((url) => {
        console.log("URL obtenida:", url);
        setImageURL(url.imageUrl);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          showError(error.response.data.error);
          setTimeout(() => { logout(); }, 4000);
        } else {
          console.error("Error en la solicitud:", error);
        }
      });
  }, [username, showError, logout]);

  return (
    <div className="grid w-full h-full grid-cols-1 gap-4 p-10 md:grid-cols-12">
      <div className="md:col-span-4" data-cy="user-info">
        {userInfo !== null ? 
        <WorkerCard 
          imageURL={userImage || ''}
          name={userInfo.name} 
          username={userInfo.username}
          position={userInfo.position} 
          experience={userInfo.experience} 
          points={userInfo.points} 
          status="Active" /> : null}
      </div>
      <div className="flex flex-col space-y-4 md:col-span-8">
        <div className="flex flex-col gap-10">
          <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 md:col-span-2">
            <HomeButton icon="/phone.svg" title="Call Overview" subtitle="See the status of the ongoing calls" handleClick={() => window.location.href = '/supervisor/onGoingCalls'}/>
            <HomeButton icon="/Switch.svg" title="Agent Queue Transfer" subtitle="Transfer agents from one queue to another" handleClick={() => window.location.href = '/supervisor/agent-transfer'}/>
            <HomeButton icon="/MetricsSymbol.svg" title="Historical Metrics" subtitle="See the historical metrics of the call center" handleClick={() => window.location.href = '/supervisor/metrics'}/>
            <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/supervisor/AgentSpotlight'}/>
            <HomeButton icon="/costumer.svg" title="Agent Performance" subtitle="See the weekly metrics of agent performance" handleClick={() => window.location.href = '/supervisor/AgentPerformance'}/>
            <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/supervisor/TakeABreak'}/>
            <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
              <ConnectHere />
            </div>
            <div className="flex justify-center w-full md:col-span-2">
              <GradientButton mode={buttonMode} handleClick={() => window.location.href = '/supervisor/workspace'} />
            </div>
          </div>
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