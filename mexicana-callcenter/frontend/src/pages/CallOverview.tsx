import React, { useEffect, useState } from 'react';
import { useWebSocket } from "../hooks/useWebSocket";
import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import MyLineChart from "../components/Charts/linechart";
import CallCard from '../components/Callinfo';
import Card from '../components/Card';
import AHT from "../components/Charts/AHT";
import userService from "../services/user";
import useCustomToast from "../components/LoginNotification";
import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { showError } = useCustomToast();

export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

export interface SentimentDataItem {
  x: string;
  y: number;
}

const CallOverview: React.FunctionComponent = () => {
  const { socket } = useWebSocket(); // get web socket connection
  const [agentInfo, setAgentInfo] = useState<{
    agentFirstName: string;
    key?: string;
    contactId?: string;
    state: string;
    sentiment?: string;
    queueName?: string;
    username: string;
    routingProfile: string;
  } | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { role, username, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeState, setActiveState] = useState("No data available");
  const [activeContactID, setActiveContactID] = useState("No call in progess");
  const [ActualSentiment, setActualSentiment] = useState("No call in progress");
  const [customerTalkTime, setCustomerTalkTime] = useState(0);
  const [agentTalkTime, setAgentTalkTime] = useState(0);
  const [nonTalkTime, setNonTalkTime] = useState(0);
  const [totalCallTime, setTotalCallTime] = useState(0);
  const { showError } = useCustomToast();
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<PieChartDataItem[]>([
    { id: "Customer", label: "Customer Time", value: 0 },
    { id: "Agent", label: "Agent Time", value: 0 },
    { id: "Non-talk", label: "NonTalk Time", value: 0 },
  ]);

  const [chartData2, setChartData2] = useState<PieChartDataItem[]>([
    { id: "Positive", label: "Positive", value: 0 },
    { id: "Neutral", label: "Neutral", value: 0 },
    { id: "Negative", label: "Negative", value: 0 },
  ]);

  const [sentimentCounts, setSentimentCounts] = useState({
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  });

  const [sentimentData, setsentimentData] = useState<{ id: string; data: SentimentDataItem[] }[]>([
    {
      id: "sentiment",
      data: [],
    },
  ]);

  const [callDuration, setCallDuration] = useState<string>("00:00:00");

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

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (socket !== null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const segment = data.message;
        const metrics = data.metrics;
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
            console.log("Segment type = AGENT EVENT", data.message.state); // Mostrar los datos de los segmentos en la consola
          } else if (segmentType === "SENTIMENT_ANALYSIS") {
            // Update sentiment analysis
            setActiveContactID(data.message.contactId);
            setActualSentiment(data.message.Sentiment);
            updateSentiment(segment);
            handleSentimentSegment(segment);
            updateTalkTimes(segment);
            console.log("Segment type = SENTIMENT ANALYSIS:"); // Mostrar los datos de los segmentos en la consola
          }
        }
        if (metrics) {
          // Update metrics
          updateMetrics(metrics);
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

  const updateMetrics = (metrics: any) => {
    // Update your metrics based on the segment data
    console.log("Metrics:", metrics); // Mostrar los datos de los segmentos en la consola
    console.log('Updating metrics with segment: ', metrics);

    const { agentTalk, customerTalk, nonTalk, sentimentTrend, sentimentPercentages, callDuration } = metrics;

    console.log("Agent Talk:", agentTalk);
    console.log("Customer Talk:", customerTalk);
    console.log("Non Talk:", nonTalk);
    console.log("Sentiment Trend:", sentimentTrend);
    console.log("Sentiment Percentages:", sentimentPercentages);
    console.log("Call Duration:", callDuration);

    // setChartData([
    //   { id: "Customer", label: "Customer Time", value: customerTalk },
    //   { id: "Agent", label: "Agent Time", value: agentTalk },
    //   { id: "Non-talk", label: "NonTalk Time", value: nonTalk },
    // ]);

    setChartData2([
      { id: "Positive", label: "Positive", value: sentimentPercentages.positive },
      { id: "Neutral", label: "Neutral", value: sentimentPercentages.neutral },
      { id: "Negative", label: "Negative", value: sentimentPercentages.negative },
    ]);

    setsentimentData([
      {
        id: "sentiment",
        data: sentimentTrend.map((trend: { x: any; y: any; }) => ({ x: trend.x, y: trend.y }))
      },
    ]);

    setCallDuration(callDuration);

  };
  const updateTalkTimes = (segment: any) => {
    console.log('Updating talk times with segment: ', segment);

    const beginTime = segment.BeginOffsetMillis;
    const endTime = segment.EndOffsetMillis;
    const talkTime = endTime - beginTime; // Calcular tiempo de conversación
  
    if (segment.ParticipantRole === 'CUSTOMER') {
      setCustomerTalkTime((prevCustomerTalkTime) => prevCustomerTalkTime + talkTime);
      console.log("This is a customer event", customerTalkTime);
    } 
    if (segment.ParticipantRole === 'AGENT') {
      console.log("This is an agent event", agentTalkTime);
      setAgentTalkTime((prevAgentTalkTime) => prevAgentTalkTime + talkTime);
    }

    setTotalCallTime(endTime);

    const newNonTalkTime = endTime - customerTalkTime - agentTalkTime;
    setNonTalkTime(newNonTalkTime);

    const total = customerTalkTime + agentTalkTime + newNonTalkTime;

    console.log("Customer Time:", customerTalkTime);
    console.log("Agent Time:", agentTalkTime);
    console.log("Non-talk Time:", newNonTalkTime, nonTalkTime);
    console.log("Total Time:", total);

    const customerPercentage = total !== 0 ? (customerTalkTime / total) * 100 : 0;
    const agentPercentage = total !== 0 ? (agentTalkTime / total) * 100 : 0;
    const nonTalkPercentage = total !== 0 ? (newNonTalkTime / total) * 100 : 0;

    console.log("Customer Percentage:", customerPercentage);
    console.log("Agent Percentage:", agentPercentage);
    console.log("Non-talk Percentage:", nonTalkPercentage);

    setChartData([
        { id: "Customer", label: "CustomerTime", value: customerPercentage },
        { id: "Agent", label: "AgentTime", value: agentPercentage },
        { id: "Non-talk", label: "NonTalkTime", value: nonTalkPercentage },
    ]);
};
  

  const updateSentiment = (segment: any) => {
    console.log('Updating sentiment with segment: ', segment);
    
    const sentimentValueMapping: { [key: string]: number } = {
      "POSITIVE": 1,
      "NEUTRAL": 0,
      "NEGATIVE": -1,
    };

    const sentimentValue = sentimentValueMapping[segment.Sentiment] || 0;
    const newSentimentDataPoint = {
      x: new Date().toLocaleTimeString(), 
      y: sentimentValue,
    };

    setsentimentData(prevData => {
      const updatedData = [...prevData[0].data, newSentimentDataPoint];
      return [{ id: "sentiment", data: updatedData }];
    });
  };

  const updateSentimentChartData = (sentiment: string) => {
    setSentimentCounts(prevCounts => {
      const updatedCounts = { ...prevCounts, [sentiment]: prevCounts[sentiment] + 1 };
      const total = updatedCounts.Positive + updatedCounts.Neutral + updatedCounts.Negative;
      const positivePercentage = (updatedCounts.Positive / total) * 100;
      const neutralPercentage = (updatedCounts.Neutral / total) * 100;
      const negativePercentage = (updatedCounts.Negative / total) * 100;

      setChartData2([
        { id: "Positive", label: "Positive", value: positivePercentage },
        { id: "Neutral", label: "Neutral", value: neutralPercentage },
        { id: "Negative", label: "Negative", value: negativePercentage },
      ]);

      return updatedCounts;
    });
  };

  // Función para manejar los segmentos de análisis de sentimiento
  const handleSentimentSegment = (segment: any) => {
    const sentimentValueMapping: { [key: string]: string } = {
      "POSITIVE": "Positive",
      "NEUTRAL": "Neutral",
      "NEGATIVE": "Negative",
    };

    const sentiment = sentimentValueMapping[segment.Sentiment] || "Neutral";
    updateSentimentChartData(sentiment); // Llama a la función para actualizar chartData2
  };


  return (
    <PageStructure title="Call Overview">
      <div className="grid items-center justify-center w-full h-full grid-cols-1 gap-4 p-2 overflow-y-auto lg:grid-cols-12">
        {/* AGENT CARD */}
        <div className="flex items-center justify-center lg:col-span-4 sm:col-span-12">
          {agentInfo ? (
            <CallCard
              agentname={agentInfo.agentFirstName} //{agentInfo.agentFirstName}
              agentposition="Agent"
              agentState={activeState || "No data available"}
              agentQueue={agentInfo.queueName || "No data available"}
              actualSentiment={ActualSentiment || "No agent in call"}
              contactID={activeContactID || "No call in progress"}
              talktime="00:03:10"
              username={agentInfo.username || "No data available"}
              routingProfile={agentInfo.routingProfile || "No data available"}
              imageURL={userImage || "/avatar.png"}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {/* Tables Grid */}
        <div className="z-30 h-full lg:col-span-8 sm:col-span-12">
          <div className="flex items-center justify-between pt-4 mb-4">
            <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
            <button
              className="w-5/12 px-4 py-3 text-white rounded-lg shadow bg-secondary hover:opacity-75 mr-7"
              onClick={() => handleBargeIn(agentInfo?.contactId || '')} // Use agentInfo.contactId here
              disabled={!agentInfo?.contactId} // Disable the button if contactId is not available
            >
              Barge In
            </button>          
          </div>
          <div className="grid w-[100%] h-[80%] grid-cols-1 gap-2 lg:grid-cols-2 lg:col-span-8 z-30">
            <Card title="Talk time">
              <MyPieChart data={chartData} unit="percent" />
            </Card>
            <Card title="Sentiment">
              <MyPieChart data={chartData2} unit="percent" />
            </Card>
            <Card title="Sentiment Trend">
              <MyLineChart data={sentimentData} />
            </Card>
            <Card title="Average Handling Time">
              <AHT classificationTime="00:03:10" currentTime={callDuration} exceededTime="00:01:02" />
            </Card>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default CallOverview;
