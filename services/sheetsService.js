const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

const writeData = async ({
  spreadsheetLink,
  sender,
  message,
  rangeToWrite,
}) => {
  //*extracting spreadsheetId from URL. To consider later: regex might be more robust than the current method.
  const spreadsheetId = spreadsheetLink.split("/")[5];
  const timeStamp = new Date().toISOString();
  const valuesToWrite = [[timeStamp, sender, message]]; //*resources has to be an array of arrays

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

const readData = async () => {
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

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { writeData, readData };
