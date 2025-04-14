//import express library
const express = require('express');
//create an instance of express
const app = express();
//import cors
const cors = require('cors');
//create server port
const port = 3000;


//import posts router
const postsRouter = require('./routers/postsRouter');

//import server error middleware
const serverError = require('./middlewares/serverError');

//import 404 server error middleware
const notFoundError = require('./middlewares/error-404');

//import function to log time middleware
const timeMiddleware = require('./middlewares/timeMiddleware');

//add time middleware
app.use('/', timeMiddleware);

//add cors middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

//start server listening
app.listen(port, () => {
  console.log(`🟢 Server start running on port http://localhost:${port}`);
});

//home route
app.get('/', (req, res) => {

  //throw an error volountarily
  //app.daje();
  res.send("Welcome to our Blog Server!");
});

//static assets
app.use(express.static('public'));

//add body parser
app.use(express.json());

//posts middleware
app.use('/posts', postsRouter);

//500 server error
app.use(serverError);

//404 error
app.use(notFoundError);