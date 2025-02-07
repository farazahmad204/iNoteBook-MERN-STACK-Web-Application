const connectoMongo =  require('./db');
const express = require('express');
var cors = require('cors')




connectoMongo();


const app = express()
const port = 3001

//middleware to use cors allow api to open in browser
app.use(cors())

//middleware to use json format

app.use(express.json());

// app.get('/', (req, res) => {

//   res.send('Hello ABC!')

// })

//Available Routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))





app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})