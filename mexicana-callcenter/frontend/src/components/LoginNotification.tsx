// Login Notification component to display login success or failure

// Imports notification library
import { toast } from 'react-toastify';

// Defines the useCustomToast hook
const useCustomToast = () => {
  // Function to show error notification and styling
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
  // Function to show success notification and styling
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
        backgroundColor: "#4BB543", 
        fontFamily: "Inter"
      },
    });
  };

  // Function to show custom notification and styling
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
