// Import and configure dotenv
require('dotenv').config({ path: __dirname + '/.env' });

// Log the environment variables for debugging
console.log('DATABASE:', process.env.DATABASE);
console.log('PORT:', process.env.PORT);

const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://asthagupta622:${process.env.DATABASE_PASSWORD}@jobportalapi.yvvokcr.mongodb.net/`;
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler =require("./middleware/error");


// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute= require('./routes/jobsTypeRoutes');
const jobRoute= require('./routes/jobsRoutes');
// Database connection
 mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('DB connected'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(morgan('dev')); // Logger
app.use(bodyParser.json({limit:"1mb"}));
app.use(bodyParser.urlencoded({  limit:"1mb", extended: true }));
app.use(cors());
app.use(cookieParser()); // Enable CORS

// ROutes MiddldWare
// app.get('/',(req,res)=>{
//    res.send("Hello from Node Js")
// })
app.use('/api' ,authRoutes);
app.use('/api', userRoutes);
app.use('/api',jobTypeRoute);
app.use('/api',jobRoute);


// error middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
