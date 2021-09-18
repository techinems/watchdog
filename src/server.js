//node packages
require("dotenv").config();

//local packages
const { app } = require("./utilities/bolt.js");
const { processMessage } = require("./utilities/helperFunctions.js");

//globals

//for dev
let DEV;
if (process.env.ENVIRONMENT && process.env.ENVIRONMENT == "dev") {
  DEV = true;
} else {
  DEV = false;
}

app.message(({ message, message: { subtype } }) => {
  if (DEV) {
    console.log(message);
  }
  if (subtype != "message_deleted") processMessage(message);
});
