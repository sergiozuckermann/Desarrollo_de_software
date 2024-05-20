import React, { useState, useEffect } from 'react';
import useChatProvider from '../../../Provider/ChatProvider'; // Importa el hook useChatProvider
import { useAuth } from '../../../hooks/useAuth'; // Importa el hook useAuth

// importing external style
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
    } = useChatProvider(); // Usar el hook useChatProvider

    const { username } = useAuth(); // Obtener el nombre de usuario desde el contexto de autenticación

    // Estado local para el mensaje a enviar
    const [message, setMessage] = useState('');
    const [selectedMember, setSelectedMember] = useState('sendToAll');

    // Función para manejar el envío de mensajes
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (selectedMember === 'sendToAll') {
                onPublicMessage(message); // Mandar mensaje público
            } else {
                onPrivateMessage(message, selectedMember); // Mandar mensaje privado
            }
            setMessage(''); // Limpiar el mensaje después de enviarlo
        }
    };

    // Conectar al montar el componente
    useEffect(() => {
        if (username) {
            onConnect(username);
        }
    }, [username]); // Vuelve a conectarse si cambia el nombre de usuario

    // Estilos personalizados
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

    const activeUsersContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px', // Aumentar el margen inferior para separar del header
        marginTop: '20px', // Agregar margen superior para separar del header
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
    };

    const chatItemStyles = {
        padding: '5px',
        borderBottom: '1px solid #ddd',
    };

    const inputStyles = {
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: 'calc(100% - 12px)',
        marginBottom: '10px',
    };

    const buttonStyles = {
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#20253F',
        color: 'white',
        cursor: 'pointer',
        marginRight: '10px',
    };

    // Retornar la interfaz del chat
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
                    <div>Chat Messages:</div>
                    <ul style={chatListStyles}>
                        {chatRows.map((row, index) => (
                            <li key={index} style={chatItemStyles}>{row}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={inputStyles}
                    />
                    <button onClick={handleSendMessage} style={buttonStyles}>Send</button>
                    <button onClick={onDisconnect} style={buttonStyles}>Disconnect</button>
                </>
            ) : (
                <div>Connecting...</div>
            )}
        </div>
    );
}

export default ModalWindow;
