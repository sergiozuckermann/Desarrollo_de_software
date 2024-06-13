// Importing necessary libraries, hooks, services, and components
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

// Function to format duration in seconds to a string in the format HH:MM:SS
const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
// Function to calculate the time difference between classification time and current time
const calculateTimeDifference = (classificationTime: string, currentTime: string) => {
  // Splitting the times into hours, minutes, and seconds and converting them to numbers
  const [classificationHours, classificationMinutes, classificationSeconds] = classificationTime.split(":").map(Number);
  const [currentHours, currentMinutes, currentSeconds] = currentTime.split(":").map(Number);
  
  // Calculating the total seconds for each time
  const classificationTotalSeconds = (classificationHours * 3600) + (classificationMinutes * 60) + classificationSeconds;
  const currentTotalSeconds = (currentHours * 3600) + (currentMinutes * 60) + currentSeconds;
  
  // If the current time is less than or equal to the classification time, return "00:00:00"
  if (currentTotalSeconds <= classificationTotalSeconds) {
    return "00:00:00";
  }
  // Calculate the difference in seconds between the current time and the classification time
  const differenceInSeconds = currentTotalSeconds - classificationTotalSeconds;
  
  // Return the difference formatted as HH:MM:SS
  return formatDuration(differenceInSeconds);
};
// Defining the CallOverview component
const CallOverview: React.FunctionComponent = () => {
  // Using the useWebSocket hook to get the socket
  const { socket } = useWebSocket();

  // Using the useState hook to manage the state for agentInfo, userImage, userInfo, activeState, activeContactID, and ActualSentiment
  const [agentInfo, setAgentInfo] = useState<Interaction | null>(null); // State for the agent's information
  const [userImage, setImageURL] = useState<string | null>(null); // State for the user's image
  const { role, username, logout } = useAuth(); // Using the useAuth hook to get the user's role, username, and the logout function
  const [userInfo] = useState<string | null>(null); // State for the user's information
  const [activeState, setActiveState] = useState("No data available"); // State for the active state
  const [activeContactID, setActiveContactID] = useState("No call in progress"); // State for the active contact ID
  const [ActualSentiment, setActualSentiment] = useState("No call in progress"); // State for the actual sentiment
  const { showError } = useCustomToast(); // Using the useCustomToast hook to get the showError function
  const navigate = useNavigate(); // Using the useNavigate hook to navigate to different pages

  // Using the useState hook to manage the state for metrics, chartData, chartData2, sentimentData, and callDuration
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
  // State for the chart data
  const [chartData, setChartData] = useState<PieChartDataItem[]>([
    { id: "Customer", label: "Customer Time", value: 0 },
    { id: "Agent", label: "Agent Time", value: 0, color: "#177E89" },
    { id: "Non-talk", label: "NonTalk Time", value: 0, color: "#C4B1AE" },
  ]);
  // State for the second chart data
  const [chartData2, setChartData2] = useState<PieChartDataItem[]>([
    { id: "Positive", label: "Positive", value: 0, color: "#6BBF70" },
    { id: "Neutral", label: "Neutral", value: 0, color: "#7E7F83" },
    { id: "Negative", label: "Negative", value: 0, color: "#E63B2E" },
  ]);
  // State for the sentiment data
  const [sentimentData, setsentimentData] = useState([
    {
      id: "sentiment",
      data: [{ x: 0, y: 0 }],
    },
  ]);
  // State for the call duration
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
  // Get the user's image URL
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
  // Function to update the metrics
  const updateMetrics = (metrics: callOverviewAnalytics) => {
    console.log("Metrics:", metrics);
    if (metrics) {
      setMetrics(metrics);
      updateCharts(metrics);
    }
  };
  // Function to update the charts
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
    // Update the second chart data
    setChartData2([
      { id: "Positive", label: "Positive", value: sentimentPercentages.POSITIVE, color: "#6BBF70" },
      { id: "Neutral", label: "Neutral", value: sentimentPercentages.NEUTRAL, color: "#7E7F83" },
      { id: "Negative", label: "Negative", value: sentimentPercentages.NEGATIVE, color: "#E63B2E" },
    ]);

    const sentimentData = metrics.sentimentTrend.map((point: SentimentTrend) => ({ x: point.time, y: point.sentiment }));
    setsentimentData([{ id: "sentiment", data: sentimentData }]);
  };
  // Function to update the sentiment
  const updateSentiment = (segment: any) => {
    setActualSentiment(segment.Sentiment);
    setActiveContactID(segment.contactId);
  };
  // Update the call duration every second
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
  // Redirect to the login page if the user is not logged in
  useEffect(() => {
    if (!role) {
      navigate('/login');
      logout();
    }
  }, [role, navigate, logout]);
  // Return the JSX of the CallOverview component
  return (
    <div>
      {/* Page Structure Component */}
      <PageStructure title="Call Overview" userId={username} userImage={userImage} userInfo={userInfo} />
      <div className="grid grid-cols-3 gap-4">
        {/* Card for Call Overview information */}
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