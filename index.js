const express = require('express');
// const register = require('./Model/register.js/Register');
const app = express();
const con = require('./database');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
//routes
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({extended: false})
);

app.get('/', (req, res) =>{
    console.log('node');
    res.send('working')
});

app.use('/', routes);



app.listen(3003,() => {
    console.log('listening on');
},);


    
