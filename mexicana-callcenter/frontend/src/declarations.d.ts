// This code declares TypeScript modules for './components/ChatWidget/styles' and './components/ChatWidget/ModalWindow'.
// It defines the types and structure of the exports from these modules, providing type information to TypeScript.

declare module './components/ChatWidget/styles' {
    export const styles: { [key: string]: React.CSSProperties }; // Export a 'styles' object where keys are strings and values are React.CSSProperties
}

declare module './components/ChatWidget/ModalWindow' {
    import React from 'react';
    // Define the ModalWindowProps interface with a visible boolean prop and an onClose function prop
    interface ModalWindowProps {
        visible: boolean;
        onClose: () => void;
    }
    // Define the ModalWindow component as a React functional component with ModalWindowProps
    const ModalWindow: React.FC<ModalWindowProps>;
    export default ModalWindow;
}