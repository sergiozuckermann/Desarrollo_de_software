import PageStructure from "../components/PageStructure";

interface CardProps {
    title: string;
    children: React.ReactNode;
  }
  
  const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
      <div className="h-full p-4 border-2 border-gray-400 shadow-lg rounded-xl md:block bg-tertiary">
        <h2 className="mb-4 text-lg font-bold text-gray-600 font-roboto">{title}</h2>
        {children}
      </div>
    );
  };
  

const MainContent = () => {
    return (
        <div className="grid w-full h-full grid-cols-1 gap-4 p-4 md:grid-cols-12">
{/* AGENT CARD */}
            <div className="md:col-span-4">
                {/* Contenido */}
            </div>
{/* Tables Grid */}
            <div className="h-full md:col-span-8">
                    <div className="flex items-center justify-between pt-4 mb-4">
                        <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
                        <button className="px-4 py-2 text-white rounded shadow bg-secondary">Barge In</button>
                    </div>
                    <div className="grid h-[85%] grid-cols-1 gap-4 md:grid-cols-2 md:col-span-8">

                        <Card title="Talk time">
                        </Card>
                        
                        <Card title="Sentiment">       
                        </Card>

                        <Card title="Sentiment Trend">
                        </Card>

                        <Card title="Average Handling Time">
                        </Card>
                    </div>
                </div>
        </div>
      );
    };



const CallOverview= () => {
    return (
      <PageStructure title="Call Overview">
        <MainContent />
      </PageStructure>
    );
  };
  
  export default CallOverview;
  