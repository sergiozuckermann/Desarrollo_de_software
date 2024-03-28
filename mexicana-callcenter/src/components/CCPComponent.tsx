import { useEffect } from 'react';
import "amazon-connect-streams"


const CCPComponent = () => {
  useEffect(() => {
    const containerDiv = document.getElementById("ccp-container");
    const instanceURL = "https://mexicana-airline.my.connect.aws/ccp-v2/";

    const init = () => {
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
        shouldAddNamespaceToLogs: false,
        ccpAckTimeout: 5000,
        ccpSynTimeout: 3000,
        ccpLoadTimeout: 10000
      });
    };

    init();

  }, []); // Empty dependency array to run only once on mount

  return (
    <div id="ccp-container">
      {/* This is where the CCP iframe will be rendered */}
    </div>
  );
};

export default CCPComponent;
