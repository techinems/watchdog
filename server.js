//node packages
require("dotenv").config();

//local packages
const { app } = require("./utilities/bolt.js");
const { processMessage } = require("./utilities/helperFunctions.js");

app.message(async ({ message }) => {
  processMessage(message);
});
