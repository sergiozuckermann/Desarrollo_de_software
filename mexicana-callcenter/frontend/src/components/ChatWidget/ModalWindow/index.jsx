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

    // Función para manejar el envío de mensajes
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (props.privateMessage) {
                onPrivateMessage(props.privateMessage); // Mandar mensaje privado si existe
            } else {
                onPublicMessage(); // Mandar mensaje público
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

    // Retornar la interfaz del chat
    return (
        <div
            style={{
                ...styles.modalWindow,
                ...{ opacity: props.visible ? "1" : "0" },
            }}
        >
            {isConnected ? (
                <>
                    <div>Active Users:</div>
                    <ul>
                        {members.map((member) => (
                            <li key={member} onClick={() => onPrivateMessage(member)}>
                                {member}
                            </li>
                        ))}
                    </ul>
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

export default ModalWindow;
