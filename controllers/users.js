const { user } = require('../config');
const con = require('../database');
const bcrypt = require('bcryptjs');


// function getUserList(req, res, next) {
getUserList = function(req, res) {
    let sql = "Select * from users";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify( result));
        res.json(result);
    });

}
postRegister = function(req, res) {
        // console.log('req', req.body);
        // exports.cryptPassword = function(password, callback) {
        //     bcrypt.genSalt(10, function(err, salt) {
        //      if (err) 
        //        return callback(err);
         
        //      bcrypt.hash(password, salt, function(err, hash) {
        //        return callback(err, hash);
        //      });
        //    });
        //  };
         
        //  exports.comparePassword = function(plainPass, hashword, callback) {
        //     bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
        //         return err == null ?
        //             callback(null, isPasswordMatch) :
        //             callback(err);
        //     });
        //  };
        
        con.query( 'SELECT * FROM users WHERE email = "'+req.body.email+'"', function(err, result_data) {
            console.log(result_data);
            if (err)
            {
                console.log(err);
                res.json(err)
            }
            if(result_data.length > 0) {
                console.log("user already registered");
                res.json({'code': 400, 'status': false, 'message':'User already registered .'})
            } else{
                var sql = "INSERT INTO users(first_name,last_name,email,address,city,state,country,zip_code,mobile,password) VALUES (?,?,?,?,?,?,?,?,?,?)";
                var values=
                    [req.body.first_name,req.body.last_name,req.body.email,req.body.address,req.body.city,req.body.state,req.body.country,req.body.zip_code,req.body.mobile,req.body.password];
                con.query(sql, values,function(err,result){
                    if (err) throw err;
                    console.log("insert successfully"+result);
                    res.json({'code': 200, 'status': true, 'message':'User registered successfully.'})
                });
            }
        });
}
postLogin = function(req, res) {
    console.log('req', req.body);
    con.query( 'SELECT * FROM users WHERE email = "'+req.body.email+'" AND password = "'+req.body.password+'"', function(err, result_data) {
        console.log(result_data);
        if (err)
        {
            console.log(err);
            res.json(err)
        }
        if(result_data.length == 0) {
            console.log("user not exist");
            res.json({'code': 400, 'status': false, 'message':'User not exist .'})
        } else{
                res.json({'code': 200, 'status': true, 'message':'User login successfully.'})
        }
    });
}
module.exports = { postRegister, getUserList,postLogin}