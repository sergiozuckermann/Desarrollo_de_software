import { FunctionComponent, useState, useEffect } from "react";
import Button from "../components/Buttons";
import "../bargeIn.css";  

/* Mandarlo de backend????
interface BargeInProps {
  randomNumber: number; // Add this prop to receive the random number from the backend
}
*/

const BargeIn: FunctionComponent /*<BargeInProps> */= () => {
  const [timestamp, setTimestamp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callDescription, setCallDescription] = useState("");
  const [showPopup, setShowPopup] = useState({ visible: false, imageIndex: 0 });
  const popupImages = [
    "/LogoMexicanaAudifonos.svg",
    "/LogoMexicanaAudifonosIN.svg",
    "/LogoMexicanaAudifonosOUT.svg",
  ];

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const currentTimestamp = `${date} ${time}`;
      setTimestamp(currentTimestamp);
    };

    updateTimestamp();

    const intervalId = setInterval(updateTimestamp, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  // Se pone cada X cantidad de timepo
  useEffect(() => {
    const randomInterval = () => {
      const randomDelay = Math.floor(Math.random() * 120000) + 1000;
  
      setTimeout(() => {
        setShowPopup({ visible: true, imageIndex: 0 });
      }, randomDelay);
    };
  
    const intervalId = setInterval(randomInterval, 120000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /*   
  Mandarlo de backend????
  useEffect(() => {
    // Check if the random number is 1 and show the popup accordingly
    setShowPopup(randomNumber === 1);
  }, [randomNumber]); // Add randomNumber as a dependency
  
  
  Se poden cuando sea 1 (una sola vez) 
  const handlePopup = () => {
    const randomNumber = 1;
    setShowPopup(randomNumber === 1);
  };
  */
  
  useEffect(() => {
    if (showPopup.visible) {
      const timer1 = setTimeout(() => {
        setShowPopup((prevState) => ({
          ...prevState,
          imageIndex: 1,
        }));
      }, 4000);
  
      const timer2 = setTimeout(() => {
        setShowPopup((prevState) => ({
          ...prevState,
          imageIndex: 2,
        }));
      }, 7000);
  
      const timer3 = setInterval(() => {
        setShowPopup((prevState) => ({
          ...prevState,
          imageIndex: prevState.imageIndex === 1 ? 2 : 1,
        }));
      }, 3000);
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearInterval(timer3);
      };
    }
  }, [showPopup.visible]);

  const handleClosePopup = () => {
    if (showPopup.imageIndex === 2) {
      setShowPopup({ visible: false, imageIndex: 0 });
    }
  };

  return (
    <div className="flex flex-col h-screen"> {/* Prevent overflow at the root level */}
      
      {/* Top bar with background */}
      <div className="flex h-20 bg-tertiary shadow-lg justify-between items-center p-4">
        <div>
          {/* LA RUTA ESTA A LA PÁGINA DE HELLO POR QUE TODAVÍA NO TENEMOS HOME */}
          <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className="w-[230px] ml-3" />
          </Button>
       
        </div>
        <div className="flex items-center">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}
          <Button onClick={() => window.location.href = '/Notifications'} className="hover-shrink-button">
            <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
          </Button>
        
          <h1 className="font">| On Call </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container h-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        {/*Connect CPP*/}
        <div className="h-[100%] w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            <div>
              <h2 className="ml-8 mt-11"style={{fontFamily: "Roboto", fontSize: "20px" }}>
                * Connect Here *
              </h2>
            </div>
        </div>

        {/*Client FORM*/}
        <div className="h-[100%] w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
            {/*CLIENT TITLE*/}
            <div>
              <h1 className="ml-8 mt-11 "style={{fontFamily: "Roboto", fontSize: "50px" }}>
                Client
              </h1>
            </div>

            {/*FORM*/}
            <div className="w-full ml-11 mt-[10%]">
              <form className="">
                {/*NAME*/} 
                <div className="mb-6 w-full">
                  <label className="text-base" style={{fontFamily: "Roboto", fontSize: "18px" }}>
                    Name:
                  </label>
                  <input
                    className="flex h-[40px] w-[80%] relative rounded-3xs bg-tertiary box-border border-[1px] border-solid border-marco" style={{padding: "5px 12px", margin: "5px", fontFamily: "Roboto"}}
                    placeholder=""
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
      
                {/*E-MAIL*/} 
                <div className="mb-6">
                  <label className="text-base" style={{fontFamily: "Roboto", fontSize: "18px" }}>
                    E-mail:
                  </label>
                  <input
                    className="flex h-[40px] w-[80%] relative rounded-3xs bg-tertiary box-border border-[1px] border-solid border-marco" style={{padding: "5px 12px", margin: "5px", fontFamily: "Roboto"}}
                    placeholder=""
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                {/*PHONE*/}
                <div className="mb-6">
                  <label className="text-base" style={{fontFamily: "Roboto", fontSize: "18px" }}>
                    Phone:
                  </label>
                  <input
                    className="flex h-[40px] w-[80%] relative rounded-3xs bg-tertiary box-border border-[1px] border-solid border-marco" style={{padding: "5px 12px", margin: "5px", fontFamily: "Roboto"}}
                    placeholder=""
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>

                {/* CALL DESCRIPTION */}
                <div className="mb-6">
                  <label className="text-base" style={{ fontFamily: "Roboto", fontSize: "18px" }}>
                    Call Description:
                  </label>
                  <textarea
                    className="flex h-[200px] w-[80%] relative rounded-3xs bg-tertiary box-border border-[1px] border-solid border-marco" 
                    style={{ padding: "5px 12px", margin: "9px", fontFamily: "Roboto", resize: "vertical", minHeight: "200px" }}
                    placeholder=""
                    value={callDescription}
                    onChange={(event) => setCallDescription(event.target.value)}
                  />
                </div>


              </form>  
            </div>
        </div>


        {/*SUGGESTIONS AI*/}
        <div className="h-[100%] w-full rounded-lg" style={{backgroundColor: "#F8F9FA", borderColor: "rgba(32, 37, 63, 0.5)", borderWidth: "1px" , borderStyle: "solid"}}>
          <div>
            <h1 className="ml-8 mt-11"style={{fontFamily: "Roboto", fontSize: "40px" }}>
              Hi, looking for help?
            </h1>
            <h2 className="ml-8 mt-11"style={{fontFamily: "sans-serif", fontSize: "27px" }}>
              Suggestions
            </h2>
            {/*SCROLL FOR SUGGESTIONS*/}
            <div className="overflow-y-scroll h-[450px]">
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a costumer book a flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  Adding additional services to a reservation
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a costumer to cancel a flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  Loyalty program information
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How do I help a customer claim his lost luggage during a connecting flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How can I change the customer's name on a paid flight?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How can I change a customer's flight destination?
                </h3>
              </a>
              <hr className="h-px w-[90%] bg-marco border-0 dark:bg-gray-700"/>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="ml-11 mt-11 mb-11" style={{fontFamily: "sans-serif", fontSize: "15px" }}>
                  How to select a customer's seat?
                </h3>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="h-20 bg-tertiary shadow-lg flex justify-center items-center p-4">
          <p className = "font2" > {timestamp} </p>
      </div>


      {/* Pop Up */}
      {showPopup.visible && (
        <div className="fixed bottom-4 right-4 rounded-lg p-2">
          <img
            src={popupImages[showPopup.imageIndex]}
            alt="Logo"
            className="w-50 h-50 cursor-pointer"
            onClick={handleClosePopup}
          />
        </div>
      )}
      
    </div>
  );
};

export default BargeIn;
