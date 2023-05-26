const con = require('../database');

// function getUserList(req, res, next) {
exports.getUserList = function(req, res) {
    let sql = "Select * from users";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });
}
    exports.postRegister = function(req, res) {
        let sql = "Select * from users";
        con.query(sql,function (err, result) {
            if (err) throw err;
            console.log("Result: " + JSON.stringify( result));
            res.json(result);
            
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected successfully");
            var sql = "INSERT INTO users(id,first_name,last_name,email,address,city,state,country,zip_code,country_code,mobile) VALUES ?";
            var values=[
                [3,'juhi','pawar','juhi@gmail.com','indore','indore','M.P.','india','qws','876523456']
             con.query(sql,[values],function(err,result){
                if (err) throw err;
                console.log("insert successfully"+result affectedRows);
                });
            ];
        })
        
}
