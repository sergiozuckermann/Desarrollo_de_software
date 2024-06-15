// Define an interface for authentication credentials
export interface Credentials {
  username: string; // The username property is a string
  password: string; // The password property is a string
}

// Define an interface for the authentication context type
export interface AuthContextType {
  isAuthenticated: boolean, // A boolean indicating if the user is authenticated or not
  name: string | null, // The user's name, which can be a string or null
  username: string | null, // The user's username, which can be a string or null
  role: string | null, // The user's role, which can be a string or null
  login: (credentials: Credentials) => Promise<void>, // A function to log in, taking Credentials as an argument and returning a Promise<void>
  logout: () => void // A function to log out
}

// Define an interface for the properties of a worker card component
export interface WorkerCardProps {
  imageURL: string; // The URL of the worker's profile image
  name: string; // The worker's name
  username: string; // The worker's username
  position: string; // The worker's position
  experience: number; // The worker's years of experience
  points: number; // The worker's points
  status?: string; // The worker's status, which is optional
}

// Define an interface for the WebSocket context type
export interface WebSocketContextType {
  socket: WebSocket | null; // The WebSocket object, which can be null
  onmessage?: ((this: WebSocket, ev: MessageEvent<any>) => any) | null; // An optional function to handle WebSocket message events
}

// Define an interface for a sentiment trend data point
export interface SentimentTrend {
  x: number;
  y: number;
}

// Define an interface for call overview analytics data
export interface callOverviewAnalytics {
  agentTalk: number; // The duration of agent talk
  customerTalk: number; // The duration of customer talk
  nonTalk: number; // The duration of non-talk
  sentimentTrend: SentimentTrend[]; // An array of SentimentTrend objects representing the sentiment trend
  sentimentPercentages: {
    POSITIVE: number; // The percentage of positive sentiment
    NEGATIVE: number; // The percentage of negative sentiment
    NEUTRAL: number; // The percentage of neutral sentiment
  };
  callDuration: number; // The total duration of the call
  key: string; // A unique key
  contactId: string; // The contact ID
}

// Define an interface for an interaction
export interface Interaction {
  key: string, // A unique key
  segmentType: string, // The segment type
  agentFirstName: string, // The agent's first name
  agentLastName: string, // The agent's last name
  state: string, // The interaction state
  contactId?: string, // The contact ID, which is optional
  Sentiment?: string, // The sentiment, which is optional
  queueName?: string, // The queue name, which is optional
  username: string; // The username
  routingProfile: string; // The routing profile
  callOverviewAnalytics?: callOverviewAnalytics; // The call overview analytics data, which is optional
}

// Define an interface for a sentiment segment
export interface SentimentSegment {
  ParticipantId: string; // The participant ID
  ParticipantRole: string; // The participant role
  Content: string; // The content
  BeginOffsetMillis: number; // The start offset in milliseconds
  EndOffsetMillis: number; // The end offset in milliseconds
  Id: string; // The segment ID
  Sentiment: string; // The sentiment
  contactId?: string; // The contact ID, which is optional
  IssuesDetected: Array<any>; // An array of any type representing the detected issues
  callOverviewAnalytics?: callOverviewAnalytics; // The call overview analytics data, which is optional
}

// Define an interface for an agent on call
export interface AgentsOnCall {
  key: string, // A unique key
  state: string // The agent's state
}

// Define an interface for a notification
export interface Notification {
  id: number; // The notification ID
  contactId: string; // The contact ID
  segmentType: string; // The segment type
  title: string; // The notification title
  message: string; // The notification message
  date: string; // The notification date
  isRead: boolean; // A boolean indicating if the notification has been read or not
}

// Define an interface for unhandled interactions
export interface UnhandledInteractions {
  state: Interaction // The interaction state
  sentiment?: SentimentSegment // The sentiment segment, which is optional
}