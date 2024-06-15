import { useState } from 'react';
import { useAuth } from "../hooks/useAuth"; // Import useAuth custom hook
import { useDarkMode } from '../hooks/useDarkMode'; // Import useDarkMode custom hook

function SettingsButton() {
    // State to control the visibility of the settings dropdown
    const [isActive, setIsActive] = useState(false);
    // Custom hook for authentication
    const { logout } = useAuth(); // Taking logout as a method provided by useAuth
    // Custom hook for managing dark mode
    const { darkMode, setDarkMode } = useDarkMode();

    // Function to toggle the visibility of the settings dropdown
    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    // Function to handle logout
    const handleLogout = () => {
        logout();
    };
    
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="relative" data-cy='settings'>
            {/* Button to toggle the settings dropdown */}
            <button onClick={toggleIsActive} className="p-2">
                {/* Settings icon */}
                <img
                    src='/settings.svg'
                    alt="Settings"
                    // Apply CSS filter for invert if dark mode is enabled
                    className={`md:w-[45px] w-[38px] ${darkMode ? 'filter invert' : ''}`}
                />
            </button>
            {/* Render settings dropdown if active */}
            {isActive && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                    {/* Button to toggle dark mode */}
                    <button 
                        onClick={toggleDarkMode} 
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {/* Display dark mode option based on current state */}
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    {/* Button to handle logout */}
                    <button 
                        onClick={handleLogout} 
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default SettingsButton; 
