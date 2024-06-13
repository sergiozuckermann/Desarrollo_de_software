declare module './components/ChatWidget/styles' {
    export const styles: { [key: string]: React.CSSProperties };
}

declare module './components/ChatWidget/ModalWindow' {
    import React from 'react';
    interface ModalWindowProps {
        visible: boolean;
        onClose: () => void;
    }
    const ModalWindow: React.FC<ModalWindowProps>;
    export default ModalWindow;
}