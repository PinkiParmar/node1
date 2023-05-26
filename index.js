const express = require('express');
// const register = require('./Model/register.js/Register');
const app = express();
const con = require('./database');
const routes = require('./routes');
//routes
app.get('/', (req, res) =>{
    console.log('node');
    res.send('working')
});

app.use('/', routes);

app.get('/route', (req, res) =>{
    console.log('welcome');
});

//register routes
app.post('/register',async(req,res) => {
    try{
    const register =await register.create(req.body);
    res.status(200).json(register);
 }catch (error){
     console.log(error.message);
     res.status(500).json({message: error.message});
 }
});

app.listen(3003,() => {
    console.log('listening on');
},);


    
