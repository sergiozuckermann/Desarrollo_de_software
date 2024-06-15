import React, { useState, useEffect, useRef } from 'react'; // Conventional react imports to update the component
import useChatProvider from '../../../Provider/ChatProvider'; // Imports the ChatProvider with the websocket connection
import { useAuth } from '../../../hooks/useAuth'; // Imports the useAuth hook in order to obtain the username
import { styles } from './../styles'; // Import the JS CSS Styles for the chat

function ModalWindow(props) {
    // Properties explained in ChatClient.tsx 
    const {
        isConnected,
        members,
        publicMessages,
        privateMessages,
        onPublicMessage,
        onPrivateMessage,
        onConnect,
    } = useChatProvider();

    const { username } = useAuth(); //Get username to send it to the onConnect funtion

    const [message, setMessage] = useState(''); // Message to be sent
    const [selectedMember, setSelectedMember] = useState(''); // Update the selected agent to send a private message
    const [activeTab, setActiveTab] = useState('public'); // Set the tab where a private conversation takes place
    const chatEndRef = useRef(null); // Enable the auto-scrolling by settingthe end of the chat

    // Message handling function
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (selectedMember) {
                // If a selected member is selected, the message is of type private and sent to that member
                onPrivateMessage(message, selectedMember);
            } else if (activeTab === 'public') {
                // If the active tab is "public", send a public message
                onPublicMessage(message);
            } else {
                // Send private message to the agent linked to the activeTab
                onPrivateMessage(message, activeTab);
            }
            setMessage('');
        }
    };

    // Scroll to the bottom
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Use the username using the onConnect funtion to connect to the WS
    useEffect(() => {
        if (username) {
            onConnect(username);
        }
    }, [username]);

    useEffect(() => {
        scrollToBottom();
    }, [publicMessages, privateMessages]);

    // Render messages
    const renderMessages = () => {
        const messages = activeTab === 'public' ? publicMessages : privateMessages[activeTab] || [];
        return messages.map((msg, index) => {
            if (msg.startsWith('system:')) {
                const systemMessage = msg.replace('system:', '').trim();
                return (
                    <li key={`system-${index}`} style={styles.systemMessageStyles}>
                        {systemMessage}
                    </li>
                );
            }

            const isOwnMessage = msg.startsWith(`${username}:`) || msg.startsWith(`You:`);
            const messageText = isOwnMessage ? msg.replace(`${username}:`, '').replace(`You:`, '') : msg;
            return (
                <li key={`msg-${index}`} style={isOwnMessage ? styles.myMessageStyles : styles.otherMessageStyles}>
                    {isOwnMessage ? `You: ${messageText}` : `${messageText}`}
                </li>
            );
        });
    };
    // Filter the members
    const availableMembers = members.filter(
        member => member !== username && !privateMessages[member]
    );

    return (
        <>
            {props.visible && <div style={styles.modalBackdrop}></div>}
            <div
                style={{
                    ...styles.modalWindow,
                    ...(props.visible && styles.modalWindowVisible),
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                <div style={styles.headerStyles}>
                    <h1 style={styles.titleStyles}>MexicanaAirlines</h1>
                    <h2 style={styles.subtitleStyles}>Live Chat</h2>
                    <button style={styles.closeButtonStyles} onClick={props.onClose}>X</button>
                </div>
                {isConnected ? (
                    <div style={styles.modalContentStyles}>
                        <div style={styles.activeUsersContainerStyles}>
                            <label htmlFor="activeUsers" style={styles.labelStyles}>Active Users:</label>
                            <select
                                id="activeUsers"
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                                style={styles.selectStyles}
                            >
                                <option value="">Select a member</option>
                                {availableMembers.map((member, index) => (
                                    <option key={`member-${index}`} value={member}>
                                        {member}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.tabsContainer}>
                            <button
                                style={activeTab === 'public' ? styles.activeTab : styles.inactiveTab}
                                onClick={() => setActiveTab('public')}
                            >
                                Public
                            </button>
                            {Object.keys(privateMessages).map((member, index) => (
                                <button
                                    key={`tab-${index}`}
                                    style={activeTab === member ? styles.activeTab : styles.inactiveTab}
                                    onClick={() => {
                                        setActiveTab(member);
                                        setSelectedMember('');
                                    }}
                                >
                                    {member}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <ul style={styles.chatListStyles}>
                                {renderMessages()}
                                <div ref={chatEndRef} />
                            </ul>
                        </div>
                        <div style={styles.inputContainerStyles}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={styles.inputStyles}
                            />
                            <button onClick={handleSendMessage} style={styles.buttonStyles}>Send</button>
                        </div>
                    </div>
                ) : (
                    <div>Connecting...</div>
                )}
            </div>
        </>
    );
}

export default ModalWindow;