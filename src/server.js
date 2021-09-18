//node packages
require("dotenv").config();

//local packages
const { app } = require("./utilities/bolt.js");
const { isDev, processMessage } = require("./utilities/helperFunctions.js");

//globals

app.message(({ message, message: { subtype } }) => {
  if (isDev()) {
    console.log(message);
  }
  if (subtype != "message_deleted") {
    processMessage(message);
  }
});
