# postToSheetsAPI

Create an API endpoint that posts messages into a Slack channel (or Google Spreadsheet)

## To-Do List:

1. Test Google API access

   - [x] Test authentication
   - [x] Try fetching data from a sample Google Sheet
   - [x] Commit

2. Set up an Express server

   - [x] Set up an API endpoint
   - [x] Code up a function that posts to Google Sheets
   - [x] Implement error handling
   - [x] Perform manual/Postman testing
   - [x] Write API documentation
   - [x] Commit

3. Refactor and test the code

   - [x] Refactor the function: abstract the logic away from the interface layer
   - [x] Deploy on replit
   - [x] Code a simple frontend to hit the API
   - [x] Update documentation
   - [x] Commit

# Google Sheets API

This API saves messages to Google Sheets, along with a timestamp. To set up locally, copy the config folder (delivered via email) into the root directory and install the modules.

Google Sheets for testing: https://docs.google.com/spreadsheets/d/1J1wqaKisURMwRKOjNS3e5Bme7KyMahrIB493Vd6_DJg/edit#gid=1416303371

## Base URL

https://post-to-sheets-api.replit.app/ (temporary)

Frontend form for testing: https://michaelchen.me (temporary)

## Endpoints

### 1. Write data to Google Sheet

Appends data to the specified range in the given Google Sheet.

- **URL:** `/sheet/post`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**

  | Parameter         | Type   | Description                                | Required |
  | ----------------- | ------ | ------------------------------------------ | -------- |
  | `spreadsheetLink` | string | The URL of the Google Sheet                | True     |
  | `sender`          | string | Name of the sender                         | True     |
  | `message`         | string | The message body                           | True     |
  | `rangeToWrite`    | string | The range to write data (e.g. 'Sheet1!A1') | True     |

- **Success Response:**

  - **Code:** `200 OK`
  - **Content Example:**

    ```json
    {
      "message": {
        "spreadsheetId": "1J1wqaKisURMwRKOjNS3e5Bme7KyMahrIB493Vd6_DJg",
        "tableRange": "Messages!A1:B15",
        "updates": {
          "spreadsheetId": "1J1wqaKisURMwRKOjNS3e5Bme7KyMahrIB493Vd6_DJg",
          "updatedRange": "Messages!A16:B16",
          "updatedRows": 1,
          "updatedColumns": 2,
          "updatedCells": 2
        }
      }
    }
    ```

- **Error Response:**

  - **Code:** `400 Bad Request`
  - **Content Example:**

    ```json
    {
      "message": "Missing one or more required field(s)."
    }
    ```

  - **Code:** `500 Internal Server Error`
  - **Content Example:**

    ```json
    {
      "message": "Something went wrong"
    }
    ```

#### 2. Get Spreadsheet Data (hardcoded, for testing api authentication)

- **Method**: `GET`
- **URL**: `/sheet/get`

- **Success Response:**

  - **Code:** `200 OK`
  - **Content Example:**

    ```json
    {
      "message": {
        "range": "Messages!A:C",
        "majorDimension": "ROWS",
        "values": [
          [
            "2023-05-10T09:00:00.000Z",
            "John Doe",
            "Hello, this is a test message!"
          ]
        ]
      }
    }
    ```

- **Error Response:**

  - **Code:** `500 Internal Server Error`
  - **Content Example:**

    ```json
    {
      "message": "Something went wrong"
    }
    ```
