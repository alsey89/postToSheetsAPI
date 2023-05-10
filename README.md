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

   - [ ] Refactor the function: abstract the logic away from the interface layer
   - [ ] Write automated tests using Jest
   - [ ] Update documentation to include testing instructions
   - [ ] Commit

# Google Sheets API

This API provides two endpoints to interact with Google Sheets, allowing users to read and write data.

## Base URL

pending

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

- Method: `GET`
- Endpoint: `/sheet/get`

**Response**

- Status: `200`
- Description: Returns the data from a hardcoded sample spreadsheet ("Messages!A:C").

**Example**

```json
{
  "message": {
    "range": "Messages!A:C",
    "majorDimension": "ROWS",
    "values": [
      ["2023-05-10T09:00:00.000Z", "John Doe", "Hello, this is a test message!"]
    ]
  }
}
```
