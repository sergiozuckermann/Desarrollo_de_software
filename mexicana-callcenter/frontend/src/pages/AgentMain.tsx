import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import GradientButton from "../components/CallingButton";
import WorkerCard from '../components/WorkerCard';
import { useAuth } from '../hooks/useAuth'
import { WorkerCardProps } from '../utils/interfaces';
import useCustomToast from "../components/LoginNotification";
import userService from "../services/user"

const MainContent = () => {
  const [buttonMode, setButtonMode] = useState('workspace');
  const [userInfo, setUserInfo] = useState<WorkerCardProps | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { role, username, logout } = useAuth()
  const { showError } = useCustomToast();


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


  useEffect(() => {
    userService
      .GetImageUrl(username!) // Llamada a la función que realiza la solicitud axios
      .then((url) => {
        console.log("URL obtenida:", url); // Mostrar el valor de url en la consola
        setImageURL(url.imageUrl); // Establecer el estado de imageURL con el resultado de la solicitud si es exitosa
      })
      .catch(error => {
        if (error.response && error.response.status === 401) { // Verificar si hay un error de autorización
          showError(error.response.data.error); // Mostrar el error
          setTimeout(() => { logout() }, 4000); // Cerrar la sesión del usuario
        } else {
          console.error("Error en la solicitud:", error); // Manejar otros posibles errores
        }
      });
  }, []);

  return (
    <div className="grid w-full h-full grid-cols-1 gap-4 p-4 pt-12 md:grid-cols-12">
      <div className="md:col-span-4 h-[100%] pl-10" data-cy="user-info">
       
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

      </div>
      <div className="flex flex-col space-y-4 md:col-span-8">
        <div className="flex flex-col pb-2">
      <GradientButton mode={buttonMode} handleClick={() => window.location.href = '/agent/workspace'} />
       </div>
        <div className="flex flex-col gap-10">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={() => window.location.href = '/agent/Metrics'}/>
            <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/AgentSpotlight'}/>
            <HomeButton icon="/BadgesSymbol.svg" title="My Badges" subtitle="See all the awards and badges earned" handleClick={() => window.location.href = '/agent/MyBadges'}/>
            <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/agent/TakeABreak'}/>
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
