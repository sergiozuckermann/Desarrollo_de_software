import React, { useState, useEffect, useRef } from 'react';
import useChatProvider from '../../../Provider/ChatProvider';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './../styles';

function ModalWindow(props) {
    const {
        isConnected,
        members,
        chatRows,
        onPublicMessage,
        onPrivateMessage,
        onConnect,
    } = useChatProvider();

    const { username } = useAuth();

    const [message, setMessage] = useState('');
    const [selectedMember, setSelectedMember] = useState('sendToAll');
    const chatEndRef = useRef(null);

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

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (username) {
            onConnect(username);
        }
    }, [username]);

    useEffect(() => {
        console.log(chatRows);
        scrollToBottom();
    }, [chatRows]);

    const headerStyles = {
        backgroundColor: '#20253F',
        color: 'white',
        padding: '10px 5px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
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

    const closeButtonStyles = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '16px',
        color: 'white',
        cursor: 'pointer',
    };

    const activeUsersContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px',
    };

    const labelStyles = {
        marginRight: '10px',
        fontSize: '16px',
        color: '#20253F',
    };

    const selectStyles = {
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #20253F',
        backgroundColor: '#f9f9f9',
    };

    const chatListStyles = {
        listStyleType: 'none',
        padding: 0,
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
    };

    const chatItemStyles = {
        padding: '5px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
    };

    const myMessageStyles = {
        ...chatItemStyles,
        justifyContent: 'flex-end',
        backgroundColor: '#54d3fa',
    };

    const otherMessageStyles = {
        ...chatItemStyles,
        justifyContent: 'flex-start',
        backgroundColor: '#f1f0f0',
    };

    const inputContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 10,
    };

    const inputStyles = {
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        flex: 1,
    };

    const buttonStyles = {
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#20253F',
        color: 'white',
        cursor: 'pointer',
    };

    const modalContentStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
    };

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
                <div style={headerStyles}>
                    <h1 style={titleStyles}>MexicanaAirlines</h1>
                    <h2 style={subtitleStyles}>Live Chat</h2>
                    <button style={closeButtonStyles} onClick={props.onClose}>X</button>
                </div>
                {isConnected ? (
                    <div style={modalContentStyles}>
                        <div style={activeUsersContainerStyles}>
                            <label htmlFor="activeUsers" style={labelStyles}>Active Users:</label>
                            <select
                                id="activeUsers"
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                                style={selectStyles}
                            >
                                <option value="sendToAll">Send to All</option>
                                {members.map((member) => (
                                    <option key={member} value={member}>
                                        {member}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <div>Chat Messages:</div>
                            <ul style={chatListStyles}>
                                {chatRows.map((row, index) => {
                                    const isPrivateMessageTo = row.startsWith('Private message to ');
                                    const isPrivateMessageFrom = row.startsWith('Private message from ');
                                    const rowStyle = row.startsWith(username) || isPrivateMessageTo ? myMessageStyles : otherMessageStyles;

                                    return (
                                        <li key={index} style={rowStyle}>
                                            {row}
                                        </li>
                                    );
                                })}
                                <div ref={chatEndRef} />
                            </ul>
                        </div>
                        <div style={inputContainerStyles}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={inputStyles}
                            />
                            <button onClick={handleSendMessage} style={buttonStyles}>Send</button>
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