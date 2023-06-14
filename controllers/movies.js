const { user } = require('../config');
const con = require('../database');
getMovies = function(req, res) {
    let sql = "Select * from movies";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
getMovies = function(req, res) {
    let sql = "Select * from movies";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
getMoviesHome = function(req, res) {
    let sql = "Select * from movies ORDER BY id DESC LIMIT 4";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
getMoviesPopular = function(req, res) {
    let sql = "Select * from movies WHERE movie_type = 'popular'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
getMoviesTopRated = function(req, res) {
    let sql = "Select * from movies WHERE movie_type='top rated'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
getMoviesUpcoming = function(req, res) {
    let sql = "Select * from movies WHERE movie_type='upcoming'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });

}



module.exports = { getMovies, getMoviesHome, getMoviesPopular, getMoviesTopRated, getMoviesUpcoming}