export interface Credentials {
    username: string;
    password: string;
  }
  
  
export interface AuthContextType {
    isAuthenticated: boolean,
    name: string | null,
    username: string | null,
    role: string | null,
    login: (credentials: Credentials) => Promise<void>,
    logout: () => void
  }

export interface WorkerCardProps {
  imageURL: string;
  name: string;
  username: string;
  position: string;
  experience: number;
  points: number;
  status?: string;
}

// Define the type for the context value
export interface WebSocketContextType {
  socket:  WebSocket | null;
}

// Define the type for an interaction
export interface Interaction {
  key: string,
  segmentType: string,
  agentFirstName: string,
  agentLastName: string,
  state: string,
  contactId?: string,
  Sentiment?: string,
  queueName?: string,
  username: string;
  routingProfile: string;
  
}

// Define the type for an interaction
export interface SentimentSegment {
  ParticipantId: string;
  ParticipantRole: string;
  Content: string;
  BeginOffsetMillis: number;
  EndOffsetMillis: number;
  Id: string;
  Sentiment: string;
  contactId?:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IssuesDetected: Array<any>; // Use specific type instead of `any` if you know what will be in the array
}

export interface AgentsOnCall {
  key: string,
  state: string
}