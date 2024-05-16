import { useState, useEffect } from 'react';
import axios from 'axios';

const queueNames = {
    '99bfbe85-27ac-4384-8462-f01f75b53d32': "Flight Management",
    '292d0398-6089-42cc-9ec9-aee43d6202a6': "Travel logistics"
};

export function FetchMetrics() {
    const [averageAbandonmentRate, setAverageAbandonmentRate] = useState<number | null>(null);
    const [averageAbandonTime, setAverageAbandonTime] = useState<Array<{label: string, value: number}> | null>(null);
    const [averageQueueAnswerTime, setAverageQueueAnswerTime] = useState<Array<{label: string, value: number}> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://iv5is62s80.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate");
            const metricResults = response.data.MetricResults;

            let totalAbandonmentRate = 0;
            let abandonmentRateCount = 0;
            let abandonTimes: Array<{label: string, value: number}> = [];
            let queueAnswerTimes: Array<{label: string, value: number}> = [];

            metricResults.forEach(queue => {
                const queueName = queueNames[queue.Dimensions.QUEUE];
                    queue.Collections.forEach(metric => {
                        switch (metric.Metric.Name) {
                            case "ABANDONMENT_RATE":
                                if (metric.Value !== undefined) {
                                    totalAbandonmentRate += metric.Value;
                                    abandonmentRateCount++;
                                }
                                break;
                            case "AVG_ABANDON_TIME":
                                if (metric.Value !== undefined) {
                                    // abandonTimes.push({label: queue.Dimensions.QUEUE, value: metric.Value});
                                    abandonTimes.push({label: queueName, value: metric.Value});
                                }
                                break;
                            case "AVG_QUEUE_ANSWER_TIME":
                                if (metric.Value !== undefined) {
                                    // queueAnswerTimes.push({label: queue.Dimensions.QUEUE, value: metric.Value});
                                    queueAnswerTimes.push({label: queueName, value: metric.Value});
                                }
                                break;
                    }
                });
            });

            if (abandonmentRateCount > 0) {
                setAverageAbandonmentRate(Math.round(totalAbandonmentRate / abandonmentRateCount));
            }
            setAverageAbandonTime(abandonTimes);
            setAverageQueueAnswerTime(queueAnswerTimes);

          } catch (error) {
            console.error("Error fetching data", error);
          }
        };

        fetchData();
    }, []);

    return {
        averageAbandonmentRate,
        averageAbandonTime,
        averageQueueAnswerTime
    };
}
