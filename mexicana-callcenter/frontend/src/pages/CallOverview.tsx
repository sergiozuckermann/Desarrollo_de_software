import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import MyLineChart from "../components/Charts/linechart";
import CallCard from '../components/Callinfo';
import Card from '../components/Card';
import AHT from "../components/Charts/AHT";
import { useEffect, useState } from "react";
import userService from "../services/user";
import { useAuth } from '../hooks/useAuth'
import axios from "axios";
import useCustomToast from "../components/LoginNotification";
import { useNavigate } from "react-router-dom";



//Aqui va la obtencion de los siguientes datos del aguente visitado: nombre del agente, puesto del agente 

//Aqui va la obtencion de los siguientes datos sobre la llamada: Asunto, Cliente, Prioridad, Razon, Tiempo de la llamada



export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

const MainContent = () => {
  // Mock data
  const { role, username, logout } = useAuth()
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { showError } = useCustomToast();
  const navigate = useNavigate();



  const mockData: PieChartDataItem[] = [
    { id: "Customer", label: "Talk Time", value: 64 },
    { id: "Agent", label: "Wait Time", value: 35 },
    { id: "Non-talk", label: "Hold Time", value: 20 },
  ];

  // State initialized with mock data
  const [chartData, setChartData] = useState<PieChartDataItem[]>(mockData)

  const AnalysisData: PieChartDataItem[] = [
    { id: "Positive", label: "Positive", value: 64 },
    { id: "Neutral", label: "Neutral", value: 52 },
    { id: "Negative", label: "Negative", value: 12 },
  ];

  // State initialized with mock data
  const [chartData2, setChartData2] = useState<PieChartDataItem[]>(AnalysisData)


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
      ]
    }
  ];

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

  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-1 gap-4 p-2 overflow-y-auto lg:grid-cols-12">
      {/* AGENT CARD */}
      <div className="flex items-center justify-center lg:col-span-4 sm:col-span-12">
        <CallCard agentname="Juan"
          agentposition="agent"
          callclasification="Buy a ticket"
          clientname="Natalia"
          priority="high"
          reason="High voice volume"
          talktime={"05:30"} />
      </div>
      {/* Tables Grid */}
      <div className="z-30 h-full lg:col-span-8 sm:col-span-12">
        <div className="flex items-center justify-between pt-4 mb-4">
          <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
          <button className="w-5/12 px-4 py-3 text-white rounded-lg shadow bg-secondary hover:opacity-75 mr-7" onClick={() => handleBargeIn('f4b2bcba-f81d-45cc-b144-773758d03d49')}>Barge In</button>
        </div>
        <div className="grid w-[100%] h-[80%]  grid-cols-1 gap-2 lg:grid-cols-2 lg:col-span-8 z-30">
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
  );
};


const CallOverview = () => {
  return (
    <PageStructure title="Call Overview">
      <MainContent />
    </PageStructure>
  );
};

export default CallOverview;