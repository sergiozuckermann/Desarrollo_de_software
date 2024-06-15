/*
 *  This component integrates Amazon Connect's Contact Control Panel (CCP) into a React application. 
 * It initializes the CCP inside a specified container and configures various settings for login, softphone, 
 * and page options. Additionally, it opens a popup window displaying specific contact attributes when a contact is initiated.
 */
import { useEffect } from 'react';
import "amazon-connect-streams";

const CCPComponent = () => {

  useEffect(() => {
    // Retrieve the container div where the CCP will be rendered
    const containerDiv = document.getElementById("ccp-container")!;
    const instanceURL = "https://mexicana-airline.my.connect.aws/ccp-v2/";

    const init = () => {
       // Initialize the CCP with the specified settings
      connect.core.initCCP(containerDiv, {
        ccpUrl: instanceURL,
        loginPopup: true,
        loginPopupAutoClose: false,
        loginOptions: {
          autoClose: true,
          height: 600,
          width: 400,
          top: 0,
          left: 0
        },
        softphone: {
          allowFramedSoftphone: true,
          disableRingtone: false,
          allowFramedVideoCall: true,
          allowEarlyGum: true
        },
        pageOptions: {
          enableAudioDeviceSettings: false,
          enableVideoDeviceSettings: false,
          enablePhoneTypeSettings: true
        },
        ccpAckTimeout: 5000,
        ccpSynTimeout: 3000,
        ccpLoadTimeout: 10000
      });
       // Set up an event listener for contact initiation
      connect.contact(contact => {
        const attributes = contact.getAttributes();
        const selectedQueueNameStr = attributes.selectedQueue.value;
        const clientPhoneNumber = attributes.ClientPhoneNumber.value;
        const popupWindow = window.open("", "Contact Attributes", "width=400,height=300");
        if (popupWindow) {
           // Open a popup window displaying the contact attributes
          popupWindow.document.write(`
            <html>
              <head>
                <title>Contact Attributes</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                <style>
                  body {
                    font-family: 'Arial', sans-serif;
                    padding: 20px;
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                  }
                  pre {
                    background-color: #23395d;
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #ffffff;
                    font-color: #ffffff;
                  }
                  header {
                    background-color: #152238;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    font-color: #ffffff;
                  }
                </style>
              </head>
              <body>
                <header>Call Preview</header>
                <pre>Customer selecter queue: ${JSON.stringify(selectedQueueNameStr)}</pre>
                <pre>Customer callback number: ${JSON.stringify(clientPhoneNumber)}</pre>
              </body>
            </html>
          `);
        }
      });
    };

    // Call the initialization function
    init();
  }, []);

  return (
    <div id="ccp-container" className="h-[100%] w-[100%]">
      {/* This is where the CCP iframe will be rendered */}
    </div>
  );
};

export default CCPComponent;
