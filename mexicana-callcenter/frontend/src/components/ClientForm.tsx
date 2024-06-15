// Import the useState hook from React
import { useState } from 'react';

// Define the ClientForm component
const ClientForm = () => {
    // State variables to store the form field values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [callDescription, setCallDescription] = useState("");

    // Render the component
    return (
        <div className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            {/* Container div with full height, full width, padding, rounded corners, background color, and border styles */}
            <div className="max-w-xl mx-auto">
                {/* Centered container with a maximum width */}
                <h1 className= "text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">Client</h1>
                {/* Heading with responsive font sizes, font family, and bottom margin */}
                <form className="space-y-4">
                    {/* Form with spacing between form fields */}
                    <div>
                        {/* Container div for the name field */}
                        <label className="text-xl md:text-2xl lg:text-2xl xl:text-2xl font-roboto pl-5">Name:</label>
                        {/* Label with responsive font sizes, font family, and left padding */}

                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {/* Input field for the name with various styles and change handler */}
                    </div>
                    <div>
                        {/* Container div for the email field */}
                        <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">E-mail:</label>
                        {/* Label with responsive font sizes, font family, and left padding */}
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* Input field for the email with various styles and change handler */}
                    </div>
                    <div>
                        {/* Container div for the phone field */}
                        <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">Phone:</label>
                        {/* Label with responsive font sizes, font family, and left padding */}
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {/* Input field for the phone with various styles and change handler */}
                    </div>
                    <div>
                        {/* Container div for the call description field */}
                        <label className="text-xl md:text-2xl lg:text-2xl xl:text-2x font-roboto pl-5">Call Description:</label>
                        {/* Label with responsive font sizes, font family, and left padding */}
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={callDescription}
                            onChange={(e) => setCallDescription(e.target.value)}
                            style={{ minHeight: '200px' }}
                        />
                        {/* Textarea for the call description with various styles, change handler, and minimum height */}
                    </div>
                </form>
            </div>
        </div>
    );
};

// Export the ClientForm component as the default export
export default ClientForm;