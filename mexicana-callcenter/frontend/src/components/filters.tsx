import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Modal from 'react-modal';

const defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 30);
defaultStartDate.setHours(0, 0, 0, 0);

const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() - 1);
defaultEndDate.setHours(23, 59, 59, 999);

const queueMap: { [key: string]: string } = {
    'Travel logistics': '292d0398-6089-42cc-9ec9-aee43d6202a6',
    'Flight Management': 'b65f8183-2d8b-42e4-9b37-f8dfa787c246',
    'Customer Service': 'f6d70469-1449-47c5-b93e-53b42de6dcc3',
    'Other Questions': 'd3fe43cd-5190-40ec-892b-741ffc4ccbd3',
    'Special Assistance': '0b408b2d-26c5-4b59-b090-8f9422edb331',
    'Travel Information': '81fad136-adf4-4fb6-9780-e46f53cb740d',
    'Website Assistance': 'd19f9426-d75f-48eb-a68c-0bbda4ced434'
};

interface FilterProps {
    onApplyFilters: (filters: {
        agentId: string;
        queue: string;
        startTime: string;
        endTime: string;
    }) => void;
    agentsList: string[];
    isAgentFilterEditable: boolean;
    defaultAgentId?: string;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters, agentsList, isAgentFilterEditable, defaultAgentId }) => {
    const [agentId, setAgentId] = useState<string>(defaultAgentId || '');
    const [startDate, setStartDate] = useState<Date>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date>(defaultEndDate);
    const [queue, setQueue] = useState<string>('');
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [isResetting, setIsResetting] = useState<boolean>(false); // Track reset state
    const filterRef = useRef<HTMLFormElement>(null);

    const handleReset = () => {
        setAgentId(defaultAgentId || '');
        setQueue('');
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
        setIsResetting(true); // Indicate reset in progress
    };

    useEffect(() => {
        if (isResetting) {
            handleSearch();
            setIsResetting(false); // Reset the reset state
        }
    }, [isResetting]);

    const showModal = (message: string) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const validateDates = (): boolean => {
        const today = new Date();
        const startDateValidBeforeToday = startDate < today;
        const startDateValidAfter2024 = startDate > new Date('2024-03-17');
        const endDateValidPast = endDate <= today;
        const endDateValidAfter2024 = endDate > new Date('2024-03-18');
        const rangeValid = startDate < endDate;
        const daysDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        if (!startDateValidBeforeToday) {
            showModal("Not valid filters: Start date must be before today.");
            return false;
        }
        if (!startDateValidAfter2024) {
            showModal("Not valid filters: Start date must be after March 17, 2024.");
            return false;
        }
        if (!endDateValidPast) {
            showModal("Not valid filters: End date cannot be in the future.");
            return false;
        }
        if (!endDateValidAfter2024) {
            showModal("Not valid filters: End date must be after March 18, 2024.");
            return false;
        }
        if (!rangeValid) {
            showModal("Not valid filters: Start date must be before end date.");
            return false;
        }
        if (daysDifference > 30) {
            showModal("Not valid filters: Date range must be within 30 days.");
            return false;
        }
        return true;
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!validateDates()) return;

        const filters = {
            agentId,
            queue: queueMap[queue] || '',
            startTime: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(endDate).format('YYYY-MM-DD HH:mm:ss')
        };
        console.log("Applying filters:", filters);
        onApplyFilters(filters);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
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
                            <line x1="21" y="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            name="search"
                            className="w-full h-10 py-2 pl-10 pr-4 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Search by date, agent, queue, etc"
                            onFocus={toggleFilters}
                        />
                    </div>

                    {showFilters && (
                        <div className="absolute left-0 z-20 w-full p-4 bg-white border border-gray-200 shadow-lg top-10 rounded-xl">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {isAgentFilterEditable ? (
                                    <div className="flex flex-col">
                                        <label htmlFor="agent" className="text-sm font-medium text-stone-600">Agent</label>
                                        <select
                                            id="agent"
                                            value={agentId}
                                            onChange={(e) => setAgentId(e.target.value)}
                                            className="block w-full px-2 py-1 mt-2 bg-gray-100 rounded-md shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Select Agent</option>
                                            {agentsList.map((agent, index) => (
                                                <option key={index} value={agent}>{agent}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <label htmlFor="agent" className="text-sm font-medium text-stone-600">Agent</label>
                                        <input
                                            id="agent"
                                            type="text"
                                            value={agentId}
                                            readOnly
                                            className="block w-full px-2 py-1 mt-2 bg-gray-100 rounded-md shadow-sm outline-none cursor-not-allowed focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col">
                                    <label htmlFor="queue" className="text-sm font-medium text-stone-600">Queue</label>
                                    <select
                                        id="queue"
                                        value={queue}
                                        onChange={(e) => setQueue(e.target.value)}
                                        className="block w-full px-2 py-1 mt-2 bg-gray-100 rounded-md shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Select Queue</option>
                                        <option>Travel logistics</option>
                                        <option>Flight Management</option>
                                        <option>Special Assistance</option>
                                        <option>Website Assistance</option>
                                        <option>Other Questions</option>
                                        <option>Customer Service</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="startdate" className="text-sm font-medium text-stone-600">Start Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        className="block w-full px-2 py-1 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="enddate" className="text-sm font-medium text-stone-600">End Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date) => setEndDate(date)}
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
                                    className="px-4 py-2 font-medium text-white rounded-lg outline-none bg-secondary hover:opacity-80 focus:ring"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Validation Error"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold">Unable to apply Filters</h2>
                    <p>{modalMessage}</p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 mt-4 font-medium text-white rounded-lg bg-secondary hover:opacity-80"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Filter;
