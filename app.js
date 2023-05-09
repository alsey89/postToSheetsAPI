require("dotenv").config({ path: "./config/.env" });

//googleAPI and authentication
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

//test run the authentication procedure
fetchDataFromSheets = async ({ sheetName, rangeRC }) => {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const range = `${sheetName}!${rangeRC}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  });
  console.log(response.data.values);
};

fetchDataFromSheets({ sheetName: "Class Data", rangeRC: "A1:F31" }).catch(
  console.error
);
