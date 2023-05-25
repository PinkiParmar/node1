const express = require('express');
const app = express();
//routes
app.get('/', (req, res) => {
    console.log(Node);
});
//route
app.get('/route', (req, res) => {
    console.log(route);
});
app.listen(3001,() => {
    console.log('listening on');
},);