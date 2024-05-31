import React, { useEffect, useState } from "react";
import PageStructure from "../components/PageStructure";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";
import { useWebSocket } from "../hooks/useWebSocket";
import { Interaction, SentimentSegment } from "../utils/interfaces";
import userService from "../services/user";

interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

const Action = {
  START: "START",
  END: "END"
}

const OngoingCalls: React.FunctionComponent = () => {
  const { socket } = useWebSocket(); // get web socket connection
  const [interactions, setInteractions] = useState<Array<Interaction>>([]); // interactions
  const [agentsState, setAgentsState] = useState<Array<PieChartDataItem>>([
    { id: "AVAILABLE", label: "Available", value: 0 },
    { id: "ON CALL", label: "On Call", value: 0 },
    { id: "ACW", label: "After Call", value: 0 },
    { id: "OFFLINE", label: "Offline", value: 0 },
  ])
  const [agentsAvailability, setAgentsAvailability] = useState<Array<PieChartDataItem>>([
    {id:"FlightManagement", label: "Flight Rsv", value: 0 },
    {id:"CustomerCare", label: "Customer Care", value: 0 },
    {id:"WebsiteAssistance", label: "Booking or Website Issues", value: 0 },
    {id:"TravelInformation", label: "Status Inquiries", value: 0 },
    {id:"SpecialAssitance", label: "Special Assistance or Docs", value: 0 },
    {id:"OtherQuestions", label: "Other Questions", value: 0 }
  ])

  // useEffect to fetch information from session storage on every rerender
  useEffect(() => {
    const interactionsData = sessionStorage.getItem("interactions"); // check if interactions key exists
    if (interactionsData) {
      setInteractions(JSON.parse(interactionsData)); // set interactions state
      updateAllAgentStatus(Action.END) // update states
    } else {
      sessionStorage.setItem("interactions", JSON.stringify([])); // create the key if it does not exist
    }
  }, []);

  // Define a function to process events, which takes a 'segment' of type Interaction as an argument
  const processEvent = (segment: Interaction) => {
    // Retrieve 'interactions' data from local storage
    const data = sessionStorage.getItem("interactions");
    // Initialize an array to hold interaction objects
    let currentInteractions: Array<Interaction> = [];

    // Check if there is any data retrieved from local storage
    if (data) {
      // update states
      updateAllAgentStatus(Action.START)

      // Parse the JSON string back into an array of objects
      currentInteractions = JSON.parse(data);

      // Find the interaction object that matches the key from the segment
      const establishedInteraction = currentInteractions.find(
        (interaction) => interaction.key === segment.key
      );

      // Check if an established interaction was found    
      if (establishedInteraction) {
        // Check if the segment's state is 'LOGOUT'
        if (segment.state === "LOGOUT") {
          // Filter out the interaction with the matching key to remove it
          const filteredInteractions = currentInteractions.filter(
            (interaction) => interaction.key !== segment.key
          );

          // Save the filtered interactions array back to local storage as a JSON string
          sessionStorage.setItem(
            "interactions",
            JSON.stringify(filteredInteractions)
          );

          // Update the state or context with the filtered interactions array
          setInteractions(filteredInteractions);

          updateAllAgentStatus(Action.END)

          return;
        }

        // Map through the current interactions to replace the interaction
        // where the key matches with the new segment data
        const updatedInteractions = currentInteractions.map((interaction) =>
          interaction.key === segment.key ? segment : interaction
        );

        // Save the updated interactions array back to local storage as a JSON string
        sessionStorage.setItem(
          "interactions",
          JSON.stringify(updatedInteractions)
        );

        // Update the state or context with the new interactions array
        setInteractions(updatedInteractions);
      } else {
        // If no established interaction was found
        // Create a new array with all current interactions
        const newData = [...currentInteractions];
        // Add the new segment to the array
        newData.push(segment);

        // Save the new interactions array back to local storage as a JSON string
        sessionStorage.setItem("interactions", JSON.stringify(newData));
        // Update the state or context with the new interactions array
        setInteractions(newData);
      }

      // update agents status
      updateAllAgentStatus(Action.END)
    }
  };

  // Define a function to process sentiment analysis, which takes a 'segment' object as an argument
  const processSentimentAnalysis = (segment: SentimentSegment) => {
    // Retrieve 'interactions' data from local storage
    const data = sessionStorage.getItem("interactions");
    // Initialize an array to hold interaction objects
    let currentInteractions: Array<Interaction> = [];

    // Check if there is any data retrieved from local storage
    if (data) {
      // Parse the JSON string back into an array of objects
      currentInteractions = JSON.parse(data);

      // Find the interaction object that matches the contact ID from the segment
      const establishedInteraction = currentInteractions.find(
        (i) => i.contactId === segment.contactId
      );

      // Check if an established interaction was found
      if (establishedInteraction) {
        // Create an updated interaction object by spreading the existing interaction
        // and updating the 'Sentiment' field with the sentiment from the segment
        const updatedInteraction = {
          ...establishedInteraction,
          Sentiment: segment.Sentiment,
        };

        // Map through the current interactions to replace the updated interaction
        // in the array where the contact ID matches
        const updatedInteractions = currentInteractions.map((i) =>
          i.contactId === segment.contactId ? updatedInteraction : i
        );

        // Save the updated interactions array back to local storage as a JSON string
        sessionStorage.setItem(
          "interactions",
          JSON.stringify(updatedInteractions)
        );

        // Update the state or context with the new interactions array
        setInteractions(updatedInteractions);
      }
    }
  };

  // Function to update agent status
  const updateAllAgentStatus = (action:string) => {
    const callStates = [...agentsState]

    const data = sessionStorage.getItem('interactions')

    if(data) {
      const interactionsData = JSON.parse(data)

      for(const interaction of interactionsData) {
        for(const callState of callStates) {
          if(callState.id === interaction.state) {
            switch(action) {
              case Action.START:
                callState.value -= 1 
                break
              case Action.END:
                callState.value += 1
                break
              default:
                break
             } 
          }
        }
      }

      sessionStorage.setItem('callStates', JSON.stringify(callStates))
      setAgentsState(callStates)

    }
    
  }

  // web socket connection to get real time information from ongoing intereaction
  useEffect(() => {
    const ws = socket;
    if (ws !== null) {
      // check that the websocket connection exists

      ws.onmessage = (event) => {
        // onmessage event to receive data
        const data = JSON.parse(event.data);
        const segment = data.message;
        console.log("data: ", segment);

        if (segment) {
          // check if segment exists
          const { segmentType } = segment;
          if (segmentType == "AGENT_EVENT") {
            // segment of type agent event
            processEvent(segment);
          } else if (segmentType == "SENTIMENT_ANALYSIS") {
            // segment of type sentiment analysis
            processSentimentAnalysis(segment);
          }

         
        }
      };
    }
  }, [socket]);

  return (
    <PageStructure title="Ongoing Calls">
      <div className="overflow-y-auto h-full pb-[3%] pt-[2%] pl-[2%]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="col-span-1">
            <GraphAgentStructure agentsState={agentsState} />
          </div>
          <div className="col-span-1">
            {!interactions.length ? (
              <h1>No ongoing interactions</h1>
            ) : (
              <CellGrid data={interactions} />
            )}
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default OngoingCalls;
