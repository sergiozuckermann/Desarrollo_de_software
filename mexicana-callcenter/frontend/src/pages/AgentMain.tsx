import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import GradientButton from "../components/CallingButton";
import WorkerCard from '../components/WorkerCard';
import { useAuth } from '../hooks/useAuth'
import { WorkerCardProps } from '../utils/interfaces';
import useCustomToast from "../components/LoginNotification";
import userService from "../services/user";

//Agent Home Page
const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');
  const [userInfo, setUserInfo] = useState<WorkerCardProps | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { role, username, logout } = useAuth()
  const { showError } = useCustomToast();

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


  useEffect(() => {
    userService
      .GetImageUrl(username!) //call function that makes axios request
      .then((url) => {
        console.log("URL obtenida:", url); // show the URL obtained
        setImageURL(url.imageUrl); // set the imageURL state with the result from the request if it is successful
      })
      .catch(error => {
        if (error.response && error.response.status === 401) { // check if the error is an authorization error
          showError(error.response.data.error); // showError
          setTimeout(() => { logout() }, 4000); // close agent session
        } else {
          console.error("Error en la solicitud:", error); // manage other errors
        }
      });
  }, []);

  return (
    // Page structure
    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 md:grid-cols-12">
      <div className="md:col-span-4" data-cy="user-info">
    {/* render agent */}
        { userInfo !== null ? 
          <WorkerCard 
          imageURL={userImage || ''}
           name={userInfo.name} 
           username={userInfo.username}
           position={userInfo.position} 
           experience={userInfo.experience} 
           points={userInfo.points} 
           status="Active" /> 
          : null
        }
      {/*render options menu for agents */}
      </div>
      <div className="flex flex-col space-y-4 md:col-span-8">
        <div className="flex flex-col gap-10">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={() => window.location.href = '/agent/Metrics'}/>
            <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/AgentSpotlight'}/>
            <HomeButton icon="/BadgesSymbol.svg" title="My Badges" subtitle="See all the awards and badges earned" handleClick={() => window.location.href = '/agent/MyBadges'}/>
            <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/agent/TakeABreak'}/>
          </div>
          {/* button that goes to workspace where cpp is */}
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
