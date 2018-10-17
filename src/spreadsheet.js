const { google } = require('googleapis')

const sheets = google.sheets('v4')

class Spreadsheet {

  constructor(id, auth) {
    this.auth = auth
    this.id = id
  }

  get(range, dim = 'ROWS') {
    return new Promise((resolve, reject) => {
      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
      sheets.spreadsheets.values.get({
          auth: this.auth,
          spreadsheetId: this.id,
          range,
          majorDimension: dim
        },
        (error, result) => {
          if (error) {
            console.error(
              `Error getting cells in spreadsheet ID: ${this.spreadsheetId}`,
              error
            )
            reject(error)
          }
          resolve(result.data.values)
        }
      )
    })
  }

  getRows(range) {
    return this.get(range, 'ROWS')
  }

  getColumns(range) {
    return this.get(range, 'COLUMNS')
  }

  set(range, values, dim = 'ROWS', raw = false) {
    return new Promise((resolve, reject) => {
      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
      sheets.spreadsheets.values.update({
          auth: this.auth,
          spreadsheetId: this.id,
          range: range,
          resource: {
            majorDimension: dim, // 'ROWS', 'COLUMNS'
            values
          },
          valueInputOption: raw ? 'RAW' : 'USER_ENTERED'
        },
        (error, result) => {
          if (error) {
            console.error(
              `Error setting cells in spreadsheet ID: ${this.spreadsheetId}`,
              error
            )
            reject(error)
          }
          resolve(result.data)
        }
      )
    })
  }

  setRows(range, values, raw) {
    return this.set(range, values, 'ROWS', raw)
  }

  setColumns(range, values, raw) {
    return this.set(range, values, 'COLUMNS', raw)
  }

}

module.exports = Spreadsheet