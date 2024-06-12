  // function to update metrics of an ongoing call
export const updateMetrics = (segment: SentimentSegment, currentMetrics:callOverviewAnalytics) => {
    // Update your metrics based on the segment data
    console.log('Updating metrics with segment: ', segment);

    //format values for sentiment trend chart
    const sentimentValue= segment.Sentiment==="POSITIVE" ? 1 : segment.Sentiment==="NEGATIVE" ? -1 : 0
    const timeStamp=parseFloat((segment.BeginOffsetMillis/1000).toFixed(2));

    //get stored metrics
    const updatedMetrics: callOverviewAnalytics = {
        agentTalk:currentMetrics.agentTalk,
        customerTalk:currentMetrics.customerTalk,
        nonTalk:currentMetrics.nonTalk,
        sentimentTrend:[...currentMetrics.sentimentTrend,{x:timeStamp,y:sentimentValue}],
        sentimentPercentages:{
          POSITIVE:currentMetrics.sentimentPercentages.POSITIVE,
          NEGATIVE:currentMetrics.sentimentPercentages.NEGATIVE,
          NEUTRAL:currentMetrics.sentimentPercentages.NEUTRAL
        },
        callDuration:currentMetrics.callDuration
      }


    const sentimentKey = segment.Sentiment as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    updatedMetrics.sentimentPercentages[sentimentKey]+=1;

    //increment intervention times by participant (for agent talk, customer talk, non talk)
    if(segment.ParticipantRole==="AGENT") {
        updatedMetrics.agentTalk+= parseFloat(((segment.EndOffsetMillis-segment.BeginOffsetMillis)/1000).toFixed(2));
    }
    else if(segment.ParticipantRole==="CUSTOMER") {
        updatedMetrics.customerTalk+=parseFloat(((segment.EndOffsetMillis-segment.BeginOffsetMillis)/1000).toFixed(2));
    }
    else {
        updatedMetrics.nonTalk+=parseFloat(((segment.EndOffsetMillis-segment.BeginOffsetMillis)/1000).toFixed(2));
    }

    //calculate call duration 
    updatedMetrics.callDuration = updatedMetrics.callDuration + parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
    
    return updatedMetrics; // Return the updated metrics
  };

