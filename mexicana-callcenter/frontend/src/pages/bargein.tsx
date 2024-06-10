import { FunctionComponent, useState } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import Suggestions from "../components/Suggestions";
import Chatbot from "../components/Chatbot";


const BargeIn: FunctionComponent = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleSuggestionSelect = (suggestionText: string) => {
    setSelectedSuggestion(suggestionText);
  };
  return(
  <PageStructure title="Barge In">
    <div className="max-h-full p-4 overflow-y-hidden">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
            <ConnectHere />
          </div>
        </div>
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
          < Chatbot selectedSuggestion={selectedSuggestion} />
          </div>
        </div>
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
            <Suggestions onSuggestionSelect={handleSuggestionSelect} />
          </div>
        </div>
      </div>
    </div>
  </PageStructure>
);
}
export default BargeIn;
