// c:/Users/juanp/Desktop/Desarrollo_de_software/mexicana-callcenter/frontend/src/components/ChatWidget.tsx

import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useEffect } from 'react';
// import '../css/chatW.css';

const ChatWidget = () => {
  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="My Chat"
        subtitle="Chat with us"
      />
    </div>
  );
};

const handleNewUserMessage = (newMessage) => {
  console.log(`New message incoming! ${newMessage}`);
  // Now send the message to the backend API
  addResponseMessage('Response message');
};

export default ChatWidget;
