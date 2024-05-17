import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filter = ({ onApplyFilters }) => {
    const [agent, setAgent] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [queue, setQueue] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const filterRef = useRef(null);

    const handleReset = () => {
        setAgent('');;
        setQueue('');
        setStartDate(new Date());
        setEndDate(new Date());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onApplyFilters({ agent, queue, startDate, endDate });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setShowFilters(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <div className="flex flex-col h-full p-2 bg-white border border-gray-200 shadow-lg rounded-xl">
                <form ref={filterRef} onSubmit={handleSearch} className="flex flex-col justify-between h-full">
                    <div className="relative flex items-center justify-between w-full mb-2 rounded-md">
                        <svg
                            className="absolute block w-5 h-5 text-gray-400 left-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            name="search"
                            className="w-full h-10 py-2 pl-10 pr-4 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Search by date, agent, queue, etc"
                            onFocus={() => setShowFilters(true)}
                        />
                    </div>

                    {showFilters && (
                        <div className="absolute left-0 z-20 w-full p-4 bg-white border border-gray-200 shadow-lg top-10 rounded-xl">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <label htmlFor="agent" className="text-sm font-medium text-stone-600">Agent</label>
                                    <input
                                        type="text"
                                        id="agent"
                                        value={agent}
                                        onChange={(e) => setAgent(e.target.value)}
                                        placeholder="Fer"
                                        className="block w-full px-2 py-1 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="queue" className="text-sm font-medium text-stone-600">Queue</label>
                                    <select
                                        id="queue"
                                        value={queue}
                                        onChange={(e) => setQueue(e.target.value)}
                                        className="block w-full px-2 py-1 mt-2 shadow-sm outline-none cursor-pointer bg-gray-100rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Select Queue</option>
                                        <option>Travel logisticst</option>
                                        <option>Flight Managment</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="startdate" className="text-sm font-medium text-stone-600"> Start Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(startDate) => setStartDate(startDate)}
                                        className="block w-full px-2 py-1 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="enddate" className="text-sm font-medium text-stone-600"> End Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(endDate) => setEndDate(endDate)}
                                        className="block w-full px-2 py-1 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-2 space-x-4">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg outline-none hover:opacity-80 focus:ring"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 font-medium rounded-lg outline-none text-whit bg-secondary hover:opacity-80 focus:ring"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Filter;
