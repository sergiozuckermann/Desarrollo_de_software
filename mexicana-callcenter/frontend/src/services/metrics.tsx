// Import the useState and useEffect hooks from the React library
import { useState, useEffect } from 'react';
// Import the axios library for making HTTP requests
import axios from 'axios';
// Import the conf module from the relative path '../conf'
import conf from '../conf';

// Assign the value of conf.apiUrl to the API_URL constant (or use 'http://localhost:3000' as a fallback)
const API_URL = conf.apiUrl; //'http://localhost:3000';

// Define a mapping of queue IDs to queue names
const queueNames: Record<string, string> = {
    'b65f8183-2d8b-42e4-9b37-f8dfa787c246': 'Flight Management',
    'f6d70469-1449-47c5-b93e-53b42de6dcc3': 'Customer Service',
    'd3fe43cd-5190-40ec-892b-741ffc4ccbd3': 'Other Questions',
    '0b408b2d-26c5-4b59-b090-8f9422edb331': 'Special Assistance',
    '81fad136-adf4-4fb6-9780-e46f53cb740d': 'Travel Information',
    'd19f9426-d75f-48eb-a68c-0bbda4ced434': 'Website Assistance'
};

// Define an interface for a single metric
interface Metric {
    Name: string;
    Value?: number;
}

// Define an interface for a metric collection
interface MetricCollection {
    Metric: Metric;
    Value: number;
}

// Define an interface for the dimensions of a metric
interface Dimensions {
    AGENT: string;
    AGENT_ARN: string;
    QUEUE?: string;
}

// Define an interface for a queue metric
interface QueueMetric {
    Dimensions: Dimensions;
    Collections: MetricCollection[];
}

// Define an interface for an agent metric
interface AgentMetric {
    Dimensions: Dimensions;
    Collections: MetricCollection[];
}

// Define an interface for the response data shape
interface ResponseData {
    QueueMetrics: { MetricResults: QueueMetric[] };
    AgentMetrics: { MetricResults: AgentMetric[] };
    AgentsList: string[];
}

// Define an interface for the result of the FetchMetrics function
interface FetchMetricsResult {
    averageAbandonmentRate: number | null;
    averageAbandonTime: { label: string; value: number }[] | null;
    averageQueueAnswerTime: { label: string; value: number }[] | null;
    averageAnswerTime: number | null;
    ServiceLevel: number | null;
    averageContactDuration: number | null;
    contactsHandeled: number | null;
    contactFlowTime: number | null;
    agentOccupancy: { label: string; value: number }[] | null;
    agentsList: string[];
}

