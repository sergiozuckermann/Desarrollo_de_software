import { FunctionComponent, useState } from "react";
import PageStructure from "../components/PageStructure";
import CCPComponent from "../components/CCPComponent";
import Chatbot from "../components/Chatbot";
import Popup from "../components/Popup";
import Suggestions from "../components/Suggestions";

const AgentHome: FunctionComponent = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleSuggestionSelect = (suggestionText: string) => {
    setSelectedSuggestion(suggestionText);
  };
  return (
    <PageStructure title="Worksspace">
    <div className="overflow-y-auto max-h-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="h-[100%]">
          <CCPComponent />
          </div>
        </div>
        <div className="col-span-1">
          <Chatbot selectedSuggestion={selectedSuggestion} />
        </div>
        <div className="col-span-1">
          <Suggestions onSuggestionSelect={handleSuggestionSelect} />
        </div>
      </div>
    </div>
    <Popup onClose={() => console.log("Popup closed")} />
  </PageStructure>

  );
};

export default AgentHome;

