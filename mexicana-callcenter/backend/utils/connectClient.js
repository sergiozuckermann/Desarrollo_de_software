const { ConnectClient } = require("@aws-sdk/client-connect"); // CommonJS import
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require("./config")

const connectClient = new ConnectClient({
  region: "us-east-1", credentials:
  {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

module.exports = connectClient
