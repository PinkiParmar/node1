const { user } = require('../config');
const con = require('../database');


getMovies = function(req, res) {
    let sql = "Select * from movies LIMIT 0, 3";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });

}



module.exports = { getMovies}