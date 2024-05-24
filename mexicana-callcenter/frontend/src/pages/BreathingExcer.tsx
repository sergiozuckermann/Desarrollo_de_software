import PageStructure from '../components/PageStructure';
import BreathingCard from '../components/BreathingCard'; 

const BreathingExcer = () => {
  return (
    <PageStructure title="Breathing Exercises">
        <div>
        <div>
            <h1 className="font-roboto font-light text-primary">Having a bad day? Choose one...</h1>
        </div>
        <div className="flex justify-center"> 
            <div className="container mx-auto">
            <div className="flex gap-8">
                <BreathingCard imageSrc="/breath1.png" description="To avoid worries" videoId="aNXKjGFUlMs" />
                <BreathingCard imageSrc="/breath2.png" description="For a bad day" videoId="uxayUBd6T7M" />
                <BreathingCard imageSrc="/breath3.png" description="To remove stress" videoId="9tOJZQhO_Uw" />
                <BreathingCard imageSrc="/breath4.png" description="After a bad call" videoId="iaQed_Xdyvw" />
            </div>
            </div>
        </div>
        </div>
    </PageStructure>
  );
};

export default BreathingExcer;
