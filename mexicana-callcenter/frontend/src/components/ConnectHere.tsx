import React from 'react';
import CCPComponent from "../components/CCPComponent";
const ConnectHere: React.FC = () => {
    return (
        <div className="h-full w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            <div className='h-full'>
                <CCPComponent />
                
            </div>
        </div>
    );
};

export default ConnectHere;
