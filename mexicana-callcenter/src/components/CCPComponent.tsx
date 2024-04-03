// This component renders the CCP UI iframe into the website

import { useEffect } from 'react';
import "amazon-connect-streams"

const CCPComponent = () => {
  useEffect(() => {
    const containerDiv = document.getElementById("ccp-container")!;
    const instanceURL = "https://mexicana-airline.my.connect.aws/ccp-v2/";

    const init = () => {
        connect.core.initCCP(containerDiv, {
        ccpUrl: instanceURL,
        loginPopup: true,
        loginPopupAutoClose: true,
        loginOptions: {                 // optional, if provided opens login in new window
          autoClose: true,              // optional, defaults to `false`
          height: 600,                  // optional, defaults to 578
          width: 400,                   // optional, defaults to 433
          top: 0,                       // optional, defaults to 0
          left: 0                       // optional, defaults to 0
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
    };

    init();

  }, []); // Empty dependency array to run only once on mount

  return (
    <div id="ccp-container" className = "h-[100%] w-[100%]">
      {/* This is where the CCP iframe will be rendered */}
    </div>
  );
};

export default CCPComponent;
