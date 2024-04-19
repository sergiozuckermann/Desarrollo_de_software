// import { useState, useEffect } from 'react';
// import PageStructure from "../components/PageStructure";
// import HomeButton from "../components/HomeButtons";
// import SupervisorButton from "../components/SupervisorButton"; 
// import WorkerCard from '../components/WorkerCard';

// const handleMetricsButton = () => {
//   window.location.href = '/Metrics'; 
// };
// const handleAgentSpotlightButton = () => {
//   window.location.href = '/AgentSpotlight'; 
// };
// const handleCustomerButton = () => {
//   window.location.href = '/CustomerService'; 
// };

// const handleBreaksButton = () => {
//   window.location.href = '/Breaks'; 
// };
// const handleCallingButton = () => {
//     window.location.href = '/supervisor/onGoingCalls'; 
//   };


// const MainContent = () => {

//   return (
//     <div className="grid grid-cols-12 gap-1 w-90% h-[90%] inset-y-1/2 items-center content-center ">
//       <div className="flex flex-col col-span-12 md:col-span-4">
//         <WorkerCard  name="Ana Gabriel Martínez" position="Agent" years={2} points={200} status="Active" />
//       </div>
//       <div className="flex flex-col col-span-12 md:col-span-8">
//         <div className="flex-1 p-8 border-2 border-gray-400 bg-tertiary border-black-500 home-button rounded-xl">
//           <div className="grid h-full gap-8 mx-auto md:grid-cols-2">
//             <HomeButton icon="/MetricsSymbol.svg" title="My Metrics" subtitle="See the real time metrics for all the agents" handleClick={handleMetricsButton}/>
//             <HomeButton icon="/SpotlightSymbol.svg" title="Agent Spotlight" subtitle="Weekly best agents" handleClick={handleAgentSpotlightButton}/>
//             <HomeButton icon="/costumer.svg" title="Custumer Service" subtitle="See the metrics for the costumer service surveys" handleClick={handleCustomerButton} />
//             <HomeButton icon="/BreakSymbol.svg" title="Take a break" subtitle="Go to take a break to clear the mind" handleClick={handleBreaksButton}/>
//           </div>
//         </div>
//         <SupervisorButton
//            handleClick={handleCallingButton} />  
//     </div>
//     </div>
//   );
// };

// const SupervisorMain = () => {
//   return (
//     <PageStructure title="Home">
//       <MainContent />
//     </PageStructure>
//   );
// };

// export default SupervisorMain;


import PageStructure from "../components/PageStructure";
import HomeButton from "../components/HomeButtons"; 
import SupervisorButton from "../components/SupervisorButton";
import WorkerCard from '../components/WorkerCard';

const MainContent = () => {
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

