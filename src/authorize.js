const { google } = require('googleapis')
const assert = require('assert')

function authorize ({ googleClientEmail, googlePrivateKey, scopes }, cb) {
  return new Promise((resolve, reject) => {

    // validate params
    assert(googleClientEmail, 'Missing "googleClientEmail" parameter.')
    assert(googlePrivateKey, 'Missing "googlePrivateKey" parameter.')
    assert(scopes, 'Missing "scopes" parameter.')

    const jwtClient = new google.auth.JWT(
      googleClientEmail,
      null,
      googlePrivateKey,
      scopes
    )
    jwtClient.authorize(async error => {
      if (error) {
        console.error(`ERROR: Authorization failed:`, error)
        reject(error)
      } else {
        if (cb) await cb(jwtClient)
        resolve(jwtClient)
      }
    })
  })
}

function validatePrivateKey (key) {
  return /\n*-----\s*(\bBEGIN\b).*(PRIVATE KEY\b)\s*-----\n[a-zA-Z0-9\/+=\n]+\n-----\s*(\bEND\b).*(PRIVATE KEY\b)\s*-----\s*\n*/.test(key)
}

module.exports = authorize