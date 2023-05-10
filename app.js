const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
require("dotenv").config({ path: "./config/.env" });

//express setup
const express = require("express");
const app = express();

//!------------Middlewares------------
//*for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//!-----Functions Used in API Endpoints-----
const writeData = async ({ spreadsheetLink, valuesToWrite, rangeToWrite }) => {
  //*extracting spreadsheetId from URL. To consider later: regex might be more robust than the current method.
  const spreadsheetId = spreadsheetLink.split("/")[5];

  try {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const sheets = google.sheets({ version: "v4", auth });

    const request = {
      spreadsheetId: spreadsheetId,
      range: rangeToWrite,
      valueInputOption: "USER_ENTERED",
      resource: { values: valuesToWrite },
    };

    const response = (await sheets.spreadsheets.values.append(request)).data;
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

//!------------Express Listeners------------
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//hardcoded get function, for testing api authentication
app.get("/sheet/get", async (req, res) => {
  try {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const sheets = google.sheets({ version: "v4", auth });

    const request = {
      spreadsheetId: "1J1wqaKisURMwRKOjNS3e5Bme7KyMahrIB493Vd6_DJg",
      range: "Messages!A:C",
    };

    const response = (await sheets.spreadsheets.values.get(request)).data;
    res.status(200).json({ message: response });
  } catch (err) {
    throw new Error(err);
  }
});

app.post("/sheet/post", async (req, res) => {
  try {
    //*deconstruct and validate request body
    const { spreadsheetLink, sender, message, rangeToWrite } = req.body;
    if (!spreadsheetLink || !sender || !message || !rangeToWrite) {
      return res
        .status(400)
        .json({ message: "Missing one or more required field(s)." });
    }

    const timeStamp = new Date().toISOString();
    let valuesToWrite = [[timeStamp, sender, message]]; //*resources has to be an array of arrays

    const result = await writeData({
      spreadsheetLink: spreadsheetLink,
      rangeToWrite: rangeToWrite,
      valuesToWrite: valuesToWrite,
    });

    res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
