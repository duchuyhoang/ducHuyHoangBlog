const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/hello', (req, res) => {
  res.json({ message: 'Succeed' })
})

exports.app = functions.https.onRequest(app)
