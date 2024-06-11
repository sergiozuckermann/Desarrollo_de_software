/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PageStructure from "../components/PageStructure";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";
import { useWebSocket } from "../hooks/useWebSocket";
import { Interaction, SentimentSegment, AgentsOnCall, UnhandledInteractions } from "../utils/interfaces";
import InfoCard from "../components/InfoCard";

interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
  color?: string;
}

const Action = {
  START: "START",
  END: "END"
}

const OngoingCalls: React.FunctionComponent = () => {
  const { socket } = useWebSocket(); // get web socket connection
  const [interactions, setInteractions] = useState<Array<Interaction>>([]); // interactions
  const [agentsState, setAgentsState] = useState<Array<PieChartDataItem>>([
    { id: "AVAILABLE", label: "Available", value: 0, color: "#244F26" },
    { id: "ON CALL", label: "On Call", value: 0, color: "#177E89" },
    { id: "ACW", label: "After Call", value: 0, color: "#B0A084" },
    { id: "OFFLINE", label: "Offline", value: 0, color: "red"},
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

  // useEffect to fetch information from session storage on every rerender
  useEffect(() => {
    const agentsOnCallData = sessionStorage.getItem("agentsOnCall"); // check if agentsOnCall key exists
    const agentsAvailabilityData = sessionStorage.getItem("agentsAvailability"); // check if agentsOnCall key exists
    if (!agentsOnCallData) {
      sessionStorage.setItem("agentsOnCall", JSON.stringify([])); // create the key if it does not exist
    }
    if(agentsAvailabilityData) {
      setAgentsAvailability(JSON.parse(agentsAvailabilityData))
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

          // update agents status
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
        const newData = [...currentInteractions];
        // Add the new segment to the array
        newData.push(segment);

        // Save the new interactions array back to local storage as a JSON string
        sessionStorage.setItem("interactions", JSON.stringify(newData));
        // Update the state or context with the new interactions array
        setInteractions(newData);
      }

      // check if a previous call was already ended to update the graph
      const tryGetCurrentData = sessionStorage.getItem('interactions')
      const tryGetAgentsOnCall = sessionStorage.getItem('agentsOnCall')
      if(tryGetCurrentData && tryGetAgentsOnCall) {
        const currentInteractions = JSON.parse(tryGetCurrentData)
          const agentsOnCall:Array<AgentsOnCall> = JSON.parse(tryGetAgentsOnCall)
          // check if the state of the current interaction changed from on call to some other state
          for(const currentInteraction of currentInteractions) {
            for(const agentOnCall of agentsOnCall) {
              // if state of ongoing interaction changed from on call to some other then update the graph
              if(currentInteraction.key === agentOnCall.key && currentInteraction.state !== agentOnCall.state) { 
                updateAgentsAvailability(currentInteraction, Action.START)
              }
            }
          }
          // on call segments
          if(segment.state === "ON CALL" && !agentsOnCall.find(a => a.key === segment.key)) {
            updateAgentsAvailability(segment, Action.END)
          }
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


  const updateAgentsAvailability = (segment: Interaction, action: string) => {
    // Clone the existing agentsAvailability array to avoid direct mutation
    const newAgentsAvailability = [
      ...agentsAvailability
    ]
  
    // Loop through the cloned array to update availability based on the action
    for (let i = 0; i < newAgentsAvailability.length; i++) {
      // Check if the current item matches the queueName in the segment
      if (newAgentsAvailability[i].id === segment.queueName) {
        // Retrieve 'agentsOnCall' data from session storage
        const tryGetAgentsOnCall = sessionStorage.getItem('agentsOnCall')
        // Proceed if data exists
        if (tryGetAgentsOnCall) {
          // Parse the JSON string back to an array
          const agentsOnCall: Array<AgentsOnCall> = JSON.parse(tryGetAgentsOnCall)
          // Find the agent with the matching key in the array
          const agentOnCall = agentsOnCall.find(a => a.key === segment.key)
          // Switch between START and END actions to update availability
          switch (action) {
            case Action.START:
              // Log to console when action is START
              console.log('entered here START')
              // Decrease the availability count for the agent
              newAgentsAvailability[i].value -= 1
              // Remove the agent from session if no availability left
              if (newAgentsAvailability[i].value === 0) {
                const filteredAgentsOnCall = agentsOnCall.filter(a => a.key !== segment.key)
                sessionStorage.setItem('agentsOnCall', JSON.stringify(filteredAgentsOnCall))
              }
              break
            case Action.END:
              // Log to console when action is END
              console.log('entered here END')
              // Increase the availability count for the agent
              newAgentsAvailability[i].value += 1
              // If agent is not currently on call, add them to session storage
              if (!agentOnCall) {
                const cachedRecord = {
                  key: segment.key,
                  state: segment.state
                }
                agentsOnCall.push(cachedRecord)
                sessionStorage.setItem('agentsOnCall', JSON.stringify(agentsOnCall))
              }
              break
            default:
              // Handle any other unspecified action
              break
          }
        }
      }
    }
    // Save the updated agentsAvailability array back to session storage
    sessionStorage.setItem("agentsAvailability", JSON.stringify(newAgentsAvailability));
  
    // Update the state to reflect changes in the component or context
    setAgentsAvailability(newAgentsAvailability)
  }
  
  // Function to update agent status based on action START or END
const updateAllAgentStatus = (action: string) => {
  // Clone the current agentsState to avoid direct mutations
  const callStates = [...agentsState]

  // Retrieve 'interactions' data from session storage
  const data = sessionStorage.getItem('interactions')

  // Check if there is data in the storage
  if (data) {
    // Parse the JSON string back to an array
    const interactionsData = JSON.parse(data)

    // Iterate over each interaction from the data
    for (const interaction of interactionsData) {
      // Iterate over each call state in the cloned array
      for (const callState of callStates) {
        // Check if the call state ID matches the interaction state
        if (callState.id === interaction.state) {
          // Use a switch statement to handle different actions
          switch (action) {
            case Action.START:
              // Decrease the call state value by 1 when action is START
              callState.value -= 1
              break
            case Action.END:
              // Increase the call state value by 1 when action is END
              callState.value += 1
              break
            default:
              // Do nothing if the action does not match START or END
              break
          }
        }
      }
    }

    // Save the updated callStates array back to session storage
    sessionStorage.setItem('callStates', JSON.stringify(callStates))
    // Update the state to reflect changes in the component or context
    setAgentsState(callStates)
  }
}

  // update agent map with unhandled real time information
  useEffect(() => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions')
    if(unhandledInteractionsData) {
      const unhandledInteractions:UnhandledInteractions[] = JSON.parse(unhandledInteractionsData)

      if(!unhandledInteractions.length) return

      unhandledInteractions.forEach(unhandled => {
        processEvent(unhandled.state)
        if(unhandled.sentiment) {
          processSentimentAnalysis(unhandled.sentiment)
        }
      })

      sessionStorage.removeItem('unhandledInteractions')
    }
  }, [])


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
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="col-span-1">
            <GraphAgentStructure 
              agentsState={agentsState}
              agentsAvailability={agentsAvailability} />
          </div>
          <div className="col-span-1">
            {!interactions.length ? (
              <InfoCard description='No ongoing interactions' />
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
