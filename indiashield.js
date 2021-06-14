const express = require('express');
const fs = require('fs');
const connectDB = require('./config/db');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');



// Load Config File
const config = require('./config/config');

//Connect to database
connectDB();



const app = express();

if(config.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Body Parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    next();
});

// Route Files
// const bookshipment = require('./routes/bookshipment');
// const contactus = require('./routes/contactus');
const resources = require('./routes/resources');
const sendotp = require('./routes/sendOtp');
const verifyOTP = require('./routes/verifyOtp');
const user = require('./routes/users');
// const { sendOTP, verifyuser, verifyOTP } = require('./controllers/controller');

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'app/index.html'));
// });


// URLS
app.use('/api/v1/resources', resources);
app.use('/api/v1/sendotp', sendotp);
app.use('/api/v1/verifyotp', verifyOTP);
app.use('/api/v1/user', user);

// app.use('/api/v1/contactus', contactus);

app.use(errorHandler);

console.log("config.PORT  is "+ config.PORT );
const PORT = config.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold));


process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close Server and Exit Process
    server.close(() => {
        process.exit(1);
    })
})
