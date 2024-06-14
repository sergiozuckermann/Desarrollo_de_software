import { useState } from 'react';
import { useAuth } from "../hooks/useAuth"; 
import { useDarkMode } from '../hooks/useDarkMode';

function SettingsButton() {
    const [isActive, setIsActive] = useState(false);
    const { logout } = useAuth(); // Assuming logout is a method provided by useAuth
    const { darkMode, setDarkMode } = useDarkMode();

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    const handleLogout = () => {
        logout();
    };
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="relative" data-cy='settings'>
            <button onClick={toggleIsActive} className="p-2">
                <img
                    src='/settings.svg'
                    alt="Settings"
                    className={`md:w-[45px] w-[38px] ${darkMode ? 'filter invert' : ''}`}
                />
            </button>
            {isActive && (
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                    <button 
                        onClick={toggleDarkMode} 
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
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