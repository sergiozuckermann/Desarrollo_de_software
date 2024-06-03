import React, { useState, useEffect, useRef } from 'react';
import useChatProvider from '../../../Provider/ChatProvider';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './../styles';

function ModalWindow(props) {
    const {
        isConnected,
        members,
        publicMessages,
        privateMessages,
        onPublicMessage,
        onPrivateMessage,
        onConnect,
    } = useChatProvider();

    const { username } = useAuth();

    const [message, setMessage] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [activeTab, setActiveTab] = useState('public');
    const chatEndRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (selectedMember) {
                onPrivateMessage(message, selectedMember);
            } else if (activeTab === 'public') {
                onPublicMessage(message);
            } else {
                onPrivateMessage(message, activeTab);
            }
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (username) {
            onConnect(username);
        }
    }, [username]);

    useEffect(() => {
        scrollToBottom();
    }, [publicMessages, privateMessages]);

    const renderMessages = () => {
        const messages = activeTab === 'public' ? publicMessages : privateMessages[activeTab] || [];
        return messages.map((msg, index) => {
            if (msg.startsWith('system:')) {
                const systemMessage = msg.replace('system:', '').trim();
                return (
                    <li key={index} style={styles.systemMessageStyles}>
                        {systemMessage}
                    </li>
                );
            }

            const isOwnMessage = msg.startsWith(`${username}:`) || msg.startsWith(`You:`);
            const messageText = isOwnMessage ? msg.replace(`${username}:`, '').replace(`You:`, '') : msg;
            return (
                <li key={index} style={isOwnMessage ? styles.myMessageStyles : styles.otherMessageStyles}>
                    {isOwnMessage ? `You: ${messageText}` : `${messageText}`}
                </li>
            );
        });
    };

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
                                {availableMembers.map((member) => (
                                    <option key={member} value={member}>
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
                            {Object.keys(privateMessages).map((member) => (
                                <button
                                    key={member}
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