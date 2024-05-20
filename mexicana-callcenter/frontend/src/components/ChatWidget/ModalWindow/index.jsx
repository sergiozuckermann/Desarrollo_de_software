import React, { useState, useEffect } from 'react';
import useChatProvider from '../../../Provider/ChatProvider';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from "./../styles";

function ModalWindow(props) {
    const {
        isConnected,
        members,
        chatRows,
        onPublicMessage,
        onPrivateMessage,
        onConnect,
        onDisconnect,
    } = useChatProvider();

    const { username } = useAuth();

    const [message, setMessage] = useState('');
    const [selectedMember, setSelectedMember] = useState('sendToAll');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (selectedMember === 'sendToAll') {
                onPublicMessage(message);
            } else {
                onPrivateMessage(message, selectedMember);
            }
            setMessage('');
        }
    };

    useEffect(() => {
        if (username) {
            onConnect(username);
        }
    }, [username]);

    return (
        <div
            style={{
                ...styles.modalWindow,
                ...{ opacity: props.visible ? "1" : "0" },
            }}
        >
            <div style={headerStyles}>
                <h1 style={titleStyles}>MexicanaAirlines</h1>
                <h2 style={subtitleStyles}>Live Chat</h2>
            </div>
            {isConnected ? (
                <>
                    <div>Active Users:</div>
                    <select
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    >
                        <option value="sendToAll">Send to All</option>
                        {members.map((member) => (
                            <option key={member} value={member}>
                                {member}
                            </option>
                        ))}
                    </select>
                    <div>Chat Messages:</div>
                    <ul>
                        {chatRows.map((row, index) => (
                            <li key={index}>{row}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                    <button onClick={onDisconnect}>Disconnect</button>
                </>
            ) : (
                <div>Connecting...</div>
            )}
        </div>
    );
}

const headerStyles = {
    backgroundColor: '#20253F',
    color: 'white',
    padding: '10px 5px',
    textAlign: 'center',
};

const titleStyles = {
    margin: '0',
    fontSize: '24px',
    color: 'white',
    lineHeight: '1.2',
};

const subtitleStyles = {
    margin: '0',
    fontSize: '18px',
    color: 'white',
    lineHeight: '1.2',
};

export default ModalWindow;
