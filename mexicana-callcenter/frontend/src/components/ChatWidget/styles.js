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
};
