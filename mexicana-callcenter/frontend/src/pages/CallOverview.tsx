import React, { useEffect, useState } from 'react';
import { useWebSocket } from "../hooks/useWebSocket";
import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import MyLineChart from "../components/Charts/linechart";
import CallCard from '../components/Callinfo';
import AHT from "../components/Charts/AHT";
import userService from "../services/user";
import useCustomToast from "../components/LoginNotification";
import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallOverViewMetrics } from '../hooks/callOverviewMetrics';
const { showError } = useCustomToast();
import { Interaction } from '../utils/interfaces';
import { callOverviewAnalytics } from '../utils/interfaces';
import { Tooltip } from 'react-tooltip';

export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
  color?: string;
}

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const calculateTimeDifference = (classificationTime: string, currentTime: string) => {
  const [classificationHours, classificationMinutes, classificationSeconds] = classificationTime.split(":").map(Number);
  const [currentHours, currentMinutes, currentSeconds] = currentTime.split(":").map(Number);

  const classificationTotalSeconds = (classificationHours * 3600) + (classificationMinutes * 60) + classificationSeconds;
  const currentTotalSeconds = (currentHours * 3600) + (currentMinutes * 60) + currentSeconds;

  if (currentTotalSeconds <= classificationTotalSeconds) {
    return "00:00:00";
  }

  const differenceInSeconds = currentTotalSeconds - classificationTotalSeconds;

  return formatDuration(differenceInSeconds);
};

