import React, { useState } from "react";
import PageStructure from "../components/PageStructure";
import AgentSpotlightComp from "../components/AgentSpotlightComp";

interface Agent {
  name: string;
  performance: string;
  image: string;
}

const AgentSpotlight = () => {
  const bestAgents: Agent[] = [
    {
      name: "Emily Wilson",
      performance: "Highest customer satisfaction rating",
      image: "/public/avatar.png",
    },
    {
      name: "Michael Brown",
      performance: "Fastest response time",
      image: "/public/avatar.png",
    },
    {
      name: "Olivia Thompson",
      performance: "Most positive feedback",
      image: "/public/avatar.png",
    },
    {
      name: "William Davis",
      performance: "Highest first-call resolution rate",
      image: "/public/avatar.png",
    },
    {
      name: "Sophia Martinez",
      performance: "Exceptional product knowledge",
      image: "/public/avatar.png",
    },
    {
      name: "James Anderson",
      performance: "Outstanding leadership skills",
      image: "/public/avatar.png",
    },
    {
      name: "Ava Taylor",
      performance: "Most successful upsells",
      image: "/public/avatar.png",
    },
    {
      name: "Benjamin Harris",
      performance: "Highest customer retention rate",
      image: "/public/avatar.png",
    },
    {
      name: "Isabella Clark",
      performance: "Exceptional multi-tasking abilities",
      image: "/public/avatar.png",
    },
    {
      name: "Henry Lewis",
      performance: "Outstanding quality assurance scores",
      image: "/public/avatar.png",
    },
    {
      name: "Mia Walker",
      performance: "Most successful in handling complex cases",
      image: "/public/avatar.png",
    },
    {
      name: "Alexander Green",
      performance: "Highest sales conversion rate",
      image: "/public/avatar.png",
    },
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bestAgents.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bestAgents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showingAgents = [
    bestAgents[currentIndex],
    bestAgents[(currentIndex + 1) % bestAgents.length],
    bestAgents[(currentIndex + 2) % bestAgents.length],
  ];

  return (
    <PageStructure title="Agent Spotlight">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex grid grid-cols-1 lg:grid-cols-3 items-center ml-4">
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={showingAgents[0].name}
              performance={showingAgents[0].performance}
              image={showingAgents[0].image}
            />
          </div>
          <div className="col-span-1 p-4 flex-shrink-0 scale-120">
            <AgentSpotlightComp
              name={showingAgents[1].name}
              performance={showingAgents[1].performance}
              image={showingAgents[1].image}
            />
          </div>
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={showingAgents[2].name}
              performance={showingAgents[2].performance}
              image={showingAgents[2].image}
            />
          </div>
        </div>
        <div className="flex justify-center mt-6 ml-4">
          <button onClick={handlePrevClick} className="mr-12">
            <img src="/public/back.svg" alt="Previous Arrow" />
          </button>
          <button onClick={handleNextClick}>
            <img src="/public/next.svg" alt="Next Arrow" />
          </button>
        </div>
      </div>
    </PageStructure>
  );
};

export default AgentSpotlight;