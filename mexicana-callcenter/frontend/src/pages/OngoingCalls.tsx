import React, { useEffect, useState } from "react";
import PageStructure from "../components/PageStructure";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";
import { useWebSocket } from "../hooks/useWebSocket";
import { Interaction } from "../utils/interfaces";

const OngoingCalls: React.FunctionComponent = () => {
  const { socket } = useWebSocket() // get web socket connection
  const [interactions, setInteractions] = useState<Array<Interaction>>([])

  // 1. Receive the data segment (could be the combined segment: both sentiment and call status OR receive the 2 segments separately) from the established websocket connection 
  // 2. Store the segment in state (do this inside a useEffect hook that runs whenever new data is received)
  // 3. In the data state (backend data) check if there is not an already established interaction by checking every contactID
  // 4. If there is, replace the segment at that position and set the backend data state to that.
  // 5. If there is not, add the segment to the backend data

  useEffect(() => {
    localStorage.setItem('interactions', JSON.stringify([]))
  }, [])

  const processEvent = (segment:Interaction) => {

    const data = localStorage.getItem('interactions')
    let currentInteractions = []
    if(data) {
      currentInteractions = JSON.parse(data)
      console.log('curenenne: ', currentInteractions)
      const establishedInteraction = currentInteractions.find(interaction => interaction.key === segment.key)
      if(establishedInteraction) {

      if(segment.state === 'LOGOUT') {
        console.log("entered logou")
        const filteredInteractions = currentInteractions.filter(interaction => interaction.key !== segment.key)
        localStorage.setItem('interactions', JSON.stringify(filteredInteractions))
        setInteractions(filteredInteractions)
        return
      }

      const updatedInteractions = currentInteractions.map(interaction => interaction.key === segment.key ? segment : interaction)
      localStorage.setItem('interactions', JSON.stringify(updatedInteractions))
      setInteractions(updatedInteractions)
      } else { // no established interaction
        const newData = [...currentInteractions]
        newData.push(segment)
        
        setInteractions(newData)
        localStorage.setItem('interactions', JSON.stringify(newData))

      }
    } else {
      console.log('data is NULL')
    }
   
  }

  const processSentimentAnalysis = (segment) => {
    const data = localStorage.getItem('interactions')
    let currentInteractions:Array<Interaction> = []
    if(data) {
      currentInteractions = JSON.parse(data)
      const establishedInteraction = currentInteractions.find(i => i.contactId === segment.contactId)
        if(establishedInteraction) {
          const updatedInteraction = {
            ...establishedInteraction,
            Sentiment: segment.Sentiment
          }
          const updatedInteractions = currentInteractions.map(i => i.contactId === segment.contactId ? updatedInteraction : i)
          localStorage.setItem('interactions', JSON.stringify(updatedInteractions))
          setInteractions(updatedInteractions)
      }
    }
  }

  useEffect(() => {
    const ws = socket
    if(ws !== null) {
      console.log("This is ws: ", ws)
      ws.onmessage = (event) => {
        console.log("message received: ", event.data)
        const data = JSON.parse(event.data)
        const segment = data.message
        console.log("now seg: ", segment)
        if(segment) {
          console.log('entered iff')
          const { segmentType } = segment
          if(segmentType == 'AGENT_EVENT') {
            console.log('interactions before calling fn: ', interactions)
            processEvent(segment)
          } else if(segmentType == 'SENTIMENT_ANALYSIS') {
            processSentimentAnalysis(segment)
          }
        }
      }
    }
  }, [socket])


  return (
    <PageStructure title="Ongoing Calls">
      <div className="overflow-y-auto h-full pb-[3%] pt-[2%] pl-[2%]">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="col-span-1">
                <GraphAgentStructure />
              </div>
              <div className="col-span-1">
                {!interactions.length ? 
                  <h1>No ongoing interactions</h1> : 
                  <CellGrid data={interactions} />}
              </div>
            </div>
          </div>
    </PageStructure>
  );
};

export default OngoingCalls;