const CallOverview: React.FunctionComponent = () => {
  const { socket } = useWebSocket(); // get web socket connection
  const [agentInfo, setAgentInfo] = useState<Interaction | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { role, username, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeState, setActiveState] = useState("No data available");
  const [activeContactID, setActiveContactID] = useState("No call in progress");
  const [ActualSentiment, setActualSentiment] = useState("No call in progress");
  const { showError } = useCustomToast();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<callOverviewAnalytics>(() => ({
    agentTalk: 0,
    customerTalk: 0,
    nonTalk: 0,
    sentimentTrend: [],
    sentimentPercentages: {
      POSITIVE: 0,
      NEGATIVE: 0,
      NEUTRAL: 0
    },
    callDuration: 0,
    key: '',
    contactId: ''
  }));

  const [chartData, setChartData] = useState<PieChartDataItem[]>([
    { id: "Customer", label: "Customer Time", value: 0 },
    { id: "Agent", label: "Agent Time", value: 0, color: "#177E89" },
    { id: "Non-talk", label: "NonTalk Time", value: 0, color: "#C4B1AE" },
  ]);

  const [chartData2, setChartData2] = useState<PieChartDataItem[]>([
    { id: "Positive", label: "Positive", value: 0, color: "#6BBF70" },
    { id: "Neutral", label: "Neutral", value: 0, color: "#7E7F83" },
    { id: "Negative", label: "Negative", value: 0, color: "#E63B2E" },
  ]);

  const [sentimentData, setsentimentData] = useState([
    {
      id: "sentiment",
      data: [{ x: 0, y: 0 }],
    },
  ]);

  const [callDuration, setCallDuration] = useState<string>("00:00:00");

  // Static classification time
  const classificationTime = "00:00:50";

  // Load selected agent info from sessionStorage
  useEffect(() => {
    const selectedAgent = sessionStorage.getItem("selectedAgent");
    if (selectedAgent) {
      setAgentInfo(JSON.parse(selectedAgent));
      const agentState = JSON.parse(selectedAgent);
      console.log("Selected agent:", agentState); // Mostrar los datos de los agentes seleccionados en la consola
      setActiveState(agentState.state);
      setActiveContactID(agentState.contactId);
      setActualSentiment(agentState.sentiment);
    }
  }, []);

  // Load metrics from session storage
  useEffect(() => {
    if (activeContactID !== "No call in progress" && activeContactID !== undefined) {
      console.log("Active Contact ID:", activeContactID);
      const storedMetrics = sessionStorage.getItem('unhandledInteractions');
      console.log("Stored metrics:", storedMetrics); // Mostrar los datos de las métricas almacenadas en la consola
      if (storedMetrics) {
        const parsedMetrics = JSON.parse(storedMetrics);
        console.log("Parsed metrics:", parsedMetrics); // Mostrar los datos de las métricas analizadas en la consola
        const interaction = parsedMetrics.find((i: any) => i.state.contactId === activeContactID);
        if (interaction && interaction.sentiment.callOverviewAnalytics) {
          setMetrics(interaction.sentiment.callOverviewAnalytics);
        }
      }
    }
  }, [activeContactID]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (socket !== null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const segment = data.message;
        console.log("Data:", data); // Mostrar los datos en la consola
        const activeUsername = agentInfo?.username;

        if (segment) {
          const { segmentType } = segment;
          if (segmentType === "AGENT_EVENT") {
            // Update metrics or handle AGENT_EVENT
            if (activeUsername === data.message.username) {
              const newState = data.message.state;
              setActiveState(newState);
              console.log("Active State:", newState);
              if (activeState === "OFFLINE" || activeState === "AVAILABLE") {
                setActiveContactID("No call in progress");
                setActualSentiment("No call in progress");
              }
            }
            if (activeState === "ACW"){
              sessionStorage.removeItem('unhandledInteractions');
            }
            console.log("Segment type = AGENT EVENT", data.message.state); // Mostrar los datos de los segmentos en la consola
          } else if (segmentType === "SENTIMENT_ANALYSIS") {
            // Update sentiment analysis
            setActiveContactID(data.message.contactId);
            setActualSentiment(data.message.Sentiment);
            updateSentiment(segment);
            updateMetrics(segment);
            console.log("Segment type = SENTIMENT ANALYSIS:"); // Mostrar los datos de los segmentos en la consola
          }
        }
      };
    }
  }, [socket, agentInfo, setActiveState]);

  const usernamePic = agentInfo?.username;
  console.log("UsernamePic:", usernamePic);

  useEffect(() => {
    if (agentInfo && agentInfo.username) {
      userService
        .GetImageUrl(agentInfo.username)
        .then((url) => {
          console.log("URL obtenida:", url); // Mostrar el valor de url en la consola
          setImageURL(url.imageUrl); // Establecer el estado de imageURL con el resultado de la solicitud si es exitosa
        })
        .catch(error => {
          if (error.response && error.response.status === 401) { // Verificar si hay un error de autorización
            showError(error.response.data.error); // Mostrar el error
          } else {
            console.error("Error en la solicitud:", error); // Manejar otros posibles errores
          }
        });
    }
  }, [agentInfo]);

  useEffect(() => {
    userService
      .GetInfo(role!, username!) // call function that makes axios request
      .then((user) => {
        setUserInfo(user); // set userInfo state with the result from the request if it is successful
        setUserId(user.connectUserId); // store the user's id in the userId state variable
        console.log('User info:', user); // Print the user info
      })
      .catch(error => {
        if (error.response.status === 401) { // check for an authorization error
          showError(error.response.data.error); // display error
          setTimeout(() => { logout() }, 4000); // log user out
        }
      });
  }, []);

  const handleBargeIn = async (contactId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };

      const data = { participantId: userId, contactId: contactId };
      console.log('Sending data:', data); // Print the data

      await axios.post('http://localhost:3000/Supervisor/barge-in', data, config);
      console.log('Barged in successfully');
      navigate('/Supervisor/bargein');
    } catch (error) {
      console.log('Failed to barge in:', error);
      navigate('/Supervisor/bargein');
    }
  }

  const updateMetrics = (segment: any) => {
    // Update your metrics based on the segment data
    console.log("Metrics:", segment); // Mostrar los datos de los segmentos en la consola
    console.log('Updating metrics with segment: ', segment);

    if (segment.contactId !== activeContactID) {
      console.log('Segment does not match active contact ID, $ {segment.contactId}');
      return;
    }
    //format values for sentiment trend chart
    const sentimentValue = segment.Sentiment === "POSITIVE" ? 1 : segment.Sentiment === "NEGATIVE" ? -1 : 0;
    const timeStamp = Math.floor(segment.BeginOffsetMillis / 1000);

    setMetrics(prevMetrics => {
      const updatedMetrics: callOverviewAnalytics = {
        agentTalk: prevMetrics.agentTalk,
        customerTalk: prevMetrics.customerTalk,
        nonTalk: prevMetrics.nonTalk,
        sentimentTrend: [...prevMetrics.sentimentTrend, { x: timeStamp, y: sentimentValue }],
        sentimentPercentages: {
          POSITIVE: prevMetrics.sentimentPercentages.POSITIVE,
          NEGATIVE: prevMetrics.sentimentPercentages.NEGATIVE,
          NEUTRAL: prevMetrics.sentimentPercentages.NEUTRAL
        },
        callDuration: prevMetrics.callDuration
      };

      const sentimentKey = segment.Sentiment as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
      updatedMetrics.sentimentPercentages[sentimentKey] += 1;

      //increment intervention times by participant (for agent talk, customer talk, non talk)
      if (segment.ParticipantRole === "AGENT") {
        updatedMetrics.agentTalk += Math.floor((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000);
      }
      else if (segment.ParticipantRole === "CUSTOMER") {
        updatedMetrics.customerTalk += Math.floor((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000);
      }
      else {
        updatedMetrics.nonTalk += Math.floor((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000);
      }

      //calculate call duration 
      updatedMetrics.callDuration = updatedMetrics.callDuration + Math.floor((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000);

      return updatedMetrics; // Return the updated metrics
    });
  }

  useEffect(() => {
    setChartData([
      { id: "Customer", label: "Customer Time", value: metrics.customerTalk, color: "#244F26" },
      { id: "Agent", label: "Agent Time", value: metrics.agentTalk, color: "#177E89" },
      { id: "Non-talk", label: "NonTalk Time", value: metrics.nonTalk, color: "#C4B1AE" },
    ]);

    setsentimentData([
      {
        id: "sentiment",
        data: metrics.sentimentTrend,
      },
    ]);

    setChartData2([
      { id: "Positive", label: "Positive", value: metrics.sentimentPercentages.POSITIVE, color: "#439D49" },
      { id: "Neutral", label: "Neutral", value: metrics.sentimentPercentages.NEUTRAL, color: "#7E7F83" },
      { id: "Negative", label: "Negative", value: metrics.sentimentPercentages.NEGATIVE, color: "#B72015" },
    ]);

    setCallDuration(formatDuration(metrics.callDuration)); // Ensure callDuration is formatted

    console.log("Agent Talk:", metrics.agentTalk);
    console.log("Customer Talk:", metrics.customerTalk);
    console.log("Non Talk:", metrics.nonTalk);
    console.log("Sentiment Trend:", metrics.sentimentTrend);
    console.log("Sentiment Percentages:", metrics.sentimentPercentages);
    console.log("Call Duration:", metrics.callDuration);

  }, [metrics]);

  const updateSentiment = (segment: any) => {
    // Update your sentiment data based on the segment data
    console.log('Updating sentiment with segment: ', segment);
    // Example logic to update sentiment data
    // setChartData2(...);
  };

  const exceededTime = calculateTimeDifference(classificationTime, callDuration);

  return (
    <PageStructure title="Call Overview">
      <div className="grid items-center justify-center w-full h-full grid-cols-1 gap-4 p-2 lg:grid-cols-12">
        {/* AGENT CARD */}
        <div className="flex items-center justify-center w-[100%] h-full lg:col-span-4 sm:col-span-12">
          {agentInfo ? (
            <div className="h-full">
              <CallCard
                agentname={agentInfo.agentFirstName} //{agentInfo.agentFirstName}
                agentposition="Agent"
                agentState={activeState || "No data available"}
                agentQueue={agentInfo.queueName || "No data available"}
                actualSentiment={ActualSentiment || "No agent in call"}
                contactID={activeContactID || "No call in progress"}
                talktime={callDuration || "00:00:00"} // Use formatted callDuration
                username={agentInfo.username || "No data available"}
                routingProfile={agentInfo.routingProfile || "No data available"}
                imageURL={userImage || "/avatar.png"}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {/* Tables Grid */}
        <div className="z-30 h-full lg:col-span-8 sm:col-span-12">
          <div className="flex items-center justify-between pt-2 mb-4">
            <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
            <button
              className="w-5/12 px-4 py-3 text-white rounded-lg shadow bg-secondary hover:opacity-75 mr-7"
              onClick={() => handleBargeIn(agentInfo?.contactId || '')} // Use agentInfo.contactId here
              disabled={!agentInfo?.contactId} // Disable the button if contactId is not available
            >
              Barge In
            </button>
          </div>
          <div className="grid w-full h-[80%] grid-cols-1 gap-2 lg:grid-cols-2 lg:col-span-8 z-30">
            <div className="bg-white rounded-md shadow-lg card"
              data-tooltip-id="tooltipTalkTime"
              data-tooltip-content="This is the total talk time.">
              <h3 className="text-lg font-bold text-center text-slategray">Talk time</h3>
              <div className="h-[90%]">
                <MyPieChart data={chartData} unit="seconds" />
              </div>
              <Tooltip id="tooltipTalkTime" className="custom-tooltip" />
            </div>

            <div className="bg-white rounded-md shadow-lg card"
              data-tooltip-id="tooltipSentiment"
              data-tooltip-content="This is the sentiment analysis.">
              <h3 className="text-lg font-bold text-center text-slategray">Sentiment</h3>
              <div className="h-[90%]">
                <MyPieChart data={chartData2} unit="percent" />
              </div>
              <Tooltip id="tooltipSentiment" className="custom-tooltip" />
            </div>

            <div className="bg-white rounded-md shadow-lg card"
              data-tooltip-id="tooltipSentimentTrend"
              data-tooltip-content="This shows the sentiment trend over time.">
              <h3 className="text-lg font-bold text-center text-slategray">Sentiment Trend</h3>
              <div className="h-[50%]">
                <MyLineChart data={sentimentData} />
              </div>
              <Tooltip id="tooltipSentimentTrend" className="custom-tooltip" />
            </div>

            <div className="bg-white rounded-md shadow-lg card"
              data-tooltip-id="tooltipAHT"
              data-tooltip-content="Average Handling Time">
              <h3 className="pb-3 text-lg font-bold text-center text-slategray">Average Handling Time</h3>
              <div className="h-[50%]">
                <AHT classificationTime={classificationTime} currentTime={callDuration} exceededTime={exceededTime} />
              </div>
              <Tooltip id="tooltipAHT" className="custom-tooltip" />
            </div>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default CallOverview;
