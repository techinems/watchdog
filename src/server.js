//node packages
require("dotenv").config();

//local packages
const { app } = require("./utilities/bolt.js");
const { isDev, processMessage } = require("./utilities/helperFunctions.js");

//globals

app.message(
  async ({ message, message: { thread_ts = null, subtype } }) => {
    if (isDev()) {
      console.log(message);
    }
    if (subtype != "message_deleted" && !thread_ts) {
      await processMessage(message);
    }
  }
);
