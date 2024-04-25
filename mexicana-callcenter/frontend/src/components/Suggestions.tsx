import React from 'react';

const Suggestions = () => {
    return (
        <div className="h-[100%] w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            <div>
                <h1 className="ml-8 mt-11"style={{fontFamily: "Roboto", fontSize: "40px" }}>
                    Hi, looking for help?
                </h1>
                <h2 className="ml-8 mt-11"style={{fontFamily: "sans-serif", fontSize: "27px" }}>
              Suggestions
            </h2>
            {/*SCROLL FOR SUGGESTIONS*/}
            <div className="overflow-y-scroll h-[450px]">
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a costumer book a flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  Adding additional services to a reservation
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a costumer to cancel a flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  Loyalty program information
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a customer claim his lost luggage during a connecting flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How can I change the customer's name on a paid flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How can I change a customer's flight destination?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How to select a customer's seat?
                </h3>
              </a>
            </div>
            </div>
        </div>
    );
};

export default Suggestions;
