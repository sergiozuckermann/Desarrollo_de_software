import React, { useEffect, useState } from 'react';
import { useWebSocket } from "../hooks/useWebSocket";
import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import MyLineChart from "../components/Charts/linechart";
import CallCard from '../components/Callinfo';
import Card from '../components/Card';
import AHT from "../components/Charts/AHT";
import userService from "../services/user"
import useCustomToast from "../components/LoginNotification";
import { useAuth } from '../hooks/useAuth'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { showError } = useCustomToast();

export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
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
  const { role, username, logout } = useAuth()
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { showError } = useCustomToast();
  const navigate = useNavigate();
  let activeState = agentInfo?.state;



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

  const [sentimentData, setsentimentData] = useState([
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
              activeState = data.message.state;
              console.log("Active State:", activeState);
            }

            console.log("Segment type = AGENT EVENT", data.message.state); // Mostrar los datos de los segmentos en la consola
            //updateMetrics(segment);
          } else if (segmentType === "SENTIMENT_ANALYSIS") {
            // Update sentiment analysis
            updateSentiment(segment);
            console.log("Segment type = SENTIMENT ANALYSIS:"); // Mostrar los datos de los segmentos en la consola
          }
        }
        if (metrics) {
          // Update metrics
          updateMetrics(metrics);
        }
      };
    }
  }, [socket]);

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

    setChartData([
      { id: "Customer", label: "Customer Time", value: customerTalk },
      { id: "Agent", label: "Agent Time", value: agentTalk },
      { id: "Non-talk", label: "NonTalk Time", value: nonTalk },
    ]);

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
  console.log("Active state global", activeState);

  const updateSentiment = (segment: any) => {
    // Update your sentiment data based on the segment data
    console.log('Updating sentiment with segment: ', segment);
    // Example logic to update sentiment data
    // setChartData2(...);
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
              actualSentiment={agentInfo.sentiment || "No agent in call"}
              contactID={agentInfo.contactId || "No agent in call"}
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
            </button>          </div>
          <div className="grid w-[100%] h-[80%] grid-cols-1 gap-2 lg:grid-cols-2 lg:col-span-8 z-30">
            <Card title="Talk time">
              <MyPieChart data={chartData} unit="seconds" />
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
