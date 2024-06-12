import { toast } from 'react-toastify';

const useCustomToast = () => {
  const showError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      icon: false,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { 
        width: "620px", 
        fontSize: "25px", 
        color: "white", 
        backgroundColor: "black", 
        fontFamily: "Inter"
      },
    });
  };

  const showSuccess = (message: string) => {
    toast.success(message, {
      position: "top-center",
      icon: false,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { 
        width: "620px", 
        fontSize: "25px", 
        color: "white", 
        backgroundColor: "#4BB543", // Green background for success
        fontFamily: "Inter"
      },
    });
  };


  const showCustom = (message: string, color:string) => {
    toast.success(message, {
      position: "top-center",
      icon: false,
      autoClose: 9000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { 
        width: "620px", 
        fontSize: "25px", 
        color: "white", 
        backgroundColor: color, // Green background for success
        fontFamily: "Inter"
      },
    });
  };


  return { showError, showSuccess, showCustom };

};

export default useCustomToast;
