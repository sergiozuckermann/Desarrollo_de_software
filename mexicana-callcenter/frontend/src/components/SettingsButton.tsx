
import { useState } from 'react';
import { useAuth } from "../hooks/useAuth"; // Adjust the import path as necessary

function SettingsButton() {
    const [isActive, setIsActive] = useState(false);
    const { logout } = useAuth(); // Assuming `logout` is a method provided by AuthContext

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    const handleLogout = () => {
        // Create a useAuth hook to handle logout
        logout();  
        window.location.href = '/'; 
    };

    return (
        <div className="relative">
            <button onClick={toggleIsActive} className="p-2">
                <img src='/settings.svg' alt="Settings" className="md:w-[45px] w-[38px] " />
            </button>
            {isActive && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Modes</a>
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
            )}
        </div>
    );
}

export default SettingsButton;
