
import PageStructure from '../components/PageStructure';
import Carousel from '../components/Carousel';

const MoveYourBody = () => {
  const videos = [
    { videoId: 'TF3om_6O8HI', title: 'Yoga for a bad day', description: 'Description' },
    { videoId: 'OKeihpxcuQI', title: 'Yoga to calm down', description: 'Description' },
    { videoId: 'bOfJJcLPbcM', title: 'Yoga to relax', description: 'Description' },
    { videoId: 'nuIWMFOotko', title: 'Yoga to start the day', description: 'Description' },
    { videoId: 'bIS-FiT7tWc', title: 'Yoga to finish the day', description: 'Description' },
    { videoId: 'nuIWMFOotko', title: 'Yoga for a bad day', description: 'Description' },
    { videoId: 'bIS-FiT7tWc', title: 'Yoga to start the day', description: 'Description' },
  ];

  return (
    <PageStructure title="Move Your Body">
      <div className="">
        <Carousel videos={videos} />
        <Carousel videos={videos} />
      </div>
    </PageStructure>
  );
};

export default MoveYourBody;
