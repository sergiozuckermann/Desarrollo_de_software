import React, { useState } from 'react';

const ClientForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [callDescription, setCallDescription] = useState("");

    return (
        <div className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
           <div className="max-w-xl mx-auto"> 
            <h1 className= "text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">Client</h1>
            <form className="space-y-4">
                <div>
                    <label className="text-xl md:text-2xl lg:text-2xl xl:text-2xl font-roboto pl-5">Name:</label>

                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">E-mail:</label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">Phone:</label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">Call Description:</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={callDescription}
                        onChange={(e) => setCallDescription(e.target.value)}
                        style={{ minHeight: '200px' }}
                    />
                </div>
            </form>
        </div>
        </div>
    );
};

export default ClientForm;
