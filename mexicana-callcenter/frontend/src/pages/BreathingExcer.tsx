import PageStructure from '../components/PageStructure';
import BreathingCard from '../components/BreathingCard'; 

const BreathingExcer = () => {
  return (
    <PageStructure title="Breathing Exercises">
        <div className="w-full h-full items-center justify-center overflow-y-auto lg:mt-36" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">Having a bad day? Choose one...</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center ml-4 mt-10"> 
                <div className="col-span-1">
                <BreathingCard imageSrc="/breath1.png" description="To avoid worries" videoId="aNXKjGFUlMs" />
                </div>
                <div className="col-span-1">   
                <BreathingCard imageSrc="/breath2.png" description="For a bad day" videoId="uxayUBd6T7M" />
                </div>
                <div className="col-span-1">  
                <BreathingCard imageSrc="/breath3.png" description="To remove stress" videoId="9tOJZQhO_Uw" />
                </div>
                <div className="col-span-1">  
                <BreathingCard imageSrc="/breath4.png" description="After a bad call" videoId="iaQed_Xdyvw" />
            </div>
        </div>
        </div>
    </PageStructure>
  );
};

export default BreathingExcer;
