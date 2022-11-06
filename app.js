const express = require('express'); 
const app = express() ; 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');

// middlewares 
app.use(cors({
  // origin: NODE_ENV === 'production' ? (process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : true) : true,
  credentials: true,
  allowedHeaders: 'X-PINGOTHER, Content-Type, Authorization, X-Forwarded-For',
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// import routes 
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users'); 

app.use('/posts', postsRoute); 
app.use('/users', usersRoute); 

// Routes
app.get('/', (req, res) => { 
    res.send(`db-url : ${DB_URL}`);
})

// connect to DB
// const username = encodeURIComponent(process.env.DB_USER);
// const password = encodeURIComponent(process.env.DB_PASSWORD);
// const cluster = encodeURIComponent(process.env.CLUSTER); 
// const DB_URL = `mongodb+srv://${username}:${password}@${cluster}.adsjksx.mongodb.net/?retryWrites=true&w=majority`; 
// console.log(DB_URL);

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017',
  DB_USER = '',
  DB_PWD = '',
  DB_NAME
} = process.env;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`;

try {
    // Connect to the MongoDB cluster
     mongoose.connect(DB_URL, {
        dbName: DB_NAME,
        auth: {
            username: DB_USER,
            password: DB_PWD,
        },
        authSource: DB_NAME,
      }, () => {
        console.log('connected');
        
        // How to use start listening to the server 
        app.listen(process.env.PORT || 3004, () => {
          console.log('server ready');
        });
      })


  } catch (e) {
    console.log("could not connect");
  }

