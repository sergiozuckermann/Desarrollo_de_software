import React, { useState } from 'react';

const ClientForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [callDescription, setCallDescription] = useState("");

    return (
        <div className="h-full w-full p-4 bg-gray-100 rounded-lg shadow border border-gray-300">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Client</h1>
            <form className="space-y-4">
                <div>
                    <label className="font2">Name:</label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="font2">E-mail:</label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="font2">Phone:</label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label className="font2">Call Description:</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={callDescription}
                        onChange={(e) => setCallDescription(e.target.value)}
                        style={{ minHeight: '300px' }}
                    />
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
