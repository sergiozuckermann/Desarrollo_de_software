import React, { useEffect, useState } from 'react';
import { useWebSocket } from "../hooks/useWebSocket";
import userService from "../services/user";
import useCustomToast from "../components/LoginNotification";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { Interaction, callOverviewAnalytics, SentimentTrend } from '../utils/interfaces';
import PageStructure from '../components/PageStructure';
import CallCard from '../components/Callinfo';
import MyPieChart, { PieChartDataItem } from '../components/Charts/piechart';
import MyLineChart from '../components/Charts/linechart';
import AHT from '../components/Charts/AHT';

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
  const { socket } = useWebSocket();
  const [agentInfo, setAgentInfo] = useState<Interaction | null>(null);
  const [userImage, setImageURL] = useState<string | null>(null);
  const { role, username, logout } = useAuth();
  const [userInfo] = useState<string | null>(null);
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
      console.log("Selected agent:", agentState);
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
      console.log("Stored metrics:", storedMetrics);
      if (storedMetrics) {
        const parsedMetrics = JSON.parse(storedMetrics);
        console.log("Parsed metrics:", parsedMetrics);
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
        const metrics = data.metrics;
        const activeUsername = agentInfo?.username;

        if (segment) {
          const { segmentType } = segment;
          if (segmentType === "AGENT_EVENT") {
            if (activeUsername === data.message.username) {
              const newState = data.message.state;
              setActiveState(newState);
              console.log("Active State:", newState);
              if (newState === "OFFLINE" || newState === "AVAILABLE") {
                setActiveContactID("No call in progress");
                setActualSentiment("No call in progress");
              }
            }
            console.log("Segment type = AGENT EVENT", data.message.state);
            if (data.message.state === "ACW") {
              sessionStorage.removeItem('unhandledInteractions');
            }
          } else if (segmentType === "SENTIMENT_ANALYSIS") {
            setActiveContactID(data.message.contactId);
            setActualSentiment(data.message.Sentiment);
            updateSentiment(segment);
            console.log("Segment type = SENTIMENT ANALYSIS:");
          }
        }
        if (metrics) {
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
          console.log("URL obtained:", url);
          setImageURL(url.imageUrl);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            showError(error.response.data.error);
          } else {
            console.error("Request error:", error);
          }
        });
    }
  }, [agentInfo]);

  const updateMetrics = (metrics: callOverviewAnalytics) => {
    console.log("Metrics:", metrics);
    if (metrics) {
      setMetrics(metrics);
      updateCharts(metrics);
    }
  };

  const updateCharts = (metrics: callOverviewAnalytics) => {
    const { agentTalk, customerTalk, nonTalk, sentimentPercentages } = metrics;

    const totalTalk = agentTalk + customerTalk + nonTalk;
    if (totalTalk > 0) {
      const agentTalkPercentage = (agentTalk / totalTalk) * 100;
      const customerTalkPercentage = (customerTalk / totalTalk) * 100;
      const nonTalkPercentage = (nonTalk / totalTalk) * 100;

      setChartData([
        { id: "Customer", label: "Customer Time", value: customerTalkPercentage, color: "#177E89" },
        { id: "Agent", label: "Agent Time", value: agentTalkPercentage, color: "#084C61" },
        { id: "Non-talk", label: "NonTalk Time", value: nonTalkPercentage, color: "#C4B1AE" },
      ]);
    }

    setChartData2([
      { id: "Positive", label: "Positive", value: sentimentPercentages.POSITIVE, color: "#6BBF70" },
      { id: "Neutral", label: "Neutral", value: sentimentPercentages.NEUTRAL, color: "#7E7F83" },
      { id: "Negative", label: "Negative", value: sentimentPercentages.NEGATIVE, color: "#E63B2E" },
    ]);

    const sentimentData = metrics.sentimentTrend.map((point: SentimentTrend) => ({ x: point.time, y: point.sentiment }));
    setsentimentData([{ id: "sentiment", data: sentimentData }]);
  };

  const updateSentiment = (segment: any) => {
    setActualSentiment(segment.Sentiment);
    setActiveContactID(segment.contactId);
  };

  useEffect(() => {
    if (metrics && metrics.callDuration) {
      const interval = setInterval(() => {
        const currentTime = new Date().toISOString().substr(11, 8);
        const duration = calculateTimeDifference(classificationTime, currentTime);
        setCallDuration(duration);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [metrics]);

  useEffect(() => {
    if (!role) {
      navigate('/login');
      logout();
    }
  }, [role, navigate, logout]);

  return (
    <div>
      <PageStructure title="Call Overview" userId={username} userImage={userImage} userInfo={userInfo} />
      <div className="grid grid-cols-3 gap-4">
        <CallCard title="Active State" content={activeState} />
        <CallCard title="Contact ID" content={activeContactID} />
        <CallCard title="Actual Sentiment" content={ActualSentiment} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MyPieChart data={chartData} unit="%" />
        <MyPieChart data={chartData2} unit="%" />
        <AHT callDuration={callDuration} />
      </div>
      <MyLineChart data={sentimentData} />
    </div>
  );
};

export default CallOverview;