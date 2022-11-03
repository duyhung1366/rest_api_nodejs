const express = require('express'); 
const app = express() ; 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

// middlewares 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// import routes 
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute); 

// Routes
app.get('/', (req, res) => { 
    res.send('hello home');
})

// connect to DB
const username = encodeURIComponent(process.env.DB_USER || 'duyhung');
const password = encodeURIComponent(process.env.DB_PASSWORD || 'hung6789');
const cluster = encodeURIComponent(process.env.CLUSTER || 'duyhungclu'); 
const DB_URL = `mongodb+srv://${username}:${password}@${cluster}.adsjksx.mongodb.net/?retryWrites=true&w=majority`; 
console.log(DB_URL);
try {
    // Connect to the MongoDB cluster
     mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: encodeURIComponent(process.env.DB_NAME || 'DB_TEST')
      }, () => {
        console.log('connected');
      })


  } catch (e) {
    console.log("could not connect");
  }

// How to use start listening to the server 
app.listen(process.env.PORT, () => {
  
});
