import { useState, useEffect } from 'react';
import axios from 'axios';

export function FetchMetrics() {
    const [averageAbandonmentRate, setAverageAbandonmentRate] = useState<number | null>(null);
    const [averageAbandonTime, setAverageAbandonTime] = useState<number | null>(null);
    const [averageQueueAnswerTime, setAverageQueueAnswerTime] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://iv5is62s80.execute-api.us-east-1.amazonaws.com/default/EpochUnixDate");
            const metricResults = response.data.MetricResults;

            let totalAbandonmentRate = 0;
            let totalAbandonTime = 0;
            let totalQueueAnswerTime = 0;
            let abandonmentRateCount = 0;
            let abandonTimeCount = 0;
            let queueAnswerTimeCount = 0;

            metricResults.forEach(queue => {
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
                                totalAbandonTime += metric.Value;
                                abandonTimeCount++;
                            }
                            break;
                        case "AVG_QUEUE_ANSWER_TIME":
                            if (metric.Value !== undefined) {
                                totalQueueAnswerTime += metric.Value;
                                queueAnswerTimeCount++;
                            }
                            break;
                    }
                });
            });

            if (abandonmentRateCount > 0) {
                setAverageAbandonmentRate(Math.round(totalAbandonmentRate / abandonmentRateCount));
            }
            if (abandonTimeCount > 0) {
                setAverageAbandonTime(Math.round(totalAbandonTime / abandonTimeCount));
            }
            if (queueAnswerTimeCount > 0) {
                setAverageQueueAnswerTime(Math.round(totalQueueAnswerTime / queueAnswerTimeCount));
            }

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
