const express = require('express')


import {Orders} from './orders-router'

const app = express()
const port = 3000
app.use(express.json())

app.use('/orders', Orders)

app.get('/', (req: Request, res) => {
  res.send("Hello")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})