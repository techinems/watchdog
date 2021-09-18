//node packages
require("dotenv").config();

//local packages
const { app } = require("./utilities/bolt.js");
const { processMessage } = require("./utilities/helperFunctions.js");

//globals
let DEV;
if (process.env.ENVIRONMENT && process.env.ENVIRONMENT == "dev") {
  DEV = true;
} else {
  DEV = false;
}

app.message(async ({ message }) => {
  if (DEV) {
    console.log(message);
  }
  await processMessage(message);
});
