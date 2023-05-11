const { writeData, readData } = require("./services/sheetsService.js");

require("dotenv").config({ path: "./config/.env" });

//express setup
const express = require("express");
const app = express();

//!------------Middlewares------------
//*for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//!------------Express Listeners------------
app.post("/sheet/post", async (req, res) => {
  try {
    //*deconstruct and validate request body
    const { spreadsheetLink, sender, message, rangeToWrite } = req.body;
    if (!spreadsheetLink || !sender || !message || !rangeToWrite) {
      return res
        .status(400)
        .json({ message: "Missing one or more required field(s)." });
    }

    const result = await writeData({
      spreadsheetLink: spreadsheetLink,
      rangeToWrite: rangeToWrite,
      sender: sender,
      message: message,
    });

    res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//hardcoded get function, for testing api authentication
app.get("/sheet/get", async (req, res) => {
  try {
    const response = await readData();
    res.status(200).json({ message: response });
  } catch (err) {
    throw new Error(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
