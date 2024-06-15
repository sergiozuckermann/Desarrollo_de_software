import PageStructure from '../components/PageStructure'; // Importing PageStructure component
import Carousel from '../components/Carousel'; // Importing Carousel component

// Define the MoveYourBody component as a Functional Component (FC)
const MoveYourBody = () => {
  // Array of video data for the first carousel
  const videos1 = [
    { videoId: 'TF3om_6O8HI', title: 'Yoga for a bad day', description: 'Improve your day with soothing yoga.' },
    { videoId: 'OKeihpxcuQI', title: 'Yoga to calm down', description: 'Achieve tranquility with calming yoga.' },
    { videoId: 'bOfJJcLPbcM', title: 'Yoga to relax', description: 'De-stress with gentle yoga poses.' },
    { videoId: 'nuIWMFOotko', title: 'Yoga to start the day', description: 'Energize your morning with yoga.' },
    { videoId: 'bIS-FiT7tWc', title: 'Yoga to finish the day', description: 'End your day with calming yoga.' },
    { videoId: 'A1vdKfXlB_g', title: 'Winner Dance', description: 'Celebrate with an energetic dance routine.' },
    { videoId: 'wF3ECvvHEBg', title: 'Dance is Friday', description: 'Enjoy your Friday with dance.' },
  ];

  // Array of video data for the second carousel
  const videos2 = [
    { videoId: 'voKL9XXdlv0', title: 'Yoga poses to stretch', description: 'Stretch deeply with effective yoga poses.' },
    { videoId: 'njv6EON8iZ8', title: 'Seated yoga poses', description: 'Ease back pain with seated poses.' },
    { videoId: 'buzZ_BQpeCw', title: 'Yoga poses to focus', description: 'Boost concentration with focused yoga poses.' },
    { videoId: '28CHeYHUu04', title: 'Seated yoga poses 2', description: 'More poses to ease back pain.' },
    { videoId: 'ZHgk49hjjYY', title: 'Yoga for flexibility', description: 'Enhance flexibility with yoga stretches.' },
    { videoId: 'J2Lkp4APisg', title: 'Yoga under the sea', description: 'Experience yoga with an underwater theme.' },
    { videoId: 'xSumeL1exn0', title: 'Yoga with a partner', description: 'Enjoy partner yoga for connection.' },
  ];

  return (
    // PageStructure component with title "Move Your Body"
    <PageStructure title="Move Your Body">
      {/* Container for carousels */}
      <div className="">
        {/* Carousel component for the first set of videos */}
        <Carousel videos={videos1} />
        {/* Carousel component for the second set of videos */}
        <Carousel videos={videos2} />
      </div>
    </PageStructure>
  );
};

export default MoveYourBody; 