// Define the FetchMetrics function and its parameters
export function FetchMetrics(filters: Record<string, string>): FetchMetricsResult {
    // Define state variables for various metrics using the useState hook
    const [averageAbandonmentRate, setAverageAbandonmentRate] = useState<number | null>(null);
    const [averageAbandonTime, setAverageAbandonTime] = useState<{ label: string; value: number }[] | null>(null);
    const [averageQueueAnswerTime, setAverageQueueAnswerTime] = useState<{ label: string; value: number }[] | null>(null);
    const [averageAnswerTime, setAverageAnswerTime] = useState<number | null>(null);
    const [ServiceLevel, setServiceLevel] = useState<number | null>(null);
    const [averageContactDuration, setAverageContactDuration] = useState<number | null>(null);
    const [contactsHandeled, setContactsHandeled] = useState<number | null>(null);
    const [contactFlowTime, setContactFlowTime] = useState<number | null>(null);
    const [agentOccupancy, setAgentOccupancy] = useState<{ label: string; value: number }[] | null>(null);
    const [agentsList, setAgentsList] = useState<string[]>([]);

    // Use the useEffect hook to fetch data when the component mounts or the filters change
    useEffect(() => {
        // Define an asynchronous function to fetch data
        const fetchData = async () => {
            // Reset state before fetching new data
            setAverageAbandonmentRate(null);
            setAverageAbandonTime(null);
            setAverageQueueAnswerTime(null);
            setAverageAnswerTime(null);
            setServiceLevel(null);
            setAverageContactDuration(null);
            setContactsHandeled(null);
            setContactFlowTime(null);
            setAgentOccupancy(null);
            setAgentsList([]);

            try {
                // Get the filters from the function parameter (or use an empty object if not provided)
                const requestFilters = filters || {};
                console.log("Filters before sending request:", requestFilters);

                // Make a POST request to the API using axios
                const response = await axios.post<ResponseData>(`${API_URL}/historicmetrics`, requestFilters, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                // Destructure the response data
                const queueMetrics = response.data.QueueMetrics.MetricResults;
                const agentMetrics = response.data.AgentMetrics.MetricResults;
                const agents = response.data.AgentsList;

                // Initialize variables for aggregating metrics
                let totalAbandonmentRate = 0;
                let abandonmentRateCount = 0;
                let abandonTimes: { label: string; value: number }[] = [];
                let queueAnswerTimes: { label: string; value: number }[] = [];
                let totalAnswerTime = 0;
                let AnswerTimeCount = 0;
                let serviceLevelValue: number | null = null;
                let totalContactDuration = 0;
                let contactDurationCount = 0;
                let contactsHandeled = 0;
                let contactFlowTime = 0;
                let contactFlowTimeCount = 0;
                let agentOccupancyArray: { label: string; value: number }[] = [];

                // Process queue metrics
                queueMetrics.forEach((queue) => {
                    if (queue.Dimensions && queue.Dimensions.QUEUE) {
                        const queueName = queueNames[queue.Dimensions.QUEUE];
                        queue.Collections.forEach((metric) => {
                            switch (metric.Metric.Name) {
                                case "ABANDONMENT_RATE":
                                    if (metric.Value !== undefined) {
                                        totalAbandonmentRate += metric.Value;
                                        abandonmentRateCount++;
                                    }
                                    break;
                                case "AVG_ABANDON_TIME":
                                    if (metric.Value !== undefined) {
                                        abandonTimes.push({ label: queueName, value: Math.round(metric.Value) });
                                    }
                                    break;
                                case "AVG_QUEUE_ANSWER_TIME":
                                    if (metric.Value !== undefined) {
                                        queueAnswerTimes.push({ label: queueName, value: Math.round(metric.Value) });
                                        totalAnswerTime += metric.Value;
                                        AnswerTimeCount++;
                                    }
                                    break;
                                case "SERVICE_LEVEL":
                                    if (metric.Value !== undefined) {
                                        serviceLevelValue = Math.round(metric.Value);
                                    }
                                    break;
                                case "AVG_CONTACT_DURATION":
                                    if (metric.Value !== undefined) {
                                        totalContactDuration += metric.Value;
                                        contactDurationCount++;
                                    }
                                    break;
                                case "CONTACTS_HANDLED":
                                    if (metric.Value !== undefined) {
                                        contactsHandeled = metric.Value;
                                    }
                                    break;
                                case "SUM_CONTACT_FLOW_TIME":
                                    if (metric.Value !== undefined) {
                                        contactFlowTime += metric.Value;
                                        contactFlowTimeCount++;
                                    }
                                    break;
                            }
                        });
                    }
                });

                // Calculate and set average abandonment rate
                if (abandonmentRateCount > 0) {
                    setAverageAbandonmentRate(Math.round(totalAbandonmentRate / abandonmentRateCount));
                }
                // Set average abandon time with rounded values
                setAverageAbandonTime(abandonTimes.map(item => ({ ...item, value: Math.round(item.value) })));
                // Set average queue answer time with rounded values
                setAverageQueueAnswerTime(queueAnswerTimes.map(item => ({ ...item, value: Math.round(item.value) })));

                // Calculate and set average answer time
                if (AnswerTimeCount > 0) {
                    setAverageAnswerTime(Math.round(totalAnswerTime / AnswerTimeCount));
                }
                // Set service level
                setServiceLevel(serviceLevelValue);

                // Calculate and set average contact duration
                if (contactDurationCount > 0) {
                    setAverageContactDuration(Math.round(totalContactDuration / contactDurationCount));
                }
                // Set contacts handled
                setContactsHandeled(contactsHandeled);
                // Calculate and set contact flow time
                if (contactFlowTimeCount > 0) {
                    setContactFlowTime(Math.round(contactFlowTime / contactFlowTimeCount));
                }

                // Process agent metrics
                agentMetrics.forEach((agent) => {
                    agent.Collections.forEach((metric) => {
                        if (metric.Metric.Name === "AGENT_OCCUPANCY" && metric.Value !== undefined) {
                            agentOccupancyArray.push({ label: agent.Dimensions.AGENT, value: Math.round(metric.Value * 100) });
                        }
                    });
                });

                console.log("Agent Occupancy Array:", agentOccupancyArray);
                // Set agent occupancy
                setAgentOccupancy(agentOccupancyArray);
                // Set agents list
                setAgentsList(agents);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [filters]);

    // Return an object with all the metrics
    return {
        averageAbandonmentRate,
        averageAbandonTime,
        averageQueueAnswerTime,
        averageAnswerTime,
        ServiceLevel,
        averageContactDuration,
        contactsHandeled,
        contactFlowTime,
        agentOccupancy,
        agentsList
    };
}