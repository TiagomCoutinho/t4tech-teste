const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Startup api')
})

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})