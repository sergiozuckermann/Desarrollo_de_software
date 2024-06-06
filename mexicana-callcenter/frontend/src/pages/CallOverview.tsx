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
const { showError } = useCustomToast();



export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}
export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

const CallOverview: React.FunctionComponent = () => {
  const { socket } = useWebSocket(); // get web socket connection
  const [agentInfo, setAgentInfo] = useState<{
    agentFirstName: string;
    key? : string;
    contactId?: string;
    state: string;
    sentiment?: string;
    queueName?: string;
    username: string;
    routingProfile: string;
  } | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);

  const [chartData, setChartData] = useState<PieChartDataItem[]>([
    { id: "Customer", label: "Talk Time", value: 64 },
    { id: "Agent", label: "Wait Time", value: 35 },
    { id: "Non-talk", label: "Hold Time", value: 20 },
  ]);

  const [chartData2, setChartData2] = useState<PieChartDataItem[]>([
    { id: "Positive", label: "Positive", value: 64 },
    { id: "Neutral", label: "Neutral", value: 52 },
    { id: "Negative", label: "Negative", value: 12 },
  ]);

  const sentimentData = [
    {
      id: "sentiment",
      data: [
        { x: "0", y: 0 },
        { x: "10", y: 2 },
        { x: "20", y: -3 },
        { x: "30", y: 1 },
        { x: "40", y: 4 },
        { x: "50", y: -1 },
      ],
    },
  ];

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

        if (segment) {
          const { segmentType } = segment;
          if (segmentType === "AGENT_EVENT") {
            // Update metrics or handle AGENT_EVENT
            updateMetrics(segment);
          } else if (segmentType === "SENTIMENT_ANALYSIS") {
            // Update sentiment analysis
            updateSentiment(segment);
          }
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
  const updateMetrics = (segment: any) => {
    // Update your metrics based on the segment data
    console.log('Updating metrics with segment: ', segment);
    // Example logic to update chart data
    // setChartData(...);
  };

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
              agentState={agentInfo.state}
              agentQueue={agentInfo.queueName || "No data available"}
              actualSentiment={agentInfo.sentiment || "No agent in call"}
              contactID={agentInfo.contactId || "No agent in call"}
              talktime="00:03:10"
              username={agentInfo.username || "No data available"}
              routingProfile={agentInfo.routingProfile || "No data available" }
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
            <button className="w-5/12 px-4 py-3 text-white rounded-lg shadow bg-secondary hover:opacity-75 mr-7" onClick={() => window.location.href = '/supervisor/bargein'}>Barge In</button>
          </div>
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
              <AHT classificationTime="00:03:10" currentTime="00:04:12" exceededTime="00:01:02" />
            </Card>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default CallOverview;
