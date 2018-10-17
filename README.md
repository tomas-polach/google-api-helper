# Google API Helper for Node.js

Basic usage:

```js
const authConfig = {
    googleClientEmail: process.env.G_CLIENT_EMAIL,
    googlePrivateKey: process.env.G_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
}

gHelper.authorize(authConfig, async (auth) => {

  const sheet = new gHelper.Spreadsheet('5BRrCALbF50FzHOHdeYi-WjEW1dX34U2KixCyHTzWBo4', auth)

  const rows = await sheet.getRows('Sheet1!A1:B2')
  console.log(rows)

  await sheet.setRows('Sheet1!A1:B2', [
    ['aaaaa', 33333,],
    ['44444', 'xxxx']
  ])
  
})
```

### TODO
* Better readme
* API reference
* Inline docs
* Tutorial on how to create a google service account
