import { FunctionComponent, useState, useEffect } from "react";

interface PopupProps {
  onClose: () => void;
}

const Popup: FunctionComponent<PopupProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const popupImages = [
    "/LogoMexicanaAudifonos.svg",
    "/LogoMexicanaAudifonosIN.svg",
    "/LogoMexicanaAudifonosOUT.svg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(true);
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const timer1 = setTimeout(() => {
        setImageIndex(1);
      }, 4000);
      const timer2 = setTimeout(() => {
        setImageIndex(2);
      }, 7000);
      const timer3 = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
      }, 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearInterval(timer3);
      };
    }
  }, [visible]);

  const handleClosePopup = () => {
    if (imageIndex === 2) {
      setVisible(false);
      onClose();
    }
  };

  return (
    <>
      {visible && (
        <div className="fixed bottom-4 right-4 rounded-lg p-2 w-50 sm:w-60 md:w-75 lg:w-75">
          <img
            src={popupImages[imageIndex]}
            alt="Logo"
            className="w-full h-auto cursor-pointer"
            onClick={handleClosePopup}
          />
        </div>
      )}
    </>
  );
};

export default Popup;