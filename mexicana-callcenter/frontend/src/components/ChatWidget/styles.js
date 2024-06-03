import { colors } from "./config";

export const styles = {
    chatWidget: {
        // Position
        position: "fixed",
        bottom: "55px",
        right: "20px",
        backgroundColor: colors.primary,
        // Padding
        paddingLeft: "18px",
        paddingRight: "18px",
        paddingTop: "7px",
        paddingBottom: "7px",
        // Border
        borderRadius: "10px",
        cursor: "pointer",
        zIndex: 999,
    },

    chatWidgetText: {
        color: "white",
        fontSize: "15px",
        marginLeft: "5px",
    },

    // Styling for modal window 
    modalWindow: {
        // Position
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // Size
        width: "370px",
        height: "65vh",
        maxWidth: "calc(100% - 48px)",
        maxHeight: "calc(100% - 48px)",
        backgroundColor: "white",
        // Border
        borderRadius: "12px",
        border: `2px solid ${colors.primary}`,
        overflow: "hidden",
        // Shadow
        boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
        // Transition
        opacity: "0",
        pointerEvents: "none", // Disable interactions when not visible
        transition: "opacity 0.3s ease",
        zIndex: 1001,
    },

    modalWindowVisible: {
        opacity: "1",
        pointerEvents: "auto", // Enable interactions when visible
    },

    modalBackdrop: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },
    headerStyles: {
        backgroundColor: '#20253F',
        color: 'white',
        padding: '10px 5px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    titleStyles: {
        margin: '0',
        fontSize: '24px',
        color: 'white',
        lineHeight: '1.2',
    },
    subtitleStyles: {
        margin: '0',
        fontSize: '18px',
        color: 'white',
        lineHeight: '1.2',
    },
    closeButtonStyles: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '16px',
        color: 'white',
        cursor: 'pointer',
    },
    activeUsersContainerStyles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px',
    },
    labelStyles: {
        marginRight: '10px',
        fontSize: '16px',
        color: '#20253F',
    },
    selectStyles: {
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #20253F',
        backgroundColor: '#f9f9f9',
    },
    chatListStyles: {
        listStyleType: 'none',
        padding: 0,
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    chatItemStyles: {
        padding: '5px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
        borderRadius: '5px',
        maxWidth: '75%',
    },
    myMessageStyles: {
        alignSelf: 'flex-end',
        backgroundColor: '#cce5ff',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
        maxWidth: '60%',
        color: '#000', // Text color
        display: 'flex',
    },
    otherMessageStyles: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f0f0',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
        maxWidth: '60%',
        color: '#000', // Text color
        display: 'flex',
    },
    systemMessageStyles: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        color: '#000',
        padding: '10px',
        textAlign: 'center',
        marginBottom: '10px',
    },
    inputContainerStyles: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 10,
    },
    inputStyles: {
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        flex: 1,
    },
    buttonStyles: {
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#20253F',
        color: 'white',
        cursor: 'pointer',
    },
    modalContentStyles: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
    },
    tabsContainer: {
        display: 'flex',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    },
    activeTab: {
        padding: '10px',
        backgroundColor: '#20253F',
        color: 'white',
        cursor: 'pointer',
    },
    inactiveTab: {
        padding: '10px',
        backgroundColor: '#f1f0f0',
        color: '#20253F',
        cursor: 'pointer',
    },
};