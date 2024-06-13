import PageStructure from '../components/PageStructure'; // Importing PageStructure component
import BreathingCard from '../components/BreathingCard'; // Importing BreathingCard component

// Define the BreathingExcer component as a Functional Component (FC)
const BreathingExcer = () => {
  return (
    // PageStructure component with title "Breathing Exercises"
    <PageStructure title="Breathing Exercises">
      {/* Container for breathing exercises */}
      <div className="w-full h-full items-center justify-center overflow-y-auto lg:mt-36" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        <div>
          {/* Title for breathing exercises */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8 dark:text-white">Having a bad day? Choose one...</h1>
        </div>
        {/* Grid layout for breathing exercises */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center ml-4 mt-10"> 
          <div className="col-span-1">
            {/* BreathingCard component for avoiding worries */}
            <BreathingCard imageSrc="/breath1.png" description="To avoid worries" videoId="aNXKjGFUlMs" />
          </div>
          <div className="col-span-1">   
            {/* BreathingCard component for a bad day */}
            <BreathingCard imageSrc="/breath2.png" description="For a bad day" videoId="uxayUBd6T7M" />
          </div>
          <div className="col-span-1">  
            {/* BreathingCard component for removing stress */}
            <BreathingCard imageSrc="/breath3.png" description="To remove stress" videoId="9tOJZQhO_Uw" />
          </div>
          <div className="col-span-1">  
            {/* BreathingCard component after a bad call */}
            <BreathingCard imageSrc="/breath4.png" description="After a bad call" videoId="iaQed_Xdyvw" />
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default BreathingExcer; 
