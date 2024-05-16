import React from 'react';

const Suggestions = () => {
    return (
        <div className=" w-full rounded-lgh-full w-full rounded-lg bg-gray-100 border border-gray-400 p-4 sm:p-8" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            <div>
            <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8"> Hi, looking for help? </h1>
            <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-roboto mb-8"> Suggestions </h2>

            <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto">
          <ul className="divide-y-2 divide-gray-500">
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How do I help a customer book a flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">Adding additional services to a reservation</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I assist a customer with canceling a flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto"> Loyalty program information</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto"> How can I assist a customer in claiming their lost luggage during a connecting flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change the customer's name on a paid flight?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change a customer's flight destination?</h3>
              </a>
            </li>
            <li>
              <a href="#" className="block p-5 hover:bg-gray-200">
                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How to select a customer's seat?</h3>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;