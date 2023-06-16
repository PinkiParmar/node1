const { user } = require('../config');
const con = require('../database');
const { Encrypt } = require('../auth');
const jwt = require('jsonwebtoken');
const secretkey = 'secretkeyFGFDGDFDGF';

// function getUserList(req, res, next) {
getUserList = function (req, res) {
    let sql = "Select * from users";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
    }
postRegister = async function (req, res) {
    // console.log('req', req.body);
    con.query('SELECT * FROM users WHERE email = "' + req.body.email + '"', async function (err, result_data) {
        // console.log(result_data);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result_data.length > 0) {
            console.log("user already registered");
            res.json({ 'code': 400, 'status': false, 'message': 'User already registered .' })
        } else {
            let password = req.body.password;
            password = await Encrypt.cryptPassword(password);
            console.log("password: " + password);

            var sql = "INSERT INTO users(first_name,last_name,email,address,city,state,country,zip_code,mobile,password) VALUES (?,?,?,?,?,?,?,?,?,?)";
            var values =
                [req.body.first_name, req.body.last_name, req.body.email, req.body.address, req.body.city, req.body.state, req.body.country, req.body.zip_code, req.body.mobile, password];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("insert successfully" + result);
                res.json({ 'code': 200, 'status': true, 'message': 'User registered successfully.' })
            });
        }
    });
}
postLogin = function (req, res) {
    // console.log('req', req.body);
    con.query('SELECT * FROM users WHERE email = "' + req.body.email + '"', async function (err, result_data) {
        // console.log(result_data, req.body.password, result_data[0]['password']);
        if (err) {
            console.log(err);
            res.json(err)
        }
        if (result_data.length == 0) {
            console.log("user not exist");
            res.json({ 'code': 400, 'status': false, 'message': 'Email is incorrect.' })
        } else {
            let data = {
                email: result_data[0]['email'],
                user_id: result_data[0]['user_id']
            }
            let token = jwt.sign(data, secretkey, { expiresIn: 300 });
            // console.log('token', token)
            const matchPassword = await Encrypt.comparePassword(req.body.password, result_data[0]['password']);
            console.log('match', matchPassword);
            if (matchPassword) {
                res.json({ 'code': 200, 'status': true, 'message': 'User login successfully.', 'token': token })
            }
            else {
                res.json({ 'code': 400, 'status': false, 'message': 'Password is incorrect.' })
            }
        }
    });
    // function tokenVerify(req,resp,next){
    // }
}
getViewProfile = function (req, res) {
    // console.log('req', req.body);
    let sql =   'SELECT * FROM users WHERE id = ';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.json(result);
    });
    
}
module.exports = { postRegister, getUserList, postLogin,getViewProfile }