// Import the PageStructure component from the "../components/PageStructure" module
import PageStructure from "../components/PageStructure";
// Import the TABreakButtons component from the "../components/TABreakButtons" module
import TABreakButtons from "../components/TABreakButtons";
// Import the useAuth hook from the "../hooks/useAuth" module
import { useAuth } from "../hooks/useAuth";

// Define the TakeABreak component
const TakeABreak = () => {
  // Get the user's role using the useAuth hook
  const { role } = useAuth();
  
  // Determine the URL path for the breathing exercises based on the user's role
  const breathingExcerPath = role === 'Agent' ? '/agent/BreathingExcer' : '/supervisor/BreathingExcer';
  // Determine the URL path for the "move your body" page based on the user's role
  const moveYourBodyPath = role === 'Agent' ? '/agent/MoveYourBody' : '/supervisor/MoveYourBody';

  // Render the component
  return (
    // Use the PageStructure component to provide a consistent page layout
    // Pass the page title "Take a Break" as a prop
    <PageStructure title="Take a Break">
      {/* Container for the main content */}
      <div className="w-full h-full items-center justify-center overflow-y-auto lg:mt-36" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        <div>
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8 dark:text-white">We're here for you</h1>
        </div>
        {/* Grid container for the buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center ml-4 mt-10">
          {/* First column */}
          <div className="col-span-1">
            {/* TABreakButtons component for contacting help */}
            <TABreakButtons
              picture="/need_help_nbg.png"
              title="Contact help"
              handleClick={() => window.open('https://www.gob.mx/stps/articulos/conoce-el-programa-de-bienestar-emocional-en-el-trabajo', '_blank')}
            />
          </div>
          {/* Second column */}
          <div className="col-span-1">
            {/* TABreakButtons component for breathing exercises */}
            <TABreakButtons
              picture="/breathing_exc_nbg.png"
              title="Breathing exercises"
              handleClick={() => window.location.href = breathingExcerPath}
            />
          </div>
          {/* Third column */}
          <div className="col-span-1">
            {/* TABreakButtons component for "move your body" */}
            <TABreakButtons
              picture="/move_body_nbg.png"
              title="Move your body"
              handleClick={() => window.location.href = moveYourBodyPath}
            />
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

// Export the TakeABreak component as the default export
export default TakeABreak;