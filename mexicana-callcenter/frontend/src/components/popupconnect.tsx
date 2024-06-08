import React, { useEffect } from 'react';
import "amazon-connect-streams";

const CCPComponent: React.FC = () => {

  useEffect(() => {
    const containerDiv = document.getElementById("ccp-container")!;
    const instanceURL = "https://mexicana-airline.my.connect.aws/ccp-v2/";

    const initCCP = () => {
      connect.core.initCCP(containerDiv, {
        ccpUrl: instanceURL,
        loginPopup: true,
        loginPopupAutoClose: true,
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

      connect.contact(contact => {
        window.opener?.postMessage('CCPLoginSuccess', '*');
      });
    };

    initCCP();
  }, []);

  return (
    <div id="ccp-container" className="h-[100%] w-[100%]">
      {/* This is where the CCP iframe will be rendered */}
    </div>
  );
};

export default CCPComponent;
