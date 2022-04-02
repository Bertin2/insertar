const express = require('express');
const path = require('path');
const ejsLint = require('ejs-lint');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customerRoutes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//middlewares
app.use(morgan('start'));
app.use(myConnection(mysql, {
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b66f0666d216b4',
    password: '76e003f1',
    port: '3306',
    database: 'heroku_33dd528d1621b84'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});