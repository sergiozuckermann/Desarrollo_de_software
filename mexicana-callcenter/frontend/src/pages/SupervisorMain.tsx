// Import the useState and useEffect hooks from the 'react' library
import { useState, useEffect } from 'react';

// Import the PageStructure component from the "../components/PageStructure" module
import PageStructure from "../components/PageStructure";

// Import the HomeButton component from the "../components/HomeButtons" module
import HomeButton from "../components/HomeButtons";

// Import the WorkerCard component from the "../components/WorkerCard" module
import WorkerCard from '../components/WorkerCard';

// Import the userService module from the "../services/user" module
import userService from "../services/user";

// Import the useAuth hook from the "../hooks/useAuth" module
import { useAuth } from '../hooks/useAuth';

// Import the WorkerCardProps interface from the "../utils/interfaces" module
import { WorkerCardProps } from '../utils/interfaces';

// Import the useCustomToast hook from the "../components/LoginNotification" module
import useCustomToast from "../components/LoginNotification";

// Import the ConnectHere component from the "../components/ConnectHere" module
import ConnectHere from '../components/ConnectHere';


// Define the MainContent functional component
const MainContent = () => {
  const [userInfo, setUserInfo] = useState<WorkerCardProps | null>(null);

  // Declare a state variable 'userImage' with initial value null and its setter function 'setImageURL'
  // The type of 'userImage' is either string or null
  const [userImage, setImageURL] = useState<string | null>(null);

  // Destructure the 'showError' function from the 'useCustomToast' hook
  const { showError } = useCustomToast();
  const { role, username, logout } = useAuth()

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

  // Use the useEffect hook to fetch the user's image URL from the server
  useEffect(() => {
    // Call the 'GetImageUrl' method of the 'userService' with the 'username'
    userService
      .GetImageUrl(username!) // Llamada a la función que realiza la solicitud axios
      .then((url) => {
        console.log("URL obtenida:", url); // Log the obtained URL
        setImageURL(url.imageUrl); // Update the 'userImage' state with the fetched image URL
      })
      .catch(error => {
        // If the error response exists and its status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          showError(error.response.data.error); // Show an error message using the 'showError' function
          setTimeout(() => { logout(); }, 4000); // Log out the user after 4 seconds
        } else {
          console.error("Error en la solicitud:", error); // Log any other errors
        }
      });
  }, [username, showError, logout]); // Re-run this effect whenever 'username', 'showError', or 'logout' changes

  // Return the JSX to be rendered by the MainContent component
  return (
    // Render a div with grid layout and responsive classes
    <div className="grid w-full h-full grid-cols-1 gap-4 p-10 md:grid-cols-12">
      {/* Render a div for the user information */}
      <div className="md:col-span-4" data-cy="user-info">
        {/* Conditionally render the WorkerCard component if 'userInfo' is not null */}
        {userInfo !== null ? 
        <WorkerCard 
          imageURL={userImage || ''} // Pass the 'userImage' as the 'imageURL' prop, or an empty string if 'userImage' is null
          name={userInfo.name} // Pass the 'name' from 'userInfo' as the 'name' prop
          username={userInfo.username} // Pass the 'username' from 'userInfo' as the 'username' prop
          position={userInfo.position} // Pass the 'position' from 'userInfo' as the 'position' prop
          experience={userInfo.experience} // Pass the 'experience' from 'userInfo' as the 'experience' prop
          points={userInfo.points} // Pass the 'points' from 'userInfo' as the 'points' prop
          status="Active" /> : null} {/* Pass "Active" as the 'status' prop */}
      </div>
      {/* Render a div for the home buttons */}
      <div className="flex flex-col space-y-4 md:col-span-8">
  <div className="flex flex-col gap-10">

  <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 md:col-span-2">
      <HomeButton icon="/phone.svg" title="Call Overview" subtitle="See the status of the ongoing calls" handleClick={() => window.location.href = '/supervisor/onGoingCalls'}/>
      <HomeButton icon="/Switch.svg" title="Agent Queue Transfer" subtitle="Transfer agents from one queue to another" handleClick={() => window.location.href = '/supervisor/agent-transfer'}/>
      <HomeButton icon="/MetricsSymbol.svg" title="Historical Metrics" subtitle="See the historical metrics of the call center" handleClick={() => window.location.href = '/supervisor/metrics'}/>
      <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={() => window.location.href = '/supervisor/AgentSpotlight'}/>
      <HomeButton icon="/costumer.svg" title="Agent Performance" subtitle="See the weekly metrics of agent perfomance" handleClick={() => window.location.href = '/supervisor/AgentPerformance'}/>
      <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={() => window.location.href = '/supervisor/TakeABreak'}/>
      <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
        <ConnectHere />
      </div>
      <div className="flex justify-center w-full md:col-span-2">
      </div>

    </div>
   
  </div> 
</div>
</div>
  );
};

// Define the HomePage component
const HomePage = () => {
  // Return the JSX to be rendered by the HomePage component
  return (
    // Render the PageStructure component with the title "Home"
    <PageStructure title="Home">
      {/* Render the MainContent component */}
      <MainContent />
    </PageStructure>
  );
};

// Export the HomePage component as the default export
export default HomePage;
