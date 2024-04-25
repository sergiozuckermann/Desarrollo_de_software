import React from 'react';

const ConnectHere: React.FC = () => {
    return (
        <div className="h-[100%] w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            <div>
                <h2 className="ml-8 mt-11" style={{fontFamily: "Roboto", fontSize: "20px"}}>
                    * Connect Here *
                </h2>
            </div>
        </div>
    );
};

export default ConnectHere